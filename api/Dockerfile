# On part d'une image officielle PHP avec Apache
FROM php:8.4-apache

# On installe les outils système nécessaires (git, zip pour composer, libpq pour postgres)
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libicu-dev

# On installe les extensions PHP requises par Symfony et Postgres
RUN docker-php-ext-install pdo pdo_pgsql intl opcache

# On active le module de réécriture d'URL d'Apache (indispensable pour Symfony)
RUN a2enmod rewrite

# On modifie la config Apache pour qu'il pointe vers le dossier /public de Symfony
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# On installe Composer (le gestionnaire de paquets PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


# On se place dans le dossier de travail
WORKDIR /var/www/html
# Copier tout le code de l'API dans le conteneur
COPY . /var/www/html/

# Installer les dépendances avec Composer
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer install --no-dev --optimize-autoloader

# Donner les droits au serveur web pour lire et écrire les fichiers
RUN chown -R www-data:www-data /var/www/html
