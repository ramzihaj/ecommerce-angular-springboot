# 🚀 Quick Start Guide

## Démarrage Rapide (Windows)

### 1️⃣ Démarrer Infrastructure
```powershell
cd ecommerce-backend
docker-compose up -d
```

### 2️⃣ Démarrer Backend
```powershell
# Dans ecommerce-backend
mvn clean install

# Démarrer chaque service (nouvelle fenêtre pour chaque)
cd gateway && mvn spring-boot:run
cd user-service && mvn spring-boot:run
cd product-service && mvn spring-boot:run
cd order-service && mvn spring-boot:run
```

### 3️⃣ Démarrer Frontend
```powershell
cd frontend
npm start
```

> **Note**: Si Redis/PostgreSQL sont déjà en cours d'exécution sur les ports 6379/5432, vous pouvez les utiliser directement sans docker-compose.

## ✅ Vérification
- Frontend: http://localhost:4200
- API Gateway: http://localhost:8080
- Swagger: http://localhost:8081/swagger-ui.html

## 🔧 Base de Données
- PostgreSQL: localhost:5432
- User: postgres
- Password: postgres
- Databases: ecommerce_users, ecommerce_products, ecommerce_orders

## 📋 Comptes de Test
Créez un compte via: http://localhost:4200/auth/register

Votre backend e-commerce est maintenant complet et fonctionnel ! 🎉
