# 🚀 Démarrer le Projet avec Données de Test

## 📊 Données de Test Incluses

### 👤 Utilisateurs
| Username | Email | Password | Role |
|----------|-------|----------|------|
| admin | admin@ecommerce.com | test123 | ADMIN |
| john.doe | john.doe@example.com | test123 | USER |
| jane.smith | jane.smith@example.com | test123 | USER |
| vendor | vendor@ecommerce.com | test123 | VENDOR |

### 📦 Produits
- **11 produits** dans 5 catégories
- Electronics: iPhone 15 Pro, Samsung S24, MacBook Pro, Dell XPS, Sony Headphones
- Fashion: T-shirts, Dresses, Running Shoes, Leather Jacket
- Home: Sofa, Coffee Table

### ⭐ Avis
- 5 avis clients sur différents produits
- Ratings de 4-5 étoiles

### 🛒 Commandes
- 3 commandes de test
- Statuts: DELIVERED, SHIPPED, PENDING

## 🎯 Démarrage Rapide

### Étape 1: Charger les Données de Test

**Option A - Via psql:**
```powershell
# Se connecter à PostgreSQL
psql -h localhost -U postgres

# Exécuter le script
\i D:/Project/E-Commerce/ecommerce-angular-springboot-main/ecommerce-backend/test-data.sql
```

**Option B - Via pgAdmin:**
1. Ouvrir http://localhost:5050
2. Login: admin@ecommerce.com / admin
3. Ouvrir Query Tool
4. Copier/coller le contenu de `test-data.sql`
5. Exécuter

**Option C - Via Docker:**
```powershell
cd ecommerce-backend
docker exec -i ecommerce-postgres psql -U postgres < test-data.sql
```

### Étape 2: Démarrer les Services

```powershell
# Backend
cd ecommerce-backend
mvn clean install

# Terminal 1 - Gateway
cd gateway && mvn spring-boot:run

# Terminal 2 - User Service
cd user-service && mvn spring-boot:run

# Terminal 3 - Product Service
cd product-service && mvn spring-boot:run

# Terminal 4 - Order Service
cd order-service && mvn spring-boot:run

# Terminal 5 - Frontend
cd modern-ecommerce-frontend
npm start
```

### Étape 3: Tester l'Application

**Frontend:** http://localhost:4200

**Se connecter avec:**
- Email: `john.doe@example.com`
- Password: `test123`

**Ou en tant qu'admin:**
- Email: `admin@ecommerce.com`
- Password: `test123`

## 🧪 Tests API via Swagger

### User Service (http://localhost:8081/swagger-ui.html)
1. POST `/api/auth/login`
   ```json
   {
     "emailOrUsername": "john.doe@example.com",
     "password": "test123"
   }
   ```
2. Copier le token JWT reçu
3. Cliquer sur "Authorize" et coller le token

### Product Service (http://localhost:8082/swagger-ui.html)
1. GET `/api/products` - Voir tous les produits
2. GET `/api/products/featured` - Produits en vedette
3. GET `/api/categories` - Toutes les catégories

### Order Service (http://localhost:8083/swagger-ui.html)
1. GET `/api/orders/user/2` - Commandes de john.doe
2. GET `/api/orders/1` - Détails d'une commande

## 📱 Scénarios de Test

### Scénario 1: Navigation Client
1. ✅ Ouvrir http://localhost:4200
2. ✅ Voir la page d'accueil avec produits en vedette
3. ✅ Cliquer sur "Products" dans le menu
4. ✅ Se connecter avec john.doe
5. ✅ Voir son profil

### Scénario 2: Commande
1. ✅ Se connecter
2. ✅ Ajouter un produit au panier
3. ✅ Voir le panier
4. ✅ Passer commande
5. ✅ Voir l'historique des commandes

### Scénario 3: Admin
1. ✅ Se connecter en tant qu'admin
2. ✅ Accéder au panel admin
3. ✅ Gérer les produits
4. ✅ Voir toutes les commandes

## 🔍 Vérifications

### Base de Données
```sql
-- Vérifier les users
SELECT username, email, role FROM users;

-- Vérifier les produits
SELECT name, price, stock_quantity FROM product;

-- Vérifier les commandes
SELECT order_number, status, final_amount FROM "order";
```

### Redis Cache
```bash
redis-cli
> KEYS *
> GET "products::*"
```

## ⚠️ Troubleshooting

**Problème: Port déjà utilisé (6379, 5432)**
```powershell
# Voir les processus
netstat -ano | findstr :6379
netstat -ano | findstr :5432

# Arrêter si nécessaire
taskkill /PID <PID> /F
```

**Problème: Erreur de connexion DB**
- Vérifier que PostgreSQL est démarré
- Vérifier les credentials dans `application.yml`
- Vérifier que les bases existent

**Problème: JWT token invalide**
- Le token expire après 24h
- Se reconnecter pour obtenir un nouveau token

## 🎉 Succès !

Si tout fonctionne:
- ✅ 4 utilisateurs de test créés
- ✅ 11 produits disponibles
- ✅ 3 commandes historiques
- ✅ Frontend accessible
- ✅ Backend opérationnel
- ✅ APIs documentées

**Vous pouvez maintenant tester toutes les fonctionnalités !** 🚀

---

**Mot de passe universel pour tous les comptes de test: `test123`**
