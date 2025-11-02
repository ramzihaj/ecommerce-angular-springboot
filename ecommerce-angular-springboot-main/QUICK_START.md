# ⚡ Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:

- ✅ **Docker Desktop** - Running and ready
- ✅ **Java 21+** - Check: `java -version`
- ✅ **Maven 3.8+** - Check: `mvn -version`
- ✅ **Node.js 18+** - Check: `node -version`

## 🚀 First Time Setup

### 1. Start Docker Desktop
Open Docker Desktop and wait until it's fully running.

### 2. Run Setup Script
```bash
SETUP.bat
```

This automated script will:
- ✅ Verify all prerequisites
- ✅ Start PostgreSQL, Redis, pgAdmin (Docker)
- ✅ Create all databases
- ✅ Build backend services
- ✅ Load test data

**Duration:** ~5-10 minutes

---

## 🎯 Daily Development

### Start All Services
```bash
START_SERVICES.bat
```

This will start all 5 microservices in separate windows:
- Gateway (8080)
- User Service (8081)
- Product Service (8082)
- Order Service (8083)
- Payment Service (8084)

### Start Frontend
```bash
cd modern-ecommerce-frontend
npm start
```

Frontend runs on: http://localhost:4200

### Stop Everything
```bash
STOP_SERVICES.bat
```

---

## 🔐 Test Credentials

After setup, use these credentials:

**Admin:**
- Email: `admin@ecommerce.com`
- Password: `test123`

**Regular Users:**
- Email: `john.doe@example.com`
- Password: `test123`

---

## 🌐 Important URLs

### Frontend
- Application: http://localhost:4200

### Backend APIs
- API Gateway: http://localhost:8080
- User Service: http://localhost:8081
- Product Service: http://localhost:8082
- Order Service: http://localhost:8083
- Payment Service: http://localhost:8084

### API Documentation (Swagger)
- User API: http://localhost:8081/swagger-ui.html
- Product API: http://localhost:8082/swagger-ui.html
- Order API: http://localhost:8083/swagger-ui.html

### Infrastructure
- pgAdmin: http://localhost:5050
  - Email: `admin@ecommerce.com`
  - Password: `admin`

---

## 🐛 Common Issues

### Docker Not Running
**Error:** `pipe/dockerDesktopLinuxEngine: file not found`

**Fix:** Start Docker Desktop and wait until it's ready

### Maven Not Found
**Error:** `mvn is not recognized`

**Fix:** 
1. Install Maven from https://maven.apache.org/download.cgi
2. Add to PATH
3. Restart terminal

### Port Already in Use
**Error:** `Port 8080 is already in use`

**Fix:** Run `STOP_SERVICES.bat` then start again

---

## 📁 Project Structure

```
ecommerce-angular-springboot-main/
├── SETUP.bat                    # First-time setup
├── START_SERVICES.bat           # Start all backend services
├── STOP_SERVICES.bat            # Stop all services
├── README.md                    # Full documentation
├── TROUBLESHOOTING.md          # Detailed troubleshooting
├── ecommerce-backend/          # Spring Boot microservices
│   ├── gateway/
│   ├── user-service/
│   ├── product-service/
│   ├── order-service/
│   ├── payment-service/
│   └── docker-compose.yml      # Infrastructure
└── modern-ecommerce-frontend/  # Angular 18 frontend
```

---

## 💡 Development Tips

### Running Individual Services

Instead of `START_SERVICES.bat`, you can run services individually:

```bash
cd ecommerce-backend

# Start only User Service
cd user-service
mvn spring-boot:run

# Start only Product Service
cd product-service
mvn spring-boot:run
```

### Using an IDE

1. Open project in IntelliJ IDEA or Eclipse
2. Import as Maven project
3. Run each service's main application class
4. No need for `START_SERVICES.bat`

### Frontend Development

```bash
cd modern-ecommerce-frontend

# Install dependencies (first time)
npm install

# Start dev server with hot reload
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## 📚 Next Steps

1. ✅ Complete setup with `SETUP.bat`
2. ✅ Start services with `START_SERVICES.bat`
3. ✅ Start frontend with `npm start`
4. ✅ Login with test credentials
5. 🎉 Start developing!

For detailed documentation, see [README.md](README.md)

For issues, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
