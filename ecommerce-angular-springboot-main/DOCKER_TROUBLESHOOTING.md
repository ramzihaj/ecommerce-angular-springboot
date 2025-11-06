# 🐳 Docker Troubleshooting Guide

## Problème Actuel: Erreur de Résolution DNS Docker

### Symptôme
```
failed to resolve reference "docker.io/library/postgres:15-alpine": 
lookup registry-1.docker.io: no such host
```

## Solutions

### Solution 1: Redémarrer Docker Desktop (Recommandé)

1. **Fermer Docker Desktop complètement**
   - Clic droit sur l'icône Docker dans la barre des tâches
   - "Quit Docker Desktop"

2. **Attendre 10 secondes**

3. **Redémarrer Docker Desktop**
   - Ouvrir Docker Desktop depuis le menu Démarrer

4. **Attendre que Docker soit complètement démarré**
   - L'icône Docker devient verte dans la barre des tâches

5. **Relancer les containers**
   ```bash
   cd ecommerce-backend
   docker-compose up -d
   ```

### Solution 2: Vérifier la Connexion Internet

```bash
# Test de connectivité
ping registry-1.docker.io

# Si ça ne fonctionne pas, vérifier votre connexion internet
```

### Solution 3: Configurer DNS Docker

**Éditer le fichier Docker daemon.json:**

Localisation:
- Windows: `C:\Users\<username>\.docker\daemon.json`
- Ou via Docker Desktop: Settings → Docker Engine

Ajouter:
```json
{
  "dns": ["8.8.8.8", "8.8.4.4"]
}
```

Puis redémarrer Docker Desktop.

### Solution 4: Utiliser une Image Locale Cache

Si les images sont déjà téléchargées:

```bash
# Vérifier les images disponibles
docker images

# Si postgres:15-alpine existe, lancer directement
docker-compose up -d
```

### Solution 5: Mode Offline (Si images déjà présentes)

```bash
# Désactiver temporairement le pull automatique
docker-compose up -d --no-build
```

### Solution 6: Utiliser un Proxy (Si vous êtes derrière un firewall d'entreprise)

**Docker Desktop → Settings → Resources → Proxies**

Configurer:
- HTTP Proxy
- HTTPS Proxy
- No Proxy

## Vérification Post-Configuration

### 1. Vérifier que Docker fonctionne
```bash
docker --version
docker ps
```

### 2. Tester le pull d'image
```bash
docker pull hello-world
```

### 3. Lancer l'infrastructure
```bash
cd ecommerce-backend
docker-compose up -d
```

### 4. Vérifier les containers
```bash
docker ps
```

Vous devriez voir:
```
CONTAINER ID   IMAGE                    STATUS    PORTS
...            postgres:15-alpine       Up        0.0.0.0:5432->5432/tcp
...            redis:7-alpine           Up        0.0.0.0:6379->6379/tcp
...            dpage/pgadmin4:latest    Up        0.0.0.0:5050->80/tcp
```

### 5. Tester PostgreSQL
```bash
docker exec -it ecommerce-postgres psql -U postgres -c "SELECT version();"
```

## Alternative: Installation Locale (Sans Docker)

Si Docker continue à poser problème, vous pouvez installer PostgreSQL et Redis localement:

### PostgreSQL
1. Télécharger: https://www.postgresql.org/download/windows/
2. Installer avec les paramètres:
   - Port: 5432
   - User: postgres
   - Password: postgres

### Redis
1. Télécharger: https://github.com/microsoftarchive/redis/releases
2. Installer sur le port 6379

### Créer les Databases
```sql
psql -U postgres
CREATE DATABASE ecommerce_users;
CREATE DATABASE ecommerce_products;
CREATE DATABASE ecommerce_orders;
\q
```

### Charger les données
```bash
psql -U postgres -d ecommerce_products -f test-data.sql
```

## Commandes Utiles

```bash
# Arrêter tous les containers
docker-compose down

# Supprimer les volumes (reset complet)
docker-compose down -v

# Voir les logs
docker-compose logs postgres
docker-compose logs redis

# Redémarrer un container spécifique
docker restart ecommerce-postgres

# Entrer dans un container
docker exec -it ecommerce-postgres bash
```

## Support

Si le problème persiste:
1. Vérifier les logs Docker Desktop
2. Redémarrer votre ordinateur
3. Réinstaller Docker Desktop
4. Utiliser l'installation locale (sans Docker)

---

**Note**: Une fois Docker fonctionnel, le backend démarrera sans problème car toutes les dépendances sont correctement configurées.
