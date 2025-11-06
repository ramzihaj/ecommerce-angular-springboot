# 🚀 Guide de Démarrage Backend Tunisia

## Options de Lancement

Vous avez **3 options** pour lancer le backend :

### Option 1: 🐳 Backend Complet avec Docker (Recommandé)
**Tout en un seul clic** - Base de données + Services Spring Boot

```bash
# Lancer tout
.\START_BACKEND_TUNISIA.bat
```

**Ce qui démarre**:
- ✅ PostgreSQL 18 (port 5432)
- ✅ Redis 7 (port 6379)
- ✅ PgAdmin 4 (port 5050)
- ✅ Adminer (port 8090)
- ✅ Product Service (port 8081)
- ✅ API Gateway (port 8080)

### Option 2: 💾 Base de Données Seulement
**Pour développer avec IDE** - Seulement la BDD, services lancés depuis IntelliJ/Eclipse

```bash
# Lancer uniquement PostgreSQL, Redis, PgAdmin, Adminer
.\START_DATABASE_ONLY.bat
```

Ensuite dans votre IDE:
```bash
# Product Service
cd ecommerce-backend/product-service
mvn spring-boot:run -Dspring-boot.run.profiles=tunisia

# Gateway
cd ecommerce-backend/gateway
mvn spring-boot:run -Dspring-boot.run.profiles=tunisia
```

### Option 3: 📦 Manuel avec Docker Compose
**Contrôle total**

```bash
cd ecommerce-backend

# Lancer tout
docker-compose -f docker-compose-tunisia.yml up --build -d

# Lancer uniquement la BDD
docker-compose -f docker-compose-tunisia.yml up -d postgres redis pgadmin adminer

# Voir les logs
docker-compose -f docker-compose-tunisia.yml logs -f

# Arrêter
docker-compose -f docker-compose-tunisia.yml down

# Arrêter et supprimer les données
docker-compose -f docker-compose-tunisia.yml down -v
```

---

## 🌐 URLs des Services

### Base de Données
| Service | URL | Credentials |
|---------|-----|-------------|
| **PostgreSQL 18** | `localhost:5432` | User: `postgres`<br>Password: `postgres_secure_2024`<br>DB: `ecommerce_tunisia_db` |
| **Redis 7** | `localhost:6379` | Pas de password |
| **PgAdmin 4** | http://localhost:5050 | Email: `admin@maisontn.com`<br>Password: `admin123` |
| **Adminer** | http://localhost:8090 | System: PostgreSQL<br>Server: `postgres`<br>Username: `postgres` |

### Services Spring Boot
| Service | URL | Description |
|---------|-----|-------------|
| **Product Service** | http://localhost:8081 | API des produits |
| **Product Swagger** | http://localhost:8081/swagger-ui.html | Documentation API |
| **Product Health** | http://localhost:8081/actuator/health | Healthcheck |
| **API Gateway** | http://localhost:8080 | Point d'entrée principal |
| **Gateway Health** | http://localhost:8080/actuator/health | Healthcheck gateway |

---

## 📊 Tester les APIs

### Via Gateway (Port 8080)

```bash
# Obtenir tous les produits
curl http://localhost:8080/api/products

# Obtenir un produit par ID
curl http://localhost:8080/api/products/1

# Obtenir produits en vedette
curl http://localhost:8080/api/products/featured

# Obtenir produits Made in Tunisia
curl http://localhost:8080/api/products?madeInTunisia=true

# Rechercher produits
curl http://localhost:8080/api/products/search?query=canape
```

### Via Product Service Direct (Port 8081)

```bash
# Healthcheck
curl http://localhost:8081/actuator/health

# Tous les produits
curl http://localhost:8081/products

# Produit par ID
curl http://localhost:8081/products/1

# Filtrer par catégorie
curl http://localhost:8081/products?category=1

# Produits en vedette
curl http://localhost:8081/products/featured
```

---

## 🗄️ Base de Données

### Connexion PostgreSQL

#### Avec psql (ligne de commande)
```bash
docker exec -it ecommerce-postgres-tn psql -U postgres -d ecommerce_tunisia_db
```

