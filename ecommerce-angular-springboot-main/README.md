# 🛒 Modern E-Commerce Platform - Full Stack Application

Modern, scalable e-commerce platform built with **Spring Boot 3** microservices backend and **Angular 18** frontend with **NgRx** state management.

## 🌟 Key Features

### Backend (Spring Boot 3)
- ✅ **Microservices Architecture** - Modular, scalable design
- ✅ **Spring Security JWT** - Secure authentication
- ✅ **Redis Caching** - Optimized performance
- ✅ **PostgreSQL** - Robust data persistence
- ✅ **OpenAPI/Swagger** - Complete API documentation
- ✅ **WebSocket** - Real-time notifications
- ✅ **Email Notifications** - Order confirmations
- ✅ **API Gateway** - Centralized routing

### Frontend (Angular 18)
- ✅ **NgRx State Management** - Predictable state container
- ✅ **TailwindCSS** - Modern, utility-first styling
- ✅ **Angular Material** - Premium UI components
- ✅ **Dark/Light Mode** - Theme switcher
- ✅ **Lazy Loading** - Optimized performance
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Animations** - Smooth transitions

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Angular Frontend                      │
│  (NgRx, TailwindCSS, Angular Material, Dark Mode)      │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/WebSocket
┌────────────────────┴────────────────────────────────────┐
│                   API Gateway (8080)                     │
└─────┬──────┬──────┬──────┬──────┬──────────────────────┘
      │      │      │      │      │
  ┌───┴───┐  │      │      │      │
  │ User  │  │      │      │      │
  │ (8081)│  │      │      │      │
  └───┬───┘  │      │      │      │
      │      │      │      │      │
  ┌───┴───┐  │      │      │      │
  │Product│  │      │      │      │
  │ (8082)│  │      │      │      │
  └───┬───┘  │      │      │      │
      │      │      │      │      │
  ┌───┴───┐  │      │      │      │
  │ Order │  │      │      │      │
  │ (8083)│  │      │      │      │
  └───┬───┘  │      │      │      │
      │      │      │      │      │
  ┌───┴──────┴──────┴──────┴──────┴─────┐
  │    PostgreSQL + Redis + Email       │
  └─────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites

**Required:**
- ✅ **Docker Desktop** - Must be installed and running
- ✅ **Java 21** - JDK 21 or higher
- ✅ **Maven 3.8+** - For building backend services
- ✅ **Node.js 18+** - For frontend development
- ✅ **npm 9+** - Node package manager

**Installation Links:**
- Docker Desktop: https://www.docker.com/products/docker-desktop
- Java 21: https://adoptium.net/
- Maven: https://maven.apache.org/download.cgi
- Node.js: https://nodejs.org/

### Windows Setup (Automated)

**⚡ Option 1: Complete Setup (Recommended)**
1. Make sure Docker Desktop is running
2. Run `SETUP.bat` - This will:
   - Check all prerequisites
   - Start Docker infrastructure (PostgreSQL, Redis, pgAdmin)
   - Create databases
   - Build backend services
   - Load test data

**⚡ Option 2: Start Services**
1. After setup, run `START_SERVICES.bat` to start all microservices
2. Services will open in separate windows

### Manual Setup

#### 1. Start Infrastructure (Docker)

```bash
# Make sure Docker Desktop is running first!
cd ecommerce-backend
docker-compose up -d
```

This starts:
- PostgreSQL (port 5432) - username: postgres, password: postgres
- Redis (port 6379)
- pgAdmin (port 5050) - email: admin@ecommerce.com, password: admin

#### 2. Create Databases

```bash
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_users;"
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_products;"
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_orders;"
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_payments;"
```

#### 3. Build Backend Services

```bash
cd ecommerce-backend
mvn clean install -DskipTests
```

#### 4. Start Backend Services

```bash
# Start each service in a separate terminal
cd gateway && mvn spring-boot:run
cd user-service && mvn spring-boot:run
cd product-service && mvn spring-boot:run
cd order-service && mvn spring-boot:run
cd payment-service && mvn spring-boot:run
```

**Service Endpoints:**
- Gateway: `http://localhost:8080`
- User Service: `http://localhost:8081`
- Product Service: `http://localhost:8082`
- Order Service: `http://localhost:8083`
- Payment Service: `http://localhost:8084`

#### 5. Start Frontend

```bash
cd modern-ecommerce-frontend

# Install dependencies (first time only)
npm install

# Start development server
npm start
```

Frontend: `http://localhost:4200`

### 🧪 Test Data

Test credentials (if test data loaded):
- **Admin**: admin@ecommerce.com / test123
- **User 1**: john.doe@example.com / test123
- **User 2**: jane.smith@example.com / test123

