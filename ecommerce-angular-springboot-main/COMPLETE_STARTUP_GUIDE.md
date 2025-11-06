# 🚀 Guide Complet de Démarrage - E-Commerce Platform

## Vue d'ensemble

Ce guide vous accompagne pour lancer l'application complète (Backend + Frontend) avec toutes les nouvelles fonctionnalités:
- ✅ API REST complète
- ✅ Pages Catégories et À Propos
- ✅ Système de gestion de contenu
- ✅ Statistiques dashboard

---

## 📋 Prérequis

### Logiciels Requis
- ✅ **Docker Desktop** - Pour PostgreSQL et Redis
- ✅ **Java 17+** - Pour Spring Boot
- ✅ **Maven 3.8+** - Pour build backend
- ✅ **Node.js 18+** - Pour Angular
- ✅ **npm 9+** - Gestionnaire de paquets

### Vérification
```bash
docker --version
java -version
mvn -version
node -version
npm -version
```

---

## 🎯 Démarrage Rapide (Mode Automatique)

### Méthode 1: Script Windows (Recommandé)

```bash
# 1. Lancer tous les services backend
.\START_SERVICES.bat

# 2. Dans un nouveau terminal, lancer le frontend
cd modern-ecommerce-frontend
npm install  # Première fois seulement
npm start
```

L'application sera accessible sur:
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8082
- **Swagger UI**: http://localhost:8082/swagger-ui.html

---

## 🛠️ Démarrage Manuel (Mode Pas-à-Pas)

### Étape 1: Démarrer l'Infrastructure

```bash
cd ecommerce-backend
docker-compose up -d
```

Vérifier que les containers sont actifs:
```bash
docker ps
```

Vous devriez voir:
- ✅ `ecommerce-postgres` (Port 5432)
- ✅ `ecommerce-redis` (Port 6379)
- ✅ `pgadmin` (Port 5050 - optionnel)

### Étape 2: Charger les Données de Test

```bash
# Attendre 10 secondes que PostgreSQL démarre complètement

# Exécuter le script SQL
docker exec -i ecommerce-postgres psql -U postgres < test-data.sql
```

Ou manuellement:
```bash
psql -h localhost -U postgres -d ecommerce_products -f test-data.sql
```

### Étape 3: Lancer les Microservices Backend

**Option A: Avec Maven (Terminal)**
```bash
cd ecommerce-backend

# Terminal 1 - Product Service (Port 8082)
cd product-service
mvn spring-boot:run

# Terminal 2 - User Service (Port 8081)
cd user-service
mvn spring-boot:run

# Terminal 3 - Order Service (Port 8083)
cd order-service
mvn spring-boot:run

# Terminal 4 - Gateway (Port 8080)
cd gateway
mvn spring-boot:run
```

**Option B: Avec IDE (IntelliJ IDEA / Eclipse)**
1. Ouvrir le projet `ecommerce-backend`
2. Naviguer vers chaque service
3. Lancer la classe `*Application.java`

### Étape 4: Lancer le Frontend Angular

```bash
cd modern-ecommerce-frontend

# Installer les dépendances (première fois)
npm install

# Lancer le serveur de développement
npm start
```

Le frontend sera accessible sur **http://localhost:4200**

---

## 🧪 Tester les Nouvelles Fonctionnalités

### 1. Tester la Page Catégories

**Navigation:**
1. Ouvrir http://localhost:4200
2. Cliquer sur **"Catégories"** dans la navbar
3. Ou naviguer directement: http://localhost:4200/categories

**Vérifications:**
- ✅ Affichage de toutes les catégories en grille
- ✅ Compteur de produits par catégorie
- ✅ Sous-catégories visibles
- ✅ Click sur une catégorie → redirection vers `/products?category=X`

### 2. Tester la Page À Propos

**Navigation:**
1. Cliquer sur **"À propos"** dans la navbar
2. Ou naviguer: http://localhost:4200/about

**Vérifications:**
- ✅ Contenu en français affiché
- ✅ Sections: Histoire, Valeurs, Statistiques
- ✅ Identité tunisienne mise en avant
- ✅ Design responsive et moderne

