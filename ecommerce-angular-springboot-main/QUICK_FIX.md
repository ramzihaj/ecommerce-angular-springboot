# 🔧 Quick Fix - Résolution des Problèmes

## ❌ Problèmes Rencontrés

1. **Les tables n'existent pas** - `ERROR: relation "users" does not exist`
2. **Maven non trouvé** - `'mvn' n'est pas reconnu`

## ✅ Solution

### Problème 1: Tables Manquantes

**Cause:** Spring Boot doit créer les tables automatiquement via JPA, mais il faut que les services démarrent au moins une fois.

**Solution:** Utilisez le nouveau script qui démarre les services pour créer les tables:

```powershell
.\COMPLETE_SETUP_FIXED.bat
```

Ce script:
1. ✅ Démarre PostgreSQL
2. ✅ Crée les bases
3. ✅ Build le backend
4. ✅ **Démarre chaque service brièvement pour créer les tables**
5. ✅ Arrête les services
6. ✅ Charge les données de test
7. ✅ Prêt à utiliser !

### Problème 2: Maven Non Trouvé

**Option A - Installer Maven (Recommandé):**

1. Télécharger: https://maven.apache.org/download.cgi
2. Extraire dans `C:\Program Files\Apache\Maven`
3. Ajouter au PATH:
   ```
   Système > Variables d'environnement > Path > Nouveau
   C:\Program Files\Apache\Maven\bin
   ```
4. Vérifier: `mvn -version`

**Option B - Utiliser Maven Wrapper:**

Le projet devrait inclure `mvnw.cmd`. Si présent:
```powershell
cd ecommerce-backend
.\mvnw.cmd clean install
```

**Option C - Utiliser le Script Fixé:**

Le script `COMPLETE_SETUP_FIXED.bat` cherche automatiquement le wrapper.

---

## 🚀 Démarrage Correct

### Première Fois (Setup Complet):

```powershell
# 1. Setup avec le script fixé
.\COMPLETE_SETUP_FIXED.bat

# Durée: ~10 minutes
# - Build le backend
# - Crée les tables
# - Charge les données
```

### Lancer le Projet:

```powershell
# Si Maven est installé
.\START_PROJECT.bat

# OU si Maven n'est pas installé
.\SIMPLE_START.bat
```

---

## 📊 Vérification des Tables

Pour vérifier que les tables ont été créées:

```powershell
# Se connecter à PostgreSQL
docker exec -it ecommerce-postgres psql -U postgres

# Dans psql:
\c ecommerce_users
\dt

# Devrait afficher: users, roles, etc.
```

---

## 🎯 Ordre Correct d'Exécution

```
1. COMPLETE_SETUP_FIXED.bat (première fois seulement)
   ↓
2. Attendre que tout se termine
   ↓
3. START_PROJECT.bat (ou SIMPLE_START.bat)
   ↓
4. Ouvrir http://localhost:4200
   ↓
5. Se connecter: john.doe@example.com / test123
```

---

## 🛠️ Si Ça Ne Marche Toujours Pas

### Nettoyer et Recommencer:

```powershell
# 1. Arrêter tous les services
taskkill /F /IM java.exe
taskkill /F /IM node.exe

# 2. Supprimer les containers
cd ecommerce-backend
docker-compose down -v

# 3. Relancer le setup
cd ..
.\COMPLETE_SETUP_FIXED.bat
```

### Vérifier Docker:

```powershell
# Docker doit être en cours
docker ps

# Devrait afficher: ecommerce-postgres, ecommerce-redis
```

### Logs en Cas d'Erreur:

```powershell
# Logs PostgreSQL
docker logs ecommerce-postgres

# Logs Redis
docker logs ecommerce-redis
```

---

## 💡 Astuce Maven

Si vous ne voulez pas installer Maven globalement, utilisez le wrapper:

```powershell
cd ecommerce-backend

# Créer le wrapper si absent
mvn -N wrapper:wrapper

# Utiliser le wrapper
.\mvnw.cmd clean install
```

---

## ✅ Checklist de Vérification

Avant de démarrer, vérifiez:

- [ ] Docker Desktop est lancé
- [ ] Ports 5432, 6379, 8080-8085, 4200 sont libres
- [ ] Maven installé OU mvnw.cmd présent
- [ ] Node.js installé (pour le frontend)

---

**Utilisez `COMPLETE_SETUP_FIXED.bat` pour un setup automatique complet !** 🚀
