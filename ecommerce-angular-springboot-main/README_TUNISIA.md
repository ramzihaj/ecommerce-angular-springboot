# 🇹🇳 E-Commerce Tunisie - Modernisation Complète

> Site e-commerce modernisé pour le marché tunisien spécialisé dans les produits de maison (salon, meubles, cuisine)

## 📋 Vue d'Ensemble

Ce projet représente la modernisation complète d'un site e-commerce adapté spécifiquement pour le marché tunisien avec :

- **PostgreSQL 18** - Dernière version avec optimisations
- **Spring Boot 3** - Microservices adaptés pour TND
- **Next.js 14** - Frontend moderne et performant
- **Paiements tunisiens** - D17, Konnect, Flouci, COD
- **Livraison locale** - 24 gouvernorats tunisiens

---

## 🚀 Démarrage Rapide

### 1. Prérequis

```bash
# Vérifier les installations
docker --version          # 4.25+
docker-compose --version  # 2.23+
java --version            # JDK 17+
node --version            # 18+
```

### 2. Démarrage des Services

```bash
# Windows
START_TUNISIA_SERVICES.bat

# Linux/Mac
chmod +x START_TUNISIA_SERVICES.sh
./START_TUNISIA_SERVICES.sh
```

### 3. Accès aux Services

| Service | URL | Identifiants |
|---------|-----|--------------|
| PostgreSQL 18 | localhost:5432 | postgres / postgres |
| PgAdmin | http://localhost:5050 | admin@maisontn.com / admin123 |
| Adminer | http://localhost:8090 | - |
| Redis | localhost:6379 | - |

---

## 📂 Structure du Projet

```
ecommerce-angular-springboot-main/
├── ecommerce-backend/               # Backend Spring Boot
│   ├── product-service/            # Microservice Produits
│   ├── order-service/              # Microservice Commandes
│   ├── payment-service/            # Microservice Paiements
│   ├── user-service/               # Microservice Utilisateurs
│   ├── gateway/                    # API Gateway
│   └── docker-compose-tunisia.yml  # Configuration Docker
│
├── tunisia-ecommerce-frontend/      # Frontend Next.js (nouveau)
│   ├── src/
│   │   ├── app/                    # Pages App Router
│   │   ├── components/             # Composants réutilisables
│   │   ├── lib/                    # Utilitaires et API
│   │   └── types/                  # Types TypeScript
│   └── public/                     # Assets statiques
│
├── migration/                       # Scripts de migration
│   ├── init-databases-tn.sql       # Création bases de données
│   ├── tunisia-schema.sql          # Schéma adapté Tunisie
│   ├── tunisia-data.sql            # Données de test
│   └── cleanup-old-data.sql        # Nettoyage
│
├── config/                          # Configurations
│   ├── postgresql.conf             # Config PostgreSQL 18
│   └── redis.conf                  # Config Redis
│
└── docs/                            # Documentation
    ├── TUNISIA_MODERNIZATION_PLAN.md
    ├── TUNISIA_MIGRATION_GUIDE.md
    └── api/                        # Documentation API
```

---

## 💾 Base de Données

### Schéma Adapté Tunisie

#### Produits
- Prix en **TND** (3 décimales)
- Support bilingue **FR/AR**
- Dimensions et poids
- Badge "Made in Tunisia"

```sql
CREATE TABLE product (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200),
    name_ar VARCHAR(200),
    price_tnd DECIMAL(10, 3),     -- Prix en dinars
    made_in_tunisia BOOLEAN,       -- Produit tunisien
    ...
);
```

#### Adresses Tunisiennes
- 24 gouvernorats
- Délégation, ville, code postal
- Building, étage, appartement
- Point de repère

```sql
CREATE TABLE address (
    governorate VARCHAR(100),      -- Gouvernorat
    delegation VARCHAR(100),       -- Délégation
    postal_code VARCHAR(10),       -- Code postal TN
    landmark TEXT,                 -- Point de repère
    ...
);
```

