# 🇹🇳 Plan de Modernisation E-Commerce - Marché Tunisien

## 📋 Vue d'ensemble du Projet

### Objectifs Principaux
1. **Migration PostgreSQL 15 → 18** avec optimisations
2. **Localisation complète** pour le marché tunisien
3. **Nettoyage et optimisation** de la base de données
4. **Frontend Next.js modulaire** (migration depuis Angular)
5. **Adaptation des paiements et livraisons** pour la Tunisie

### Architecture Actuelle
- **Backend**: Microservices Spring Boot 3
  - Gateway (Port 8080)
  - User Service (Port 8081)
  - Product Service (Port 8082)
  - Order Service (Port 8083)
  - Payment Service (Port 8084)
  - Notification Service (Port 8085)
- **Frontend**: Angular 18 avec Tailwind CSS
- **Base de données**: PostgreSQL 15 (4 databases)
- **Cache**: Redis 7
- **Admin**: PgAdmin 4

---

## 🗄️ Phase 1: Migration PostgreSQL 18

### 1.1 Mise à jour Docker Compose

**Fichier**: `docker-compose.yml`

```yaml
services:
  postgres:
    image: postgres:18-alpine
    container_name: ecommerce-postgres-tn
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD:-postgres_secure_2024}
      POSTGRES_DB: postgres
      # Optimisations PostgreSQL 18
      POSTGRES_INITDB_ARGS: "--encoding=UTF8 --locale=fr_TN.UTF-8"
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./migration/init-databases-tn.sql:/docker-entrypoint-initdb.d/01-init.sql
      - ./migration/tunisia-schema.sql:/docker-entrypoint-initdb.d/02-schema.sql
      - ./migration/tunisia-data.sql:/docker-entrypoint-initdb.d/03-data.sql
      - ./config/postgresql.conf:/etc/postgresql/postgresql.conf
    command: 
      - "postgres"
      - "-c"
      - "config_file=/etc/postgresql/postgresql.conf"
    networks:
      - ecommerce-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
```

### 1.2 Configuration PostgreSQL Optimisée

**Nouveau fichier**: `config/postgresql.conf`

```conf
# =====================================================
# PostgreSQL 18 Configuration - Tunisia E-Commerce
# Optimisé pour production moyenne (4GB RAM recommandé)

# CONNEXIONS
max_connections = 200
superuser_reserved_connections = 3

# MÉMOIRE
shared_buffers = 1GB
effective_cache_size = 3GB
maintenance_work_mem = 256MB
work_mem = 5MB

# PERFORMANCES
random_page_cost = 1.1
effective_io_concurrency = 200
default_statistics_target = 100

# ÉCRITURE
wal_buffers = 16MB
min_wal_size = 1GB
max_wal_size = 4GB
checkpoint_completion_target = 0.9

# PLANIFICATEUR
parallel_workers = 4
max_parallel_workers_per_gather = 2
max_parallel_workers = 8

# LOGGING
log_destination = 'stderr'
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d.log'
log_rotation_age = 1d
log_rotation_size = 100MB
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '
log_timezone = 'Africa/Tunis'

# LOCALE
lc_messages = 'fr_TN.UTF-8'
lc_monetary = 'fr_TN.UTF-8'
lc_numeric = 'fr_TN.UTF-8'
lc_time = 'fr_TN.UTF-8'
timezone = 'Africa/Tunis'
```

---

## 🧹 Phase 2: Nettoyage et Optimisation des Données

### 2.1 Script de Nettoyage

**Fichier**: `migration/cleanup-old-data.sql`

```sql
-- Suppression des utilisateurs inactifs depuis plus d'1 an
DELETE FROM users 
WHERE active = false 
AND updated_at < NOW() - INTERVAL '1 year';

-- Suppression des produits obsolètes
DELETE FROM product 
WHERE active = false 
AND stock_quantity = 0 
AND updated_at < NOW() - INTERVAL '6 months';

-- Suppression des paniers abandonnés (> 30 jours)
DELETE FROM cart 
WHERE updated_at < NOW() - INTERVAL '30 days';

-- Suppression des sessions expirées
DELETE FROM user_session 
WHERE expires_at < NOW();

-- Archivage des anciennes commandes (> 2 ans)
-- Créer une table d'archive
CREATE TABLE IF NOT EXISTS order_archive AS 
SELECT * FROM "order" WHERE 1=0;

-- Déplacer les anciennes commandes
INSERT INTO order_archive 
SELECT * FROM "order" 
WHERE created_at < NOW() - INTERVAL '2 years'
AND status IN ('DELIVERED', 'CANCELLED');

-- Supprimer de la table principale
DELETE FROM "order" 
WHERE created_at < NOW() - INTERVAL '2 years'
AND status IN ('DELIVERED', 'CANCELLED');

-- Optimiser les tables
VACUUM ANALYZE users;
VACUUM ANALYZE product;
VACUUM ANALYZE "order";
VACUUM ANALYZE order_item;
```

### 2.2 Optimisations Index