#### Avec PgAdmin (interface web)
1. Ouvrir http://localhost:5050
2. Email: `admin@maisontn.com`
3. Password: `admin123`
4. Ajouter serveur:
   - Nom: `Tunisia PostgreSQL`
   - Host: `postgres` (ou `localhost` si hors Docker)
   - Port: `5432`
   - Username: `postgres`
   - Password: `postgres_secure_2024`
   - Database: `ecommerce_tunisia_db`

#### Avec Adminer (plus léger)
1. Ouvrir http://localhost:8090
2. System: `PostgreSQL`
3. Server: `postgres` (ou `localhost`)
4. Username: `postgres`
5. Password: `postgres_secure_2024`
6. Database: `ecommerce_tunisia_db`

### Données Disponibles

La base est pré-chargée avec:
- ✅ 6 catégories tunisiennes
- ✅ 19 produits (dont 12 Made in Tunisia)
- ✅ 3 utilisateurs de test
- ✅ 3 commandes exemples
- ✅ Adresses tunisiennes

#### Requêtes SQL Utiles

```sql
-- Voir tous les produits
SELECT id, name, name_ar, price_tnd, made_in_tunisia 
FROM products 
ORDER BY created_at DESC;

-- Produits Made in Tunisia
SELECT name, price_tnd, category_name 
FROM products 
WHERE made_in_tunisia = true;

-- Produits par catégorie
SELECT c.name_fr as category, COUNT(*) as total_products, 
       AVG(p.price_tnd) as avg_price
FROM products p
JOIN categories c ON p.category_id = c.id
GROUP BY c.name_fr;

-- Commandes récentes
SELECT o.id, o.order_number, o.total_amount_tnd, o.status,
       u.email, o.created_at
FROM orders o
JOIN users u ON o.user_id = u.id
ORDER BY o.created_at DESC
LIMIT 10;
```

---

## 🔍 Monitoring & Logs

### Voir les Logs

```bash
# Tous les services
docker-compose -f docker-compose-tunisia.yml logs -f

# Service spécifique
docker-compose -f docker-compose-tunisia.yml logs -f product-service
docker-compose -f docker-compose-tunisia.yml logs -f gateway
docker-compose -f docker-compose-tunisia.yml logs -f postgres

# Dernières 100 lignes
docker-compose -f docker-compose-tunisia.yml logs --tail=100 product-service
```

### État des Services

```bash
# Voir tous les containers
docker-compose -f docker-compose-tunisia.yml ps

# Voir l'utilisation des ressources
docker stats
```

### Healthchecks

```bash
# Product Service
curl http://localhost:8081/actuator/health

# Gateway
curl http://localhost:8080/actuator/health

# PostgreSQL
docker exec ecommerce-postgres-tn pg_isready -U postgres

# Redis
docker exec ecommerce-redis-tn redis-cli ping
```

---

## 🐛 Troubleshooting

### Problème: Port déjà utilisé

**Symptôme**: Erreur "port already allocated"

**Solution**:
```bash
# Voir quel processus utilise le port
netstat -ano | findstr :8080
netstat -ano | findstr :5432

# Arrêter tous les containers
docker-compose -f docker-compose-tunisia.yml down

# Si ça persiste, redémarrer Docker Desktop
```

### Problème: Service ne démarre pas

**Solution 1**: Voir les logs
```bash
docker-compose -f docker-compose-tunisia.yml logs product-service
```

**Solution 2**: Reconstruire les images
```bash
docker-compose -f docker-compose-tunisia.yml build --no-cache product-service
docker-compose -f docker-compose-tunisia.yml up -d product-service
```

### Problème: Base de données vide

**Solution**: Réinitialiser avec les scripts SQL
```bash
# Arrêter et supprimer les données
docker-compose -f docker-compose-tunisia.yml down -v

# Redémarrer (les scripts SQL seront réexécutés)
docker-compose -f docker-compose-tunisia.yml up -d postgres

# Attendre 30 secondes puis vérifier
docker exec -it ecommerce-postgres-tn psql -U postgres -d ecommerce_tunisia_db -c "SELECT COUNT(*) FROM products;"
```

