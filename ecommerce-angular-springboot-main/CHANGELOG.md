# Changelog

## [Mode Démo Frontend] - 2025-11-02

### ✅ Ajouté
- **Mode démo activé par défaut** - Les produits s'affichent automatiquement
- **Mock interceptor** - Intercepte les appels API et retourne des données de test
- **12 produits de démonstration** avec images Unsplash
- **Banner démo** - Indique visuellement que le mode démo est actif
- **Guide complet** - Documentation pour utiliser le mode démo

### 🔧 Corrigé
- **Format de réponse API** - L'intercepteur retourne maintenant le bon format `{ data: ... }`
- **Produits non affichés** - Les produits s'affichent correctement au démarrage
- **Activation automatique** - Le mode mock s'active automatiquement au premier lancement

### 📝 Documentation
- `FRONTEND_DEMO_GUIDE.md` - Guide complet du mode démo
- `START_FRONTEND_DEMO.bat` - Script de lancement
- `CHANGELOG.md` - Ce fichier

### 🎯 Utilisation

**Démarrer le frontend:**
```bash
cd modern-ecommerce-frontend
npm start
```

**Les produits s'affichent automatiquement!**

**Pour désactiver le mode démo:**
```javascript
localStorage.setItem('useMocks', 'false')
location.reload()
```

---

## [Nettoyage du Projet] - 2025-11-02

### 🗑️ Supprimé
- 16 fichiers de scripts et documentation obsolètes
- Fichiers dupliqués et non utilisés

### ✅ Ajouté
- `SETUP.bat` - Script de configuration unique
- `START_SERVICES.bat` - Démarrage des microservices
- `STOP_SERVICES.bat` - Arrêt des services
- `TROUBLESHOOTING.md` - Guide de dépannage
- `QUICK_START.md` - Démarrage rapide
- `PROJECT_CLEANUP_SUMMARY.md` - Résumé du nettoyage

### 🔧 Corrigé
- `docker-compose.yml` - Suppression du champ `version` obsolète
- Structure du projet simplifiée et organisée
- Documentation mise à jour et cohérente

### ✅ Vérifié
- Infrastructure Docker opérationnelle
- 4 bases de données PostgreSQL créées
- Redis fonctionnel
- pgAdmin accessible

---

**Version actuelle:** Mode Démo Frontend Ready  
**Date:** 2 Novembre 2025
