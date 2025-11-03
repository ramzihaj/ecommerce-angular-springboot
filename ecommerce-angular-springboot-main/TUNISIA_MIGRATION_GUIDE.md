# 🇹🇳 Guide de Migration - E-Commerce Tunisien

## 📋 Table des Matières
1. [Prérequis](#prérequis)
2. [Migration de la Base de Données](#migration-base-données)
3. [Configuration Backend](#configuration-backend)
4. [Migration Frontend Next.js](#migration-frontend)
5. [Intégration Paiements Tunisiens](#paiements-tunisiens)
6. [Système de Livraison](#système-livraison)
7. [Tests et Validation](#tests-validation)

---

## 🎯 Prérequis

### Logiciels Requis
- **Docker Desktop** 4.25+ et Docker Compose 2.23+
- **Java JDK** 17 ou supérieur
- **Node.js** 18+ et npm 9+
- **Git** 2.40+

### Compétences
- Connaissance de Spring Boot 3
- Bases de React/Next.js
- SQL et PostgreSQL
- Docker et conteneurisation

---

## 🗄️ Migration de la Base de Données

### Étape 1: Sauvegarde des Données Actuelles

```bash
# Sauvegarder l'ancienne base de données
cd ecommerce-backend

# Dump de chaque base
docker exec ecommerce-postgres pg_dump -U postgres ecommerce_users > backup/users_old.sql
docker exec ecommerce-postgres pg_dump -U postgres ecommerce_products > backup/products_old.sql
docker exec ecommerce-postgres pg_dump -U postgres ecommerce_orders > backup/orders_old.sql
docker exec ecommerce-postgres pg_dump -U postgres ecommerce_payments > backup/payments_old.sql
```

### Étape 2: Arrêt des Services Actuels

```bash
# Arrêter tous les conteneurs
docker-compose down

# Optionnel: Nettoyer les volumes (ATTENTION: supprime les données)
docker-compose down -v
```

### Étape 3: Démarrage PostgreSQL 18

```bash
# Copier le fichier d'environnement
cp .env.tunisia .env

# Démarrer PostgreSQL 18 avec la nouvelle configuration
docker-compose -f docker-compose-tunisia.yml up -d postgres

# Vérifier les logs
docker logs -f ecommerce-postgres-tn
```

### Étape 4: Vérification de l'Installation

```bash
# Se connecter à PostgreSQL
docker exec -it ecommerce-postgres-tn psql -U postgres

# Vérifier les bases de données
\l

# Vérifier la version
SELECT version();

# Vérifier le timezone
SHOW timezone;

# Sortir
\q
```

### Étape 5: Migration des Données (si nécessaire)

Si vous avez des données existantes à migrer:

```sql
-- Script de migration personnalisé
-- Adapter selon vos besoins

-- Exemple: Migration des utilisateurs
\c ecommerce_users_tn

-- Copier les anciens utilisateurs avec adaptation
INSERT INTO users (username, email, password, first_name, last_name, phone, role, active)
SELECT 
    username, 
    email, 
    password, 
    first_name, 
    last_name,
    -- Adapter le format téléphone pour la Tunisie
    CASE 
        WHEN phone LIKE '+33%' THEN REPLACE(phone, '+33', '+216')
        ELSE phone
    END,
    role,
    active
FROM old_users_table;
```

---

## ⚙️ Configuration Backend

### Mise à jour des Services Spring Boot

#### 1. Product Service

Fichier: `ecommerce-backend/product-service/src/main/resources/application.yml`

```yaml
spring:
  application:
    name: product-service
  
  datasource:
    url: jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_PRODUCTS:ecommerce_products_tn}
    username: ${DB_USER:postgres}
    password: ${DB_PASSWORD:postgres}
    driver-class-name: org.postgresql.Driver
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.PostgreSQLDialect
        jdbc:
          time_zone: Africa/Tunis
  
  data:
    redis:
      host: ${REDIS_HOST:localhost}
      port: ${REDIS_PORT:6379}
      timeout: 60000ms
      lettuce:
        pool:
          max-active: 8
          max-idle: 8
          min-idle: 2
  
  cache:
    type: redis
    redis:
      time-to-live: 3600000
      cache-null-values: false

server:
  port: 8082
  servlet:
    context-path: /api/products
    encoding:
      charset: UTF-8
      enabled: true

# Configuration Tunisie
app:
  currency: TND
  currency-symbol: "د.ت"
  decimal-places: 3
  timezone: Africa/Tunis
  locale: fr_TN

logging:
  level:
    com.ecommerce: INFO
    org.hibernate.SQL: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
  file:
    name: logs/product-service.log
```

#### 2. Order Service

Fichier: `ecommerce-backend/order-service/src/main/resources/application.yml`

```yaml
spring:
  application:
    name: order-service
  
  datasource:
    url: jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_ORDERS:ecommerce_orders_tn}
    username: ${DB_USER:postgres}
    password: ${DB_PASSWORD:postgres}
  
  jpa:
    hibernate:
      ddl-auto: validate
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        jdbc:
          time_zone: Africa/Tunis

server:
  port: 8083
  servlet:
    context-path: /api/orders

# Configuration Livraison Tunisie
shipping:
  default-fee-tnd: ${DEFAULT_SHIPPING_FEE_TND:7.000}
  free-threshold-tnd: ${FREE_SHIPPING_THRESHOLD_TND:200.000}
  express-fee-tnd: ${EXPRESS_SHIPPING_FEE_TND:15.000}
  governorates:
    - Tunis
    - Ariana
    - Ben Arous
    - Manouba
    - Nabeul
    - Bizerte
    - Sousse
    - Monastir
    - Mahdia
    - Sfax
    - Gabès
    - Médenine
    - Tataouine
    - Gafsa
    - Tozeur
    - Kébili
    - Kairouan
    - Kasserine
    - Sidi Bouzid
    - Jendouba
    - Le Kef
    - Siliana
    - Béja
    - Zaghouan

logging:
  level:
    com.ecommerce: INFO
```

#### 3. Payment Service

Fichier: `ecommerce-backend/payment-service/src/main/resources/application.yml`

```yaml
spring:
  application:
    name: payment-service
  
  datasource:
    url: jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_PAYMENTS:ecommerce_payments_tn}
    username: ${DB_USER:postgres}
    password: ${DB_PASSWORD:postgres}

server:
  port: 8084
  servlet:
    context-path: /api/payments

# Gateways de paiement tunisiens
payment:
  currency: TND
  gateways:
    d17:
      enabled: ${D17_ENABLED:true}
      api-key: ${D17_API_KEY:}
      api-secret: ${D17_API_SECRET:}
      base-url: https://api.d17.tn
    
    konnect:
      enabled: ${KONNECT_ENABLED:true}
      api-key: ${KONNECT_API_KEY:}
      wallet-id: ${KONNECT_WALLET_ID:}
      base-url: https://api.konnect.network
    
    flouci:
      enabled: ${FLOUCI_ENABLED:true}
      app-token: ${FLOUCI_APP_TOKEN:}
      app-secret: ${FLOUCI_APP_SECRET:}
      base-url: https://developers.flouci.com
    
    cod:
      enabled: ${COD_ENABLED:true}
      max-amount-tnd: ${COD_MAX_AMOUNT_TND:2000.000}

logging:
  level:
    com.ecommerce: INFO
```

### Création des Entités JPA Adaptées

#### Entité Product (avec prix TND)

```java
// product-service/src/main/java/com/ecommerce/product/entity/Product.java
package com.ecommerce.product.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String name;
    
    @Column(name = "name_ar", length = 200)
    private String nameAr;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "description_ar", columnDefinition = "TEXT")
    private String descriptionAr;
    
    @Column(name = "price_tnd", nullable = false, precision = 10, scale = 3)
    private BigDecimal priceTnd;
    
    @Column(name = "discount_price_tnd", precision = 10, scale = 3)
    private BigDecimal discountPriceTnd;
    
    @Column(name = "stock_quantity")
    private Integer stockQuantity = 0;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
    
    @Column(length = 100)
    private String brand;
    
    @Column(unique = true, length = 100)
    private String sku;
    
    @Column(name = "image_url", length = 500)
    private String imageUrl;
    
    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> images;
    
    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> specifications;
    
    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> dimensions;
    
    @Column(name = "weight_kg", precision = 8, scale = 2)
    private BigDecimal weightKg;
    
    @Column(length = 200)
    private String material;
    
    @Column(name = "material_ar", length = 200)
    private String materialAr;
    
    @Column(length = 100)
    private String color;
    
    @Column(name = "color_ar", length = 100)
    private String colorAr;
    
    private Boolean featured = false;
    
    @Column(name = "new_arrival")
    private Boolean newArrival = false;
    
    @Column(name = "best_seller")
    private Boolean bestSeller = false;
    
    @Column(name = "made_in_tunisia")
    private Boolean madeInTunisia = false;
    
    private Boolean active = true;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

---

## 🚀 Migration Frontend Next.js

### Création du Nouveau Projet Next.js

```bash
# Créer le nouveau frontend
cd ecommerce-angular-springboot-main
npx create-next-app@latest tunisia-ecommerce-frontend

# Options recommandées:
# ✔ TypeScript? Yes
# ✔ ESLint? Yes
# ✔ Tailwind CSS? Yes
# ✔ src/ directory? Yes
# ✔ App Router? Yes
# ✔ Import alias? Yes (@/*)

cd tunisia-ecommerce-frontend
```

### Installation des Dépendances

```bash
npm install
npm install @tanstack/react-query axios zustand
npm install react-icons lucide-react
npm install framer-motion
npm install next-intl # pour multilingue FR/AR
npm install @headlessui/react @radix-ui/react-dialog
npm install react-hook-form zod @hookform/resolvers
npm install date-fns clsx tailwind-merge
```

### Structure du Projet

```
tunisia-ecommerce-frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (shop)/
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   └── orders/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── ProductFilters.tsx
│   │   ├── cart/
│   │   │   ├── CartItem.tsx
│   │   │   └── CartSummary.tsx
│   │   ├── checkout/
│   │   │   ├── ShippingForm.tsx
│   │   │   ├── PaymentMethods.tsx
│   │   │   └── OrderSummary.tsx
│   │   └── ui/ (composants réutilisables)
│   ├── lib/
│   │   ├── api/
│   │   │   ├── products.ts
│   │   │   ├── orders.ts
│   │   │   └── auth.ts
│   │   ├── utils/
│   │   │   ├── currency.ts
│   │   │   └── format.ts
│   │   └── constants/
│   │       ├── governorates.ts
│   │       └── payment-methods.ts
│   ├── store/
│   │   ├── cart.ts
│   │   └── auth.ts
│   └── types/
│       ├── product.ts
│       ├── order.ts
│       └── user.ts
├── public/
│   ├── images/
│   └── logos/
└── tailwind.config.ts
```

### Configuration Tailwind pour Tunisie

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef8f3',
          500: '#f2723d',
          600: '#e05020',
        },
        secondary: {
          500: '#3d7d92',
        },
        tunisia: {
          red: '#E70013',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 💳 Intégration Paiements Tunisiens

### 1. D17 (Dix-Sept)

```java
// PaymentService.java
@Service
public class D17PaymentService implements PaymentGateway {
    
    @Value("${payment.gateways.d17.api-key}")
    private String apiKey;
    
    @Value("${payment.gateways.d17.api-secret}")
    private String apiSecret;
    
    public PaymentResponse initiatePayment(PaymentRequest request) {
        // Implémentation D17
        // Documentation: https://docs.d17.tn
    }
}
```

### 2. Konnect

```java
@Service
public class KonnectPaymentService implements PaymentGateway {
    // Implémentation Konnect
    // Documentation: https://api.konnect.network/docs
}
```

### 3. Flouci

```java
@Service
public class FlouciPaymentService implements PaymentGateway {
    // Implémentation Flouci
    // Documentation: https://developers.flouci.com
}
```

---

## 📦 Système de Livraison

### Configuration des Gouvernorats

```typescript
// src/lib/constants/governorates.ts
export const TUNISIA_GOVERNORATES = [
  { code: 'TUN', name: 'Tunis', nameAr: 'تونس', shippingDays: 1-2 },
  { code: 'ARI', name: 'Ariana', nameAr: 'أريانة', shippingDays: 1-2 },
  { code: 'BEN', name: 'Ben Arous', nameAr: 'بن عروس', shippingDays: 1-2 },
  { code: 'MAN', name: 'Manouba', nameAr: 'منوبة', shippingDays: 2-3 },
  { code: 'NAB', name: 'Nabeul', nameAr: 'نابل', shippingDays: 2-3 },
  { code: 'BIZ', name: 'Bizerte', nameAr: 'بنزرت', shippingDays: 2-3 },
  { code: 'SOU', name: 'Sousse', nameAr: 'سوسة', shippingDays: 2-4 },
  { code: 'MON', name: 'Monastir', nameAr: 'المنستير', shippingDays: 2-4 },
  { code: 'MAH', name: 'Mahdia', nameAr: 'المهدية', shippingDays: 3-5 },
  { code: 'SFA', name: 'Sfax', nameAr: 'صفاقس', shippingDays: 3-5 },
  // ... autres gouvernorats
] as const;
```

### Calcul des Frais de Livraison

```typescript
// src/lib/utils/shipping.ts
export function calculateShipping(
  governorate: string,
  orderTotal: number,
  isExpress: boolean = false
): number {
  const FREE_SHIPPING_THRESHOLD = 200; // TND
  const STANDARD_FEE = 7; // TND
  const EXPRESS_FEE = 15; // TND
  
  if (orderTotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }
  
  return isExpress ? EXPRESS_FEE : STANDARD_FEE;
}
```

---

## ✅ Tests et Validation

### 1. Démarrage Complet

```bash
# Démarrer les services de base
cd ecommerce-backend
docker-compose -f docker-compose-tunisia.yml up -d

# Démarrer les microservices
./mvnw spring-boot:run -pl product-service
./mvnw spring-boot:run -pl order-service
./mvnw spring-boot:run -pl payment-service
./mvnw spring-boot:run -pl user-service

# Démarrer le frontend
cd ../tunisia-ecommerce-frontend
npm run dev
```

### 2. Tests Unitaires

```bash
# Backend
./mvnw test

# Frontend
npm run test
```

### 3. Validation des APIs

Accéder à Swagger UI:
- Products: http://localhost:8082/swagger-ui.html
- Orders: http://localhost:8083/swagger-ui.html
- Payments: http://localhost:8084/swagger-ui.html

### 4. Vérification PostgreSQL

```bash
# Connexion PgAdmin
http://localhost:5050

# Ou Adminer
http://localhost:8090
```

---

## 📊 Checklist de Migration

- [ ] PostgreSQL 18 installé et configuré
- [ ] Bases de données créées
- [ ] Schéma adapté pour Tunisie (TND, adresses)
- [ ] Données de test insérées
- [ ] Services Spring Boot mis à jour
- [ ] Frontend Next.js initialisé
- [ ] Composants réutilisables créés
- [ ] Intégration paiements tunisiens
- [ ] Système de livraison configuré
- [ ] Tests réussis
- [ ] Documentation à jour

---

## 🆘 Support

Pour toute question:
- Email: dev@maisontn.com
- Documentation: `/docs`
- Issues: GitHub Issues

**Bonne migration! 🚀**
