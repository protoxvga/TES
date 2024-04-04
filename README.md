<h3 align="center">[TES] - Tiime Eating Survey</h3>

---

<p align="center"> TES est une application web pour faciliter le choix et la réservation du restaurant de midi chez Tiime Nancy.
    <br> 
</p>

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🧐 About ](#-about-)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
- [🎈 Usage ](#-usage-)
- [🚀 Deployment ](#-deployment-)
- [⛏️ Built Using ](#️-built-using-)
- [✍️ Authors ](#️-authors-)

## 🧐 About <a name = "about"></a>

L'application TES est une application web qui permet de faciliter le choix et la réservation du restaurant de midi chez Tiime Nancy. Chaque utilisateur peut créer une idée de lieu ou manger ou rejoindre une idée existante.

### Prerequisites

Vous devez posseder sur votre machine un environnement de développement PHP (Laravel 11) et NodeJS (React).
Apres l'installation de ces environnements, vous pouvez cloner le projet et installer les dépendances.

### Installing

Pour installer les dépendances PHP, vous pouvez utiliser composer :

```
composer install
```

Pour installer les dépendances NodeJS, vous pouvez utiliser npm :

```
npm install
```

Pour lancer l'application en dev, vous pouvez utiliser les commandes suivantes :

```
php artisan serve // Pour lancer le serveur PHP
npm run watch // Pour compiler les assets React
```

Vous devez également posseder le fichier .env à la racine du projet avec les informations de connexion à la base de données.
Retrouver un .env.example à la racine du projet et remplacer par vos informations.

Un DockerFile est également disponible pour déployer l'application dans un container Docker.

```
docker build -t tes .
docker run -p 8000:80 tes
```

## 🎈 Usage <a name="usage"></a>

L'application est accessible via l'url suivante : [https://tes.pierre-perrin.dev](https://tes.pierre-perrin.dev)

## 🚀 Deployment <a name = "deployment"></a>

Le déploiement de l'application se fait via un serveur web classique. Un workflow GitHub action passe a chaque release pour déployer l'application et vérifier son bon fonctionnement.
Chaque release est taggée avec un numéro de version et créer une image docker récupérer ensuite par le serveur web.

## ⛏️ Built Using <a name = "built_using"></a>

- [PostgresSQL](https://www.postgresql.org/) - Base de données
- [Laravel](https://laravel.com/) - Backend Framework
- [React](https://react.dev/) - Frontend Framework
- [Shadcn/ui](https://ui.shadcn.com/) - Librairie de composants
- [TailwindCSS](https://tailwindcss.com/) - Librairie CSS

## ✍️ Authors <a name = "authors"></a>

- [@protoxvga](https://github.com/protoxvga) - Idée et travail initial
