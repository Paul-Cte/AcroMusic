# AcroMusic 

## À propos du projet
AcroMusic est une application web full-stack conçue pour servir de portfolio et de vitrine à un artiste musical. 

Le projet se divise en deux parties :
- **Une interface publique** : Permet aux visiteurs de découvrir l'artiste, d'explorer sa discographie détaillée et de le contacter.
- **Un espace d'administration** : Un espace sécurisé réservé à l'administrateur pour ajouter, modifier ou supprimer dynamiquement les albums et les compositeurs depuis le site, sans toucher au code.

## Stack Technique 

Ce projet est construit avec une architecture découplée (Frontend / Backend API) :

### Frontend
- **Framework** : React + Vite.js
- **Routage** : React Router DOM
- **Requêtes API** : Fetch API / Axios
- **Hébergement** : Vercel

### Backend
- **Framework** : Symfony (PHP 8)
- **API** : API Platform
- **Sécurité** : JWT (LexikJWTAuthenticationBundle) pour protéger les routes Admin
- **Hébergement** : AlwaysData

### Base de données & Infrastructure
- **Base de données** : PostgreSQL (Hébergée sur AlwaysData)
- **ORM** : Doctrine
- **Environnement local** : Docker