### 3. Tester le Menu Déroulant Catégories

**Actions:**
1. Hover sur **"Catégories"** dans la navbar
2. Click sur **"Toutes les catégories"** → `/categories`
3. Click sur une catégorie spécifique → `/products?category=X`

### 4. Tester les API REST

**Avec cURL:**

```bash
# Get all categories
curl http://localhost:8082/api/categories

# Get root categories with subcategories
curl http://localhost:8082/api/categories/root

# Get About content
curl http://localhost:8082/api/contents/key/about

# Get dashboard statistics
curl http://localhost:8082/api/stats/dashboard

# Search products
curl "http://localhost:8082/api/products/search?keyword=salon"

# Filter products by category
curl "http://localhost:8082/api/products/category/1?page=0&size=12"
```

**Avec Postman:**
1. Import collection depuis Swagger
2. Base URL: `http://localhost:8082`
3. Tester chaque endpoint

**Avec Swagger UI:**
```
http://localhost:8082/swagger-ui.html
```

### 5. Vérifier la Base de Données

**Avec pgAdmin:**
1. Ouvrir http://localhost:5050
2. Login: `admin@admin.com` / `admin`
3. Connecter à `ecommerce-postgres`

**Avec psql:**
```bash
docker exec -it ecommerce-postgres psql -U postgres

# Se connecter à la DB products
\c ecommerce_products

# Vérifier les catégories
SELECT * FROM category;

# Vérifier les contenus
SELECT * FROM contents;

# Vérifier les produits
SELECT * FROM product LIMIT 5;
```

---

## 📊 Endpoints Principaux

### Categories
```
GET    /api/categories              - Toutes les catégories
GET    /api/categories/root         - Catégories racines
GET    /api/categories/{id}         - Une catégorie
POST   /api/categories              - Créer
PUT    /api/categories/{id}         - Modifier
DELETE /api/categories/{id}         - Supprimer
```

### Content (Nouveau)
```
GET    /api/contents                - Tous les contenus
GET    /api/contents/key/{key}      - Par clé (about, terms, etc.)
POST   /api/contents                - Créer
PUT    /api/contents/{id}           - Modifier
DELETE /api/contents/{id}           - Supprimer
```

### Products
```
GET    /api/products                - Liste paginée
GET    /api/products/{id}           - Un produit
GET    /api/products/search         - Recherche
GET    /api/products/filter         - Filtrage avancé
GET    /api/products/featured       - Produits vedettes
```

### Statistics (Nouveau)
```
GET    /api/stats/dashboard         - Statistiques globales
```

---

## 🐛 Dépannage

### Problème: Port déjà utilisé

**Frontend (Port 4200):**
```bash
# Trouver le processus
netstat -ano | findstr :4200

# Tuer le processus
taskkill /F /PID <PID>

# Ou utiliser un autre port
ng serve --port 4201
```

**Backend (Port 8082):**
```bash
netstat -ano | findstr :8082
taskkill /F /PID <PID>
```

### Problème: Docker ne démarre pas

```bash
# Vérifier Docker Desktop
docker ps

# Redémarrer Docker Desktop
# Puis relancer:
cd ecommerce-backend
docker-compose down
docker-compose up -d
```

### Problème: Base de données vide

```bash
# Recharger les données
docker exec -i ecommerce-postgres psql -U postgres < test-data.sql

# Ou manuellement
docker exec -it ecommerce-postgres psql -U postgres
\c ecommerce_products
\i /path/to/test-data.sql
```

### Problème: Erreur de compilation Maven

```bash
# Nettoyer et rebuild
cd ecommerce-backend
mvn clean install -DskipTests

# Puis lancer les services
cd product-service
mvn spring-boot:run
```

### Problème: Erreur npm

```bash
# Supprimer node_modules et package-lock.json
cd modern-ecommerce-frontend
rm -rf node_modules package-lock.json

# Réinstaller
npm install

# Lancer
npm start
```

---

## 📁 Structure des Fichiers