### Problème: Build Maven échoue

**Solution 1**: Build en local d'abord
```bash
cd ecommerce-backend
mvn clean install -DskipTests
```

**Solution 2**: Vérifier Java version
```bash
java -version
# Doit être Java 21
```

### Problème: Connexion PostgreSQL refusée

**Vérifier**:
```bash
# Container en cours d'exécution?
docker ps | grep postgres

# Healthcheck OK?
docker inspect ecommerce-postgres-tn | grep Health -A 10

# Port exposé?
docker port ecommerce-postgres-tn
```

---

## 🔄 Commandes Utiles

### Redémarrage Rapide

```bash
# Redémarrer un service
docker-compose -f docker-compose-tunisia.yml restart product-service

# Redémarrer tous
docker-compose -f docker-compose-tunisia.yml restart
```

### Mise à Jour du Code

```bash
# Rebuild et redémarrage
docker-compose -f docker-compose-tunisia.yml up --build -d product-service

# Forcer rebuild sans cache
docker-compose -f docker-compose-tunisia.yml build --no-cache product-service
docker-compose -f docker-compose-tunisia.yml up -d product-service
```

### Nettoyage

```bash
# Arrêter tout
docker-compose -f docker-compose-tunisia.yml down

# Arrêter et supprimer les volumes (ATTENTION: perte de données)
docker-compose -f docker-compose-tunisia.yml down -v

# Supprimer les images
docker-compose -f docker-compose-tunisia.yml down --rmi all

# Nettoyage Docker complet
docker system prune -a --volumes
```

---

## 📊 Architecture

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  Frontend Angular (Port 4200)                    │
│                                                  │
└─────────────────┬────────────────────────────────┘
                  │
                  │ HTTP
                  ↓
┌──────────────────────────────────────────────────┐
│                                                  │
│  API Gateway (Port 8080)                         │
│  - CORS Configuration                            │
│  - Circuit Breaker                               │
│  - Route /api/products → Product Service         │
│                                                  │
└─────────────────┬────────────────────────────────┘
                  │
                  │ Internal
                  ↓
┌──────────────────────────────────────────────────┐
│                                                  │
│  Product Service (Port 8081)                     │
│  - REST API                                      │
│  - Swagger UI                                    │
│  - Business Logic                                │
│                                                  │
└──────┬──────────────────────┬────────────────────┘
       │                      │
       │ JDBC                 │ Redis Protocol
       ↓                      ↓
┌──────────────┐      ┌──────────────┐
│              │      │              │
│ PostgreSQL   │      │   Redis 7    │
│    18        │      │   (Cache)    │
│              │      │              │
└──────────────┘      └──────────────┘
```

---

## ✅ Checklist de Démarrage

- [ ] Docker Desktop installé et démarré
- [ ] Ports disponibles (5432, 6379, 8080, 8081, 5050, 8090)
- [ ] Au moins 4GB RAM disponible
- [ ] 10GB espace disque
- [ ] Lancer `.\START_BACKEND_TUNISIA.bat`
- [ ] Attendre ~2 minutes (build initial)
- [ ] Vérifier http://localhost:8080/actuator/health
- [ ] Vérifier http://localhost:8081/actuator/health
- [ ] Tester API: `curl http://localhost:8080/api/products`
- [ ] Accéder PgAdmin: http://localhost:5050
- [ ] Frontend connecté au backend

---

## 🎯 Prochaines Étapes

1. **Connecter le Frontend au Backend**
   - Modifier `product.effects.ts`
   - Mettre `USE_MOCK_DATA = false`
   - Configurer `ApiService` avec `http://localhost:8080`

2. **Implémenter Order Service**
   - Créer Dockerfile
   - Ajouter au docker-compose
   - Configurer routes dans Gateway

3. **Implémenter User Service**
   - Authentification JWT
   - Gestion profils
   - Historique commandes

4. **Intégration Paiements**
   - D17 API
   - Konnect API
   - Flouci API

---

**Le backend Tunisia est prêt ! 🇹🇳 🚀**
