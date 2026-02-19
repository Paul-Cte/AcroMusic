<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class TestController extends AbstractController
{
    // On définit l'URL ici : ce sera "http://localhost/api/test"
    #[Route('/api/test', name: 'app_test', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Bravo ! Ton React communique bien avec Symfony Docker 🐳',
            'status' => 'success'
        ]);
    }
}