```
ecommerce-angular-springboot-main/
│
├── ecommerce-backend/
│   ├── product-service/
│   │   ├── src/main/java/.../product/
│   │   │   ├── controller/
│   │   │   │   ├── CategoryController.java ✅ Enhanced
│   │   │   │   ├── ContentController.java ✅ NEW
│   │   │   │   ├── ProductController.java ✅ Complete
│   │   │   │   └── StatsController.java ✅ NEW
│   │   │   ├── service/
│   │   │   │   ├── CategoryService.java
│   │   │   │   ├── ContentService.java ✅ NEW
│   │   │   │   ├── ProductService.java
│   │   │   │   └── StatsService.java ✅ NEW
│   │   │   ├── entity/
│   │   │   │   ├── Category.java
│   │   │   │   ├── Content.java ✅ NEW
│   │   │   │   └── Product.java
│   │   │   ├── dto/
│   │   │   │   ├── CategoryDto.java
│   │   │   │   ├── ContentDto.java ✅ NEW
│   │   │   │   ├── DashboardStatsDto.java ✅ NEW
│   │   │   │   └── ProductDto.java
│   │   │   └── repository/
│   │   │       ├── CategoryRepository.java
│   │   │       ├── ContentRepository.java ✅ NEW
│   │   │       └── ProductRepository.java ✅ Enhanced
│   │   └── API_DOCUMENTATION.md ✅ NEW
│   ├── test-data.sql ✅ Enhanced
│   └── BACKEND_IMPLEMENTATION_SUMMARY.md ✅ NEW
│
├── modern-ecommerce-frontend/
│   ├── src/app/
│   │   ├── features/
│   │   │   ├── categories/
│   │   │   │   └── categories.component.ts ✅ NEW
│   │   │   └── about/
│   │   │       └── about.component.ts ✅ NEW
│   │   ├── core/components/navbar/
│   │   │   └── navbar.component.ts ✅ Enhanced
│   │   └── app.routes.ts ✅ Enhanced
│   └── package.json
│
├── START_SERVICES.bat
└── COMPLETE_STARTUP_GUIDE.md ✅ NEW
```

---

## ✅ Checklist de Vérification

### Backend
- [ ] Docker containers actifs (`docker ps`)
- [ ] PostgreSQL accessible (Port 5432)
- [ ] Données de test chargées
- [ ] Product Service actif (Port 8082)
- [ ] Swagger UI accessible (http://localhost:8082/swagger-ui.html)
- [ ] API Categories répond
- [ ] API Content répond
- [ ] API Stats répond

### Frontend
- [ ] Node modules installés
- [ ] Angular dev server actif (Port 4200)
- [ ] Page d'accueil charge
- [ ] Page Catégories accessible
- [ ] Page À Propos accessible
- [ ] Menu déroulant Catégories fonctionne
- [ ] Navigation entre pages OK

### Intégration
- [ ] Frontend → Backend API fonctionne
- [ ] Catégories affichées depuis backend
- [ ] Pas d'erreurs CORS
- [ ] Console browser propre (pas d'erreurs)

---

## 🎉 C'est Prêt!

Votre plateforme e-commerce est maintenant complète avec:
- ✅ Backend REST API complet
- ✅ Frontend Angular moderne
- ✅ Pages Catégories et À Propos
- ✅ Système de contenu multilingue
- ✅ Statistiques dashboard
- ✅ Documentation Swagger

**URLs Importantes:**
- Frontend: http://localhost:4200
- Backend API: http://localhost:8082
- Swagger: http://localhost:8082/swagger-ui.html
- pgAdmin: http://localhost:5050

**Prochaines étapes:**
1. Tester toutes les fonctionnalités
2. Personnaliser le contenu
3. Ajouter vos propres catégories/produits
4. Déployer en production

---

**Questions ou problèmes?**
- Vérifier les logs dans les terminaux
- Consulter BACKEND_IMPLEMENTATION_SUMMARY.md
- Tester avec Swagger UI
- Vérifier la base de données avec pgAdmin

**Bon développement! 🚀**
