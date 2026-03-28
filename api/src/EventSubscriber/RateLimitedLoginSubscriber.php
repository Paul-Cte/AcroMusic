<?php

namespace App\EventSubscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Exception\TooManyLoginAttemptsAuthenticationException;

class RateLimitedLoginSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            // On écoute l'événement d'échec de LexikJWT
            Events::AUTHENTICATION_FAILURE => 'onAuthenticationFailure',
        ];
    }

    public function onAuthenticationFailure(AuthenticationFailureEvent $event): void
    {
        // Si l'erreur est spécifiquement liée au Rate Limiter
        if ($event->getException() instanceof TooManyLoginAttemptsAuthenticationException) {

            // On force une réponse 429 avec un message personnalisé
            $response = new JsonResponse([
                'code' => 429,
                'message' => 'Trop de tentatives. Veuillez patienter une minute.'
            ], 429);

            $event->setResponse($response);
        }
    }
}
