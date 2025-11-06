# 🚀 Guide Full-Stack E-Commerce Tunisia

## Architecture Complète

### Backend (Spring Boot 3.3 + Java 21)
```
Product Service (Port 8081)
  ↓
PostgreSQL 18 (Port 5432)
Redis 7 (Port 6379)
```

### Frontend (Angular 19)
```
Angular App (Port 4200)
  ↓
Product Service API (http://localhost:8081)
```

---

## 📦 État Actuel

### ✅ Backend Configuré
- [x] PostgreSQL 18 avec données tunisiennes
- [x] Redis 7 pour cache
- [x] Product Service Dockerfile
- [x] Configuration application-tunisia.yml
- [x] Docker Compose complet

### ✅ Frontend Configuré  
- [x] 8 produits tunisiens mockés
- [x] Panier NgRx fonctionnel
- [x] Favoris NgRx fonctionnel
- [x] Notifications toast
- [x] Service API configuré
- [x] Basculement mock/API implémenté

### 🔄 En Cours
- [ ] Build Product Service avec Maven
- [ ] Lancer Product Service container
- [ ] Tester les endpoints API
- [ ] Connecter le frontend au backend

---

## 🌐 URLs

### Backend APIs
```
Product Service:  http://localhost:8081
  GET  /products              - Tous les produits
  GET  /products/{id}         - Produit par ID
  GET  /products/featured     - Produits en vedette
  GET  /products/search?q=    - Recherche
  
Swagger UI:       http://localhost:8081/swagger-ui.html
Health Check:     http://localhost:8081/actuator/health
```

### Base de Données
```
PostgreSQL:   localhost:5432
  Database:   ecommerce_tunisia_db
  User:       postgres
  Password:   postgres_secure_2024

PgAdmin:      http://localhost:5050
  Email:      admin@maisontn.com
  Password:   admin123

Adminer:      http://localhost:8090
```

### Frontend
```
Angular App:  http://localhost:4200
```

---

## 🚀 Démarrage Complet

### 1. Lancer les Services Backend

#### Option A: Docker Compose (Recommandé)
```bash
cd ecommerce-backend

# Lancer tout
docker-compose -f docker-compose-tunisia.yml up -d

# Voir les logs
docker-compose -f docker-compose-tunisia.yml logs -f product-service
```

#### Option B: Base de données seulement
```bash
# Lancer PostgreSQL + Redis
docker-compose -f docker-compose-tunisia.yml up -d postgres redis

# Vérifier
docker ps
```

### 2. Lancer le Frontend

```bash
cd modern-ecommerce-frontend

# Installer les dépendances (si nécessaire)
npm install

# Lancer en mode développement
npm start

# Ouvrir
http://localhost:4200
```

---

## 🔧 Configuration Frontend

### Basculer entre Mock et API Réelle

**Fichier**: `src/environments/environment.ts`

#### Mode Mock (Données fictives)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081',
  wsUrl: 'ws://localhost:8085/ws',
  useMockData: true  // ← Utiliser les mocks
};
```

#### Mode API (Backend réel)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081',
  wsUrl: 'ws://localhost:8085/ws',
  useMockData: false  // ← Utiliser l'API
};
```

### Logique dans ProductService

```typescript
getAllProducts(): Observable<TunisiaProduct[]> {
  if (this.useMockData) {
    // Retourner les données mockées
    return of(MOCK_TUNISIA_PRODUCTS).pipe(delay(300));
  }
  // Appeler l'API réelle
  return this.http.get<TunisiaProduct[]>(`${this.apiUrl}/products`).pipe(
    catchError(() => {
      console.warn('API error, falling back to mock data');
      return of(MOCK_TUNISIA_PRODUCTS);
    })
  );
}
```

---

## 🧪 Tests

### 1. Tester le Backend

```bash
# Healthcheck Product Service
curl http://localhost:8081/actuator/health

# Tous les produits
curl http://localhost:8081/products

# Produit par ID
curl http://localhost:8081/products/1

# Produits en vedette
curl http://localhost:8081/products/featured
```

### 2. Tester la Base de Données

```bash
# Via Docker
docker exec -it ecommerce-postgres-tn psql -U postgres -d ecommerce_tunisia_db

# Requêtes SQL
SELECT COUNT(*) FROM products;
SELECT * FROM products WHERE made_in_tunisia = true;
SELECT * FROM categories;
```

### 3. Tester le Frontend

```
1. Ouvrir http://localhost:4200
2. Vérifier que les produits s'affichent
3. Ajouter au panier
4. Ajouter aux favoris
5. Ouvrir DevTools > Network
6. Vérifier les requêtes API
```

---

## 🔄 Flux de Données Complet

### Scénario: Charger les Produits

```
1. User ouvre http://localhost:4200
   ↓
2. HomeComponent ngOnInit()
   ↓
3. Store dispatch loadProducts()
   ↓
4. ProductEffects intercepte
   ↓
5. ProductService.getAllProducts()
   ↓
6. Si useMockData = false:
   HTTP GET http://localhost:8081/products
   ↓
7. Product Service (Spring Boot)
   - Controller reçoit la requête
   - Service interroge PostgreSQL
   - Retourne JSON
   ↓
8. Frontend reçoit les données
   ↓
9. Store dispatch loadProductsSuccess(products)
   ↓
10. Selector met à jour la vue
   ↓
11. ProductGrid affiche les produits
```

