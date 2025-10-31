# E-Commerce Backend - Microservices Architecture

Modern e-commerce backend built with Spring Boot 3, implementing a microservices-ready architecture.

## 🏗️ Architecture

### Modules
- **common**: Shared entities, DTOs, and utilities
- **user-service** (Port 8081): User management & JWT authentication
- **product-service** (Port 8082): Product catalog & inventory
- **order-service** (Port 8083): Order management
- **payment-service** (Port 8084): Payment processing
- **notification-service** (Port 8085): Email & WebSocket notifications
- **gateway** (Port 8080): API Gateway with routing

## 🚀 Technologies

- **Spring Boot 3.3.0**
- **Spring Security** with JWT
- **Spring Cloud Gateway**
- **Spring Data JPA**
- **PostgreSQL** - Main database
- **Redis** - Caching layer
- **WebSocket** - Real-time notifications
- **OpenAPI/Swagger** - API documentation
- **Lombok** - Reduce boilerplate
- **MapStruct** - Object mapping

## 📋 Prerequisites

- Java 21
- Maven 3.8+
- PostgreSQL 15+
- Redis 7+

## 🛠️ Setup

### 1. Database Configuration

Create PostgreSQL databases:
```sql
CREATE DATABASE ecommerce_users;
CREATE DATABASE ecommerce_products;
CREATE DATABASE ecommerce_orders;
CREATE DATABASE ecommerce_payments;
```

### 2. Redis Installation

**Windows:**
```powershell
# Using Chocolatey
choco install redis-64

# Or download from: https://github.com/microsoftarchive/redis/releases
```

**Linux/Mac:**
```bash
# Ubuntu/Debian
sudo apt-get install redis-server

# macOS
brew install redis
```

Start Redis:
```bash
redis-server
```

### 3. Build & Run

Build all modules:
```bash
mvn clean install
```

Run services in order:

1. **Gateway** (Port 8080):
```bash
cd gateway
mvn spring-boot:run
```

2. **User Service** (Port 8081):
```bash
cd user-service
mvn spring-boot:run
```

3. **Product Service** (Port 8082):
```bash
cd product-service
mvn spring-boot:run
```

4. **Order Service** (Port 8083):
```bash
cd order-service
mvn spring-boot:run
```

5. **Payment Service** (Port 8084):
```bash
cd payment-service
mvn spring-boot:run
```

6. **Notification Service** (Port 8085):
```bash
cd notification-service
mvn spring-boot:run
```

## 📚 API Documentation

Once services are running, access Swagger UI:

- **User Service**: http://localhost:8081/swagger-ui.html
- **Product Service**: http://localhost:8082/swagger-ui.html
- **Order Service**: http://localhost:8083/swagger-ui.html

## 🔑 API Endpoints

### Authentication (User Service - Port 8081)
```
POST /api/auth/register - Register new user
POST /api/auth/login - Login user
```

### Products (Product Service - Port 8082)
```
GET    /api/products - Get all products (paginated)
GET    /api/products/{id} - Get product by ID
GET    /api/products/search?keyword= - Search products
GET    /api/products/filter - Filter products
GET    /api/products/featured - Get featured products
GET    /api/products/new-arrivals - Get new arrivals
GET    /api/products/most-viewed - Get most viewed
POST   /api/products - Create product (Admin)
PUT    /api/products/{id} - Update product (Admin)
DELETE /api/products/{id} - Delete product (Admin)
```

### Orders (Order Service - Port 8083)
```
GET    /api/orders - Get user orders
GET    /api/orders/{id} - Get order by ID
POST   /api/orders - Create order
PUT    /api/orders/{id}/status - Update order status
```

## 🔐 Security

- JWT-based authentication
- BCrypt password encoding
- Role-based access control (USER, ADMIN, VENDOR, SUPPORT)
- CORS configuration for Angular frontend

## 🎯 Features

### Caching
- Redis caching for products
- Automatic cache eviction on updates
- Configurable TTL (10 minutes default)

### Real-time Notifications
- WebSocket support for order updates
- Email notifications for order confirmations
- Event-driven architecture ready

### API Gateway
- Centralized routing
- Load balancing ready
- CORS handling
- Request/response logging

## 🔧 Configuration

Key configuration files:
- `application.yml` - Service-specific settings
- `pom.xml` - Maven dependencies

### Environment Variables

```properties
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000

# Email (Notification Service)
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

## 📊 Database Schema

Auto-generated via Hibernate DDL (ddl-auto: update)
- Entities with audit fields (createdAt, updatedAt)
- Optimistic locking with @Version
- Indexed columns for performance

## 🧪 Testing

Run tests:
```bash
mvn test
```

## 📦 Deployment

Build JAR files:
```bash
mvn clean package
```

Run JAR:
```bash
java -jar target/service-name-1.0.0.jar
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📝 License

MIT License