#### Commandes
- Statuts: PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED
- Montants en TND
- Suivi de livraison

### Données de Test

Le projet inclut des données de test réalistes pour le marché tunisien :

- **4 utilisateurs** (admin, 2 clients, 1 vendeur)
- **6 catégories** (Salon, Chambre, Salle à Manger, Cuisine, Bureau, Décoration)
- **19 produits** de meubles tunisiens
- **3 commandes** exemples
- **Adresses** tunisiennes réelles

---

## 🔧 Backend - Spring Boot

### Microservices

#### 1. Product Service (Port 8082)
- Gestion des produits et catégories
- Recherche multilingue (FR/AR)
- Cache Redis
- Prix en TND

#### 2. Order Service (Port 8083)
- Gestion des commandes
- Calcul frais de port
- Livraison par gouvernorat

#### 3. Payment Service (Port 8084)
- Intégration gateways tunisiens
- D17, Konnect, Flouci
- Paiement à la livraison (COD)

#### 4. User Service (Port 8081)
- Authentification JWT
- Gestion profils
- Adresses tunisiennes

### Configuration

Fichier `.env` :

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres_secure_2024

# Currency
CURRENCY=TND
CURRENCY_SYMBOL=د.ت
CURRENCY_DECIMAL_PLACES=3

# Shipping
DEFAULT_SHIPPING_FEE_TND=7.000
FREE_SHIPPING_THRESHOLD_TND=200.000

# Payment Gateways
D17_ENABLED=true
KONNECT_ENABLED=true
FLOUCI_ENABLED=true
COD_ENABLED=true
```

---

## 🎨 Frontend - Next.js

### Caractéristiques

✅ **Next.js 14** avec App Router  
✅ **TypeScript** pour la sécurité des types  
✅ **Tailwind CSS** pour le styling  
✅ **React Query** pour la gestion d'état  
✅ **Bilingue** FR/AR  
✅ **SEO optimisé**  
✅ **Performance** maximale  

### Composants Modulaires

```typescript
components/
├── layout/
│   ├── Header.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── products/
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   └── ProductFilters.tsx
├── checkout/
│   ├── TunisiaAddressForm.tsx
│   ├── PaymentMethods.tsx
│   └── OrderSummary.tsx
└── ui/
    ├── Button.tsx
    ├── Input.tsx
    └── Badge.tsx
```

### Exemple ProductCard

```tsx
<ProductCard 
  product={product}
  locale="fr"
/>
```

Affiche :
- Image produit avec hover effect
- Badge "Made in Tunisia" 🇹🇳
- Prix en TND avec réduction
- Bouton "Ajouter au panier"

---

## 💳 Paiements Tunisiens

### Méthodes Supportées

#### 1. Paiement à la Livraison (COD)
- **Limité à**: 2000 TND
- **Frais**: Aucun
- **Disponible**: Tous les gouvernorats

#### 2. D17 (Carte Bancaire)
- **Type**: Carte VISA/MasterCard tunisienne
- **Frais**: Variable selon la banque
- **Délai**: Instantané

#### 3. Konnect
- **Type**: Paiement mobile
- **Frais**: 0.5%
- **Délai**: Instantané

#### 4. Flouci
- **Type**: Wallet mobile
- **Frais**: Gratuit
- **Délai**: Instantané

### Configuration Gateway

```yaml
payment:
  gateways:
    d17:
      enabled: true
      api-key: ${D17_API_KEY}
      base-url: https://api.d17.tn
    
    konnect:
      enabled: true
      api-key: ${KONNECT_API_KEY}
      base-url: https://api.konnect.network
