#!/bin/sh
set -e

# Exécution automatique des migrations sur la base Neon.tech
php bin/console doctrine:migrations:migrate --no-interaction

# Démarrage du serveur Apache en avant-plan
exec apache2-foreground
