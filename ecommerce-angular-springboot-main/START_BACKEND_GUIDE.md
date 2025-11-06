# 🚀 Guide Rapide - Démarrage Backend Sans Erreurs

## Problème Actuel: Docker DNS Resolution Error

### ⚡ Solution Rapide (2 minutes)

**1. Redémarrer Docker Desktop**
```
- Clic droit sur l'icône Docker (barre des tâches)
- "Quit Docker Desktop"
- Attendre 10 secondes
- Redémarrer Docker Desktop
- Attendre que l'icône devienne verte
```

**2. Utiliser le script de réparation**
```bash
.\QUICK_FIX_DOCKER.bat
```

**3. Vérifier que ça fonctionne**
```bash
docker ps
```

Vous devriez voir 3 containers actifs: postgres, redis, pgadmin.

---

## 📝 Démarrage Complet (Si problème persiste)

### Méthode 1: Script Automatique

```bash
# 1. Aller dans le dossier backend
cd ecommerce-backend

# 2. Lancer le script de réparation
..\QUICK_FIX_DOCKER.bat

# 3. Charger les données de test
docker exec -i ecommerce-postgres psql -U postgres < test-data.sql

# 4. Démarrer le Product Service
cd product-service
mvn spring-boot:run
```

### Méthode 2: Manuel Pas-à-Pas

#### Étape 1: Vérifier Docker
```bash
docker --version
docker ps
```

#### Étape 2: Configurer DNS Docker (Si erreur réseau)

**Ouvrir Docker Desktop → Settings → Docker Engine**

Ajouter ces lignes:
```json
{
  "dns": ["8.8.8.8", "8.8.4.4"],
  "registry-mirrors": []
}
```

Cliquer "Apply & Restart"

#### Étape 3: Démarrer l'infrastructure

```bash
cd ecommerce-backend
docker-compose down
docker-compose up -d
```

Attendre 15 secondes pour que PostgreSQL démarre.

#### Étape 4: Vérifier les containers
```bash
docker ps
```

Résultat attendu:
```
CONTAINER ID   IMAGE                    STATUS    PORTS
xxxxx          postgres:15-alpine       Up        0.0.0.0:5432->5432/tcp
xxxxx          redis:7-alpine           Up        0.0.0.0:6379->6379/tcp
xxxxx          dpage/pgadmin4:latest    Up        0.0.0.0:5050->80/tcp
```

#### Étape 5: Charger les données
```bash
# Option A: Depuis Windows
docker exec -i ecommerce-postgres psql -U postgres < test-data.sql

# Option B: Via psql direct
psql -h localhost -U postgres -d ecommerce_products -f test-data.sql
```

#### Étape 6: Démarrer Product Service
```bash
cd product-service
mvn clean install -DskipTests
mvn spring-boot:run
```

Le service démarrera sur **http://localhost:8082**

#### Étape 7: Vérifier le service
```bash
# Test simple
curl http://localhost:8082/api/categories

# Ou ouvrir dans le navigateur
http://localhost:8082/swagger-ui.html
```

---

## ✅ Checklist de Vérification

Backend est OK si:
- [ ] Docker Desktop est actif (icône verte)
- [ ] `docker ps` montre 3 containers
- [ ] PostgreSQL répond sur port 5432
- [ ] Redis répond sur port 6379
- [ ] Product Service démarre sans erreur
- [ ] Swagger UI accessible: http://localhost:8082/swagger-ui.html
- [ ] API Categories répond: http://localhost:8082/api/categories
- [ ] Aucune erreur dans les logs

---

## 🐛 Dépannage Rapide

### Erreur: "Cannot resolve docker.io"
**Solution**: Problème de connexion internet ou DNS
```bash
# 1. Vérifier internet
ping google.com

# 2. Configurer DNS Docker (voir Étape 2 ci-dessus)

# 3. Redémarrer Docker Desktop
```

### Erreur: "Port 5432 already in use"
**Solution**: Un autre PostgreSQL est actif
```bash
# Trouver le processus
netstat -ano | findstr :5432

# Arrêter le processus
taskkill /F /PID <PID>

# Ou changer le port dans docker-compose.yml
```

### Erreur: "Failed to connect to database"
**Solution**: PostgreSQL n'est pas prêt
```bash
# Attendre 30 secondes et réessayer

# Ou vérifier les logs
docker logs ecommerce-postgres
```

### Erreur Maven: "Cannot resolve dependencies"
**Solution**: Problème de connexion Maven Central
```bash
# 1. Vérifier internet
# 2. Nettoyer et rebuild
mvn clean install -DskipTests -U
```

---

## 🎯 Résultat Final

Une fois tout configuré, vous aurez:

**Infrastructure (Docker):**
- ✅ PostgreSQL: localhost:5432
- ✅ Redis: localhost:6379
- ✅ pgAdmin: localhost:5050

**Backend Services:**
- ✅ Product Service: localhost:8082
- ✅ Swagger UI: localhost:8082/swagger-ui.html

**API Disponibles:**
- ✅ Categories: /api/categories
- ✅ Products: /api/products
- ✅ Content: /api/contents
- ✅ Statistics: /api/stats/dashboard

---

## 📞 Aide Supplémentaire

**Logs utiles:**
```bash
# Docker
docker logs ecommerce-postgres
docker logs ecommerce-redis

# Product Service
# Voir la console où mvn spring-boot:run est lancé
```

**Tests manuels:**
```bash
# Test PostgreSQL
docker exec -it ecommerce-postgres psql -U postgres -c "SELECT version();"

# Test Redis
docker exec -it ecommerce-redis redis-cli PING

# Test API
curl http://localhost:8082/api/categories
```

**Réinitialisation complète:**
```bash
cd ecommerce-backend
docker-compose down -v
docker-compose up -d
# Puis recharger les données
```

---

## ⏭️ Étape Suivante

Une fois le backend démarré avec succès:

```bash
# Lancer le frontend
cd modern-ecommerce-frontend
npm install  # Première fois seulement
npm start
```

Frontend: http://localhost:4200

---

**Temps estimé**: 5-10 minutes  
**Difficulté**: Facile  
**Support**: Voir DOCKER_TROUBLESHOOTING.md pour plus de détails
