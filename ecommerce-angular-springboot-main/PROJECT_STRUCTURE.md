# 📁 Structure du Projet E-Commerce

```
ecommerce-angular-springboot-main/
│
├── 📂 ecommerce-backend/              # Backend Spring Boot 3 Microservices
│   ├── common/                        # Module commun (entités, DTOs, exceptions)
│   ├── user-service/                  # Service Utilisateurs & Auth JWT
│   ├── product-service/               # Service Produits & Catégories
│   ├── order-service/                 # Service Commandes
│   ├── payment-service/               # Service Paiements
│   ├── notification-service/          # Service Notifications (Email+WebSocket)
│   ├── gateway/                       # API Gateway (port 8080)
│   ├── docker-compose.yml            # Infrastructure (PostgreSQL + Redis + pgAdmin)
│   ├── init-databases.sql            # Script d'initialisation BDD
│   ├── pom.xml                       # Maven parent
│   └── logs/                         # Logs des services (généré au runtime)
│
├── 📂 modern-ecommerce-frontend/      # Frontend Angular 18
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/                 # Services, Guards, Interceptors
│   │   │   │   ├── components/      # Navbar, Footer
│   │   │   │   ├── guards/          # Auth guard
│   │   │   │   ├── interceptors/    # HTTP interceptors
│   │   │   │   └── services/        # API, Theme services
│   │   │   │
│   │   │   ├── features/            # Modules métier
│   │   │   │   ├── home/           # Page d'accueil
│   │   │   │   ├── auth/           # Login/Register
│   │   │   │   ├── product/        # Catalogue produits
│   │   │   │   ├── cart/           # Panier
│   │   │   │   ├── checkout/       # Processus commande
│   │   │   │   ├── order/          # Historique commandes
│   │   │   │   └── admin/          # Panel admin
│   │   │   │
│   │   │   └── store/              # NgRx State Management
│   │   │       ├── actions/        # Actions Redux
│   │   │       ├── reducers/       # Reducers
│   │   │       ├── selectors/      # Selectors
│   │   │       └── effects/        # Side effects
│   │   │
│   │   ├── environments/           # Configuration env
│   │   └── styles.css              # Styles globaux (TailwindCSS)
│   │
│   ├── tailwind.config.js          # Config TailwindCSS
│   ├── angular.json                # Config Angular
│   ├── package.json                # Dépendances npm
│   └── tsconfig.json               # Config TypeScript
│
├── 📄 README.md                      # Documentation principale
├── 📄 QUICK_START.md                 # Guide démarrage rapide
├── 📄 PROJECT_STRUCTURE.md           # Ce fichier
├── 📄 .gitignore                     # Fichiers à ignorer
│
└── 🚀 Scripts de démarrage
    ├── start-all.bat                # Démarrer tout (Windows)
    ├── start-all.sh                 # Démarrer tout (Linux/Mac)
    ├── stop-all.bat                 # Arrêter tout (Windows)
    └── stop-all.sh                  # Arrêter tout (Linux/Mac)
```

## 📊 Services Backend

| Service | Port | Description | Base de données |
|---------|------|-------------|-----------------|
| **Gateway** | 8080 | API Gateway (point d'entrée unique) | - |
| **User Service** | 8081 | Authentification JWT, gestion utilisateurs | ecommerce_users |
| **Product Service** | 8082 | Catalogue produits, catégories, avis | ecommerce_products |
| **Order Service** | 8083 | Gestion commandes, statuts | ecommerce_orders |
| **Payment Service** | 8084 | Traitement paiements | ecommerce_payments |
| **Notification Service** | 8085 | Emails + notifications temps réel | - |

## 🗄️ Infrastructure

| Service | Port | Accès |
|---------|------|-------|
| **PostgreSQL** | 5432 | postgres/postgres |
| **Redis** | 6379 | Cache |
| **pgAdmin** | 5050 | admin@ecommerce.com/admin |

## 🎨 Frontend

| Technologie | Version | Usage |
|-------------|---------|-------|
| Angular | 18.2.13 | Framework |
| NgRx | 18.1.1 | State Management |
| TailwindCSS | 3.4.17 | Styling |
| Angular Material | 18.2.13 | Composants UI |

## 📁 Dossiers Supprimés

Les dossiers suivants ont été **nettoyés** car non nécessaires :
- ~~ecommerce-angular~~ (ancienne version)
- ~~my-new-ecommerce~~ (version de test)

## 🔧 Fichiers de Configuration Importants

### Backend
- `ecommerce-backend/pom.xml` - Configuration Maven parent
- `ecommerce-backend/docker-compose.yml` - Infrastructure
- Chaque service a son `application.yml`

### Frontend
- `package.json` - Dépendances npm
- `angular.json` - Configuration Angular
- `tailwind.config.js` - Configuration TailwindCSS
- `tsconfig.json` - Configuration TypeScript

## 🚀 Démarrage

### Méthode 1: Scripts automatiques
```bash
# Windows
.\start-all.bat

# Linux/Mac
chmod +x start-all.sh
./start-all.sh
```

### Méthode 2: Manuel
Voir `QUICK_START.md`

## 📝 Notes

- Les logs backend sont dans `ecommerce-backend/logs/`
- Le frontend est en mode watch (recompilation auto)
- Redis est utilisé pour le cache des produits
- JWT tokens sont valides 24h

## 🎯 Prochaines Étapes

1. ✅ Infrastructure démarrée
2. ✅ Backend opérationnel
3. ✅ Frontend lancé
4. 🔜 Créer des données de test
5. 🔜 Développer les composants UI
6. 🔜 Tests end-to-end

---

**Structure propre et optimisée pour le développement ! 🎉**