```

---

## 🚚 Livraison Tunisie

### Zones de Livraison

**24 Gouvernorats supportés** :

| Région | Gouvernorats | Délai Standard | Délai Express |
|--------|-------------|----------------|---------------|
| **Grand Tunis** | Tunis, Ariana, Ben Arous, Manouba | 1-2 jours | 24h |
| **Nord-Est** | Nabeul, Bizerte, Zaghouan | 2-3 jours | 1-2 jours |
| **Sahel** | Sousse, Monastir, Mahdia | 2-4 jours | 1-3 jours |
| **Centre-Est** | Sfax, Kairouan | 3-5 jours | 2-4 jours |
| **Sud** | Gabès, Médenine, Tataouine | 4-6 jours | 3-5 jours |
| **Centre-Ouest** | Gafsa, Kasserine, Sidi Bouzid | 3-5 jours | 2-4 jours |
| **Nord-Ouest** | Jendouba, Le Kef, Siliana, Béja | 3-5 jours | 2-4 jours |

### Frais de Port

```typescript
const SHIPPING = {
  standard: 7.000,      // TND
  express: 15.000,      // TND
  freeThreshold: 200.000 // TND
};
```

**Livraison gratuite** pour toute commande ≥ 200 TND !

---

## 📊 Migration depuis l'Ancien Système

### Étape 1: Sauvegarde

```bash
# Sauvegarder l'ancienne base
cd ecommerce-backend
docker exec ecommerce-postgres pg_dumpall -U postgres > backup_old.sql
```

### Étape 2: Migration

```bash
# Démarrer nouvelle base PostgreSQL 18
docker-compose -f docker-compose-tunisia.yml up -d postgres

# La migration s'effectue automatiquement via les scripts init
```

### Étape 3: Vérification

```bash
# Connexion à PostgreSQL
docker exec -it ecommerce-postgres-tn psql -U postgres

# Vérifier les bases
\l

# Vérifier les produits
\c ecommerce_products_tn
SELECT COUNT(*) FROM product;
```

---

## 🧪 Tests

### Backend

```bash
cd ecommerce-backend
./mvnw test
```

### Frontend

```bash
cd tunisia-ecommerce-frontend
npm run test
npm run test:e2e
```

### API Tests

Accéder à Swagger UI :
- Products: http://localhost:8082/swagger-ui.html
- Orders: http://localhost:8083/swagger-ui.html
- Payments: http://localhost:8084/swagger-ui.html

---

## 📚 Documentation Complète

| Document | Description |
|----------|-------------|
| [TUNISIA_MODERNIZATION_PLAN.md](./TUNISIA_MODERNIZATION_PLAN.md) | Plan complet de modernisation |
| [TUNISIA_MIGRATION_GUIDE.md](./TUNISIA_MIGRATION_GUIDE.md) | Guide de migration étape par étape |
| [API Documentation](./docs/api/) | Documentation des APIs |

---

## 🎯 Roadmap

### Phase 1 - ✅ Terminé
- [x] Migration PostgreSQL 18
- [x] Schéma adapté Tunisie
- [x] Données de test
- [x] Configuration optimisée

### Phase 2 - 🚧 En cours
- [ ] Adaptation backend Spring Boot
- [ ] Configuration paiements tunisiens
- [ ] API adresses tunisiennes

### Phase 3 - 📅 À venir
- [ ] Développement frontend Next.js
- [ ] Composants réutilisables
- [ ] Support bilingue FR/AR
- [ ] Interface admin

### Phase 4 - 📅 Planifié
- [ ] Intégration gateways paiement
- [ ] Système de livraison
- [ ] Notifications SMS
- [ ] Tests E2E

---

## 🤝 Contribution

Contributions bienvenues ! Merci de :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📝 License

Ce projet est sous licence MIT. Voir `LICENSE` pour plus de détails.

---

## 📧 Contact

- **Email**: contact@maisontn.com
- **Support**: support@maisontn.com
- **Documentation**: [docs.maisontn.com](https://docs.maisontn.com)

---

## 🙏 Remerciements

- PostgreSQL Team pour PostgreSQL 18
- Spring Boot Team
- Next.js Team
- Communauté open-source tunisienne

---

**Made with ❤️ in Tunisia 🇹🇳**