```sql
-- Index pour recherche de produits
CREATE INDEX CONCURRENTLY idx_product_search 
ON product USING GIN (to_tsvector('french', name || ' ' || COALESCE(description, '')));

-- Index pour recherche arabe
CREATE INDEX CONCURRENTLY idx_product_search_ar 
ON product USING GIN (to_tsvector('arabic', COALESCE(name_ar, '') || ' ' || COALESCE(description_ar, '')));

-- Index composite pour filtres
CREATE INDEX CONCURRENTLY idx_product_filters 
ON product (category_id, active, price_tnd) 
WHERE active = true;

-- Index pour commandes utilisateur
CREATE INDEX CONCURRENTLY idx_order_user_date 
ON "order" (user_id, created_at DESC);

-- Statistiques
ANALYZE product;
ANALYZE "order";
```

---

## 🎨 Phase 3: Frontend Next.js Modulaire

### 3.1 Architecture Composants

```typescript
// src/components/products/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils/currency';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  locale?: 'fr' | 'ar';
}

export function ProductCard({ product, locale = 'fr' }: ProductCardProps) {
  const name = locale === 'ar' ? product.nameAr : product.name;
  const price = formatCurrency(product.priceTnd, 'TND');
  const hasDiscount = product.discountPriceTnd && product.discountPriceTnd < product.priceTnd;

  return (
    <Link href={`/products/${product.sku}`}>
      <div className="group card-elegant card-hover cursor-pointer">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {product.newArrival && (
              <span className="badge badge-primary">Nouveau</span>
            )}
            {product.madeInTunisia && (
              <span className="badge bg-tunisia-red text-white">🇹🇳 Made in Tunisia</span>
            )}
            {hasDiscount && (
              <span className="badge bg-green-500 text-white">
                -{Math.round(((product.priceTnd - product.discountPriceTnd!) / product.priceTnd) * 100)}%
              </span>
            )}
          </div>
        </div>

        {/* Infos */}
        <div className="p-6">
          <h3 className="font-display font-bold text-lg mb-2 line-clamp-2">
            {name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              {hasDiscount ? (
                <>
                  <span className="text-2xl font-bold text-primary-600">
                    {formatCurrency(product.discountPriceTnd!, 'TND')}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {price}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-primary-600">{price}</span>
              )}
            </div>
            
            <button className="btn-primary px-4 py-2 text-sm">
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
```

### 3.2 Utilitaires Devise TND

```typescript
// src/lib/utils/currency.ts
export function formatCurrency(
  amount: number,
  currency: string = 'TND',
  locale: string = 'fr-TN'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(amount);
}

export function parseTND(value: string): number {
  // Enlever tous les caractères sauf chiffres et point
  const cleaned = value.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}
```

### 3.3 Formulaire Adresse Tunisienne

```typescript
// src/components/checkout/TunisiaAddressForm.tsx
import { TUNISIA_GOVERNORATES } from '@/lib/constants/governorates';
import { useForm } from 'react-hook-form';

interface AddressFormData {
  fullName: string;
  phone: string;
  streetAddress: string;
  building?: string;
  floor?: string;
  apartment?: string;
  city: string;
  delegation: string;
  postalCode: string;
  governorate: string;
  landmark?: string;
}

export function TunisiaAddressForm() {
  const { register, handleSubmit, watch } = useForm<AddressFormData>();
  const selectedGovernorate = watch('governorate');

  return (
    <form className="space-y-4">
      {/* Nom complet */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Nom complet *
        </label>
        <input
          {...register('fullName', { required: true })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Téléphone */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Téléphone * (Format: +216 XX XXX XXX)
        </label>
        <input
          {...register('phone', { 
            required: true,
            pattern: /^\+216\s?\d{2}\s?\d{3}\s?\d{3}$/
          })}
          placeholder="+216 20 123 456"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Gouvernorat */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Gouvernorat *
        </label>
        <select
          {...register('governorate', { required: true })}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Sélectionnez un gouvernorat</option>
          {TUNISIA_GOVERNORATES.map((gov) => (
            <option key={gov.code} value={gov.code}>
              {gov.name} - {gov.nameAr}
            </option>
          ))}
        </select>
      </div>

      {/* Ville */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Ville *
        </label>
        <input
          {...register('city', { required: true })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Délégation */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Délégation
        </label>
        <input
          {...register('delegation')}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Code postal */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Code postal *
        </label>
        <input
          {...register('postalCode', { required: true })}
          placeholder="1000"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Adresse rue */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Adresse *
        </label>
        <input
          {...register('streetAddress', { required: true })}
          placeholder="Avenue Habib Bourguiba"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Building, Floor, Apartment */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Immeuble</label>
          <input {...register('building')} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Étage</label>
          <input {...register('floor')} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Appartement</label>
          <input {...register('apartment')} className="w-full px-4 py-2 border rounded-lg" />
        </div>
      </div>

      {/* Point de repère */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Point de repère (optionnel)
        </label>
        <textarea
          {...register('landmark')}
          placeholder="En face de la pharmacie centrale"
          className="w-full px-4 py-2 border rounded-lg"
          rows={2}
        />
      </div>
    </form>
  );
}
```