---

## 📊 Données Backend vs Frontend

### Mapping Backend → Frontend

**Backend (Java)**:
```java
@Entity
public class Product {
    private Long id;
    private String name;
    private String nameAr;
    private BigDecimal priceTnd;
    private Boolean madeInTunisia;
    // ...
}
```

**Frontend (TypeScript)**:
```typescript
interface TunisiaProduct {
  id: number;
  name: string;
  nameAr?: string;
  price: number;          // priceTnd du backend
  madeInTunisia: boolean;
  // ...
}
```

### Ajustement des Noms de Champs

Si les noms diffèrent, utiliser un **mapper** dans le frontend:

```typescript
// product.service.ts
private mapBackendProduct(backendProduct: any): TunisiaProduct {
  return {
    id: backendProduct.id,
    name: backendProduct.name,
    nameAr: backendProduct.nameAr,
    price: backendProduct.priceTnd,  // Conversion
    madeInTunisia: backendProduct.madeInTunisia,
    // ... autres champs
  };
}

getAllProducts(): Observable<TunisiaProduct[]> {
  return this.http.get<any[]>(`${this.apiUrl}/products`).pipe(
    map(products => products.map(p => this.mapBackendProduct(p)))
  );
}
```

---

## 🐛 Troubleshooting

### Frontend ne se connecte pas au Backend

**Symptôme**: Erreur CORS ou connexion refusée

**Solution 1**: Vérifier que Product Service tourne
```bash
docker ps | grep product-service
curl http://localhost:8081/actuator/health
```

**Solution 2**: Activer CORS dans Product Service

`application-tunisia.yml`:
```yaml
spring:
  web:
    cors:
      allowed-origins: "http://localhost:4200"
      allowed-methods: "GET,POST,PUT,DELETE,OPTIONS"
      allowed-headers: "*"
      allow-credentials: true
```

**Ou** créer une `@Configuration`:
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:4200")
                    .allowedMethods("*")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

### Produits n'apparaissent pas

**Vérifier**:
```
1. Backend répond:
   curl http://localhost:8081/products
   
2. Frontend appelle la bonne URL:
   DevTools > Network > Voir les requêtes
   
3. useMockData est false:
   environment.ts
   
4. Données existent en BDD:
   SELECT COUNT(*) FROM products;
```

### Build Docker échoue

**Solution 1**: Nettoyer et reconstruire
```bash
docker-compose -f docker-compose-tunisia.yml down -v
docker system prune -a
docker-compose -f docker-compose-tunisia.yml build --no-cache product-service
```

**Solution 2**: Vérifier Java/Maven
```bash
docker run --rm maven:3.9-eclipse-temurin-21-alpine mvn --version
```

---

## ✅ Checklist de Vérification

### Backend
- [ ] PostgreSQL tourne et contient des données
- [ ] Redis tourne
- [ ] Product Service build réussi
- [ ] Product Service container actif
- [ ] http://localhost:8081/actuator/health retourne UP
- [ ] http://localhost:8081/products retourne JSON

### Frontend
- [ ] `npm install` terminé
- [ ] `npm start` sans erreurs
- [ ] http://localhost:4200 accessible
- [ ] useMockData = false dans environment.ts
- [ ] DevTools > Network montre appels vers localhost:8081
- [ ] Produits s'affichent dans l'UI

### Intégration
- [ ] Panier fonctionne avec données API
- [ ] Favoris fonctionnent
- [ ] Notifications s'affichent
- [ ] Détails produit fonctionne
- [ ] Recherche fonctionne

---

## 📈 Prochaines Étapes

### Court Terme
1. ✅ Finir build Product Service
2. ✅ Tester APIs
3. ✅ Connecter frontend
4. ✅ Tester intégration

### Moyen Terme
5. [ ] Activer Gateway (port 8080)
6. [ ] Implémenter Order Service
7. [ ] Implémenter User Service (Auth)
8. [ ] Page panier complète
9. [ ] Checkout flow

### Long Terme
10. [ ] Intégration paiements (D17, Konnect)
11. [ ] Livraison avec Aramex/Tunisie Post
12. [ ] Admin panel
13. [ ] Notifications par email/SMS
14. [ ] Analytics

---

## 📚 Documentation

### Backend
- [BACKEND_STARTUP_GUIDE.md](BACKEND_STARTUP_GUIDE.md) - Guide complet backend
- [TUNISIA_MIGRATION_GUIDE.md](TUNISIA_MIGRATION_GUIDE.md) - Migration Tunisia
- Swagger UI: http://localhost:8081/swagger-ui.html

### Frontend
- [COMPLETE_FEATURES_IMPLEMENTATION.md](modern-ecommerce-frontend/COMPLETE_FEATURES_IMPLEMENTATION.md)
- [TUNISIA_PRODUCTS_IMPLEMENTATION.md](modern-ecommerce-frontend/TUNISIA_PRODUCTS_IMPLEMENTATION.md)
- [FINAL_IMPLEMENTATION_GUIDE.md](modern-ecommerce-frontend/FINAL_IMPLEMENTATION_GUIDE.md)

---

**Ready to connect full-stack! 🇹🇳 🚀**