Test data includes:
- 4 users (1 admin, 3 customers)
- 11 products across different categories
- 3 sample orders

## 📚 Documentation

### API Documentation (Swagger)
- User Service: http://localhost:8081/swagger-ui.html
- Product Service: http://localhost:8082/swagger-ui.html  
- Order Service: http://localhost:8083/swagger-ui.html

### Backend Documentation
See [`ecommerce-backend/README.md`](./ecommerce-backend/README.md)

### Frontend Documentation
See [`modern-ecommerce-frontend/README.md`](./modern-ecommerce-frontend/README.md)

## 🏗️ Project Structure

```
ecommerce-angular-springboot-main/
├── ecommerce-backend/           # Spring Boot Backend
│   ├── common/                  # Shared entities, DTOs
│   ├── user-service/            # Authentication & Users
│   ├── product-service/         # Product catalog
│   ├── order-service/           # Order management
│   ├── payment-service/         # Payment processing
│   ├── notification-service/    # Email & WebSocket
│   ├── gateway/                 # API Gateway
│   ├── docker-compose.yml       # Infrastructure
│   └── README.md
│
├── frontend/                    # Angular 18 Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/           # Services, guards, interceptors
│   │   │   ├── features/       # Feature modules
│   │   │   └── store/          # NgRx state management
│   │   ├── environments/
│   │   └── styles.css
│   ├── tailwind.config.js
│   └── README.md
│
└── README.md                    # This file
```

## 🔐 Authentication Flow

1. User registers/logs in via `/api/auth/login`
2. Backend returns JWT token
3. Frontend stores token in localStorage
4. Token included in all subsequent API requests
5. Auth guard protects private routes

## 🎨 Frontend Features

### State Management (NgRx)
- **Auth State**: User authentication, JWT token
- **Product State**: Product catalog, featured items
- **Cart State**: Shopping cart with localStorage
- **Order State**: Order history

### Routing
- `/` - Home page
- `/auth/login` - Login
- `/auth/register` - Registration
- `/products` - Product catalog
- `/cart` - Shopping cart
- `/checkout` - Checkout (protected)
- `/orders` - Order history (protected)
- `/admin` - Admin panel (protected)

### Theming
- Light/Dark mode toggle
- Persistent theme preference
- TailwindCSS custom colors
- Smooth transitions

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Spring Boot | 3.3.0 | Framework |
| Spring Security | 3.3.0 | Authentication |
| Spring Cloud Gateway | 2023.0.2 | API Gateway |
| PostgreSQL | 15+ | Database |
| Redis | 7+ | Caching |
| JWT | 0.12.5 | Authentication |
| OpenAPI | 2.5.0 | Documentation |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Angular | 18.2.13 | Framework |
| NgRx | 18.1.1 | State Management |
| TailwindCSS | 3.4.17 | Styling |
| Angular Material | 18.2.13 | UI Components |
| RxJS | 7.8.0 | Reactive Programming |

## 🧪 Testing

### Backend
```bash
cd ecommerce-backend
mvn test
```

### Frontend
```bash
cd modern-ecommerce-frontend
npm test
```

## 📦 Deployment

### Backend (JAR files)
```bash
cd ecommerce-backend
mvn clean package
java -jar target/service-name-1.0.0.jar
```

### Frontend (Static files)
```bash
cd modern-ecommerce-frontend
ng build --configuration production
# Deploy dist/ folder to hosting
```

## 🔧 Configuration

### Backend Environment Variables
```env
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000

# Email
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Frontend Environment Variables
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  wsUrl: 'ws://localhost:8085/ws'
};
```

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/register  - Register new user
POST   /api/auth/login     - Login user
```

### Products
```
GET    /api/products              - Get all products
GET    /api/products/{id}         - Get product by ID
GET    /api/products/featured     - Get featured products
GET    /api/products/search       - Search products
POST   /api/products              - Create product (Admin)
PUT    /api/products/{id}         - Update product (Admin)
DELETE /api/products/{id}         - Delete product (Admin)
```

### Orders
```
GET    /api/orders        - Get user orders
GET    /api/orders/{id}   - Get order by ID
POST   /api/orders        - Create order
PUT    /api/orders/{id}   - Update order status
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 👥 Authors

- Backend Architecture: Spring Boot 3 Microservices
- Frontend Architecture: Angular 18 + NgRx
- UI/UX: TailwindCSS + Angular Material

## 🙏 Acknowledgments

- Spring Boot Team
- Angular Team
- NgRx Team
- TailwindCSS Team

---

**Happy Coding! 🎉**

For detailed setup instructions, see individual README files in backend and frontend directories.