---

## 💰 Phase 4: Méthodes de Paiement Tunisiennes

### 4.1 Composant Sélection Paiement

```typescript
// src/components/checkout/PaymentMethods.tsx
import { useState } from 'react';
import Image from 'next/image';

const PAYMENT_METHODS = [
  {
    id: 'cod',
    name: 'Paiement à la livraison',
    nameAr: 'الدفع عند الاستلام',
    icon: '💵',
    description: 'Payez en espèces lors de la réception',
    maxAmount: 2000,
  },
  {
    id: 'd17',
    name: 'D17 (Carte bancaire)',
    nameAr: 'D17 (بطاقة بنكية)',
    icon: '/images/d17-logo.png',
    description: 'Paiement sécurisé par carte bancaire',
  },
  {
    id: 'konnect',
    name: 'Konnect',
    nameAr: 'Konnect',
    icon: '/images/konnect-logo.png',
    description: 'Paiement mobile Konnect',
  },
  {
    id: 'flouci',
    name: 'Flouci',
    nameAr: 'Flouci',
    icon: '/images/flouci-logo.png',
    description: 'Paiement via Flouci',
  },
];

export function PaymentMethods({ total }: { total: number }) {
  const [selected, setSelected] = useState('cod');

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-display font-bold">Méthode de paiement</h3>
      
      {PAYMENT_METHODS.map((method) => {
        const isDisabled = method.maxAmount && total > method.maxAmount;
        
        return (
          <button
            key={method.id}
            onClick={() => !isDisabled && setSelected(method.id)}
            disabled={isDisabled}
            className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
              selected === method.id
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
            } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{method.icon}</div>
              <div className="flex-1">
                <div className="font-semibold">{method.name}</div>
                <div className="text-sm text-gray-600">{method.description}</div>
                {isDisabled && (
                  <div className="text-sm text-red-600 mt-1">
                    Montant maximum: {method.maxAmount} TND
                  </div>
                )}
              </div>
              {selected === method.id && (
                <div className="text-primary-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
```

---

## 🚚 Phase 5: Système de Livraison Local

### 5.1 Calcul Frais de Port

```typescript
// src/lib/utils/shipping.ts
import { TUNISIA_GOVERNORATES } from '../constants/governorates';

export interface ShippingCalculation {
  fee: number;
  estimatedDays: string;
  isFree: boolean;
}

export function calculateShipping(
  governorate: string,
  orderTotal: number,
  isExpress: boolean = false
): ShippingCalculation {
  const FREE_SHIPPING_THRESHOLD = 200; // TND
  const STANDARD_FEE = 7; // TND
  const EXPRESS_FEE = 15; // TND
  
  const gov = TUNISIA_GOVERNORATES.find(g => g.code === governorate);
  
  const isFree = orderTotal >= FREE_SHIPPING_THRESHOLD;
  const fee = isFree ? 0 : (isExpress ? EXPRESS_FEE : STANDARD_FEE);
  const estimatedDays = gov?.shippingDays || '3-5';
  
  return {
    fee,
    estimatedDays: isExpress 
      ? `${parseInt(estimatedDays.split('-')[0]) - 1}-${parseInt(estimatedDays.split('-')[1]) - 1}` 
      : estimatedDays,
    isFree,
  };
}
```

---

## 📊 Résumé de la Modernisation

### Améliorations Clés

✅ **Base de Données**
- PostgreSQL 15 → 18 (dernière version)
- Schéma optimisé pour la Tunisie
- Prix en TND avec 3 décimales
- Support bilingue (Français/Arabe)
- Index optimisés pour recherche

✅ **Backend**
- Configuration timezone Africa/Tunis
- API adaptées pour TND
- Intégration gateways tunisiens
- Validation adresses tunisiennes

✅ **Frontend**
- Migration Angular → Next.js 14
- Composants modulaires réutilisables
- Support RTL pour l'arabe
- Performance optimisée
- SEO amélioré

✅ **Paiements**
- D17 (carte bancaire)
- Konnect (mobile)
- Flouci (wallet)
- Paiement à la livraison

✅ **Livraison**
- 24 gouvernorats supportés
- Calcul automatique des frais
- Livraison gratuite > 200 TND
- Suivi de commande

### Prochaines Étapes

1. **Semaine 1-2**: Migration base de données
2. **Semaine 3-4**: Adaptation backend
3. **Semaine 5-8**: Développement frontend Next.js
4. **Semaine 9-10**: Intégration paiements
5. **Semaine 11-12**: Tests et déploiement

### Ressources

- [Guide Migration Complet](./TUNISIA_MIGRATION_GUIDE.md)
- [Documentation API](./docs/api/)
- [Composants Frontend](./tunisia-ecommerce-frontend/src/components/)
- [Scripts Migration](./migration/)
