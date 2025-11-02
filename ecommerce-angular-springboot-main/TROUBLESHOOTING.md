# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. Docker Desktop Not Running

**Error:**
```
open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified
```

**Solution:**
1. Open Docker Desktop application
2. Wait until the Docker icon in system tray shows "Docker Desktop is running"
3. Run the setup script again

---

### 2. Maven Not Found

**Error:**
```
'mvn' n'est pas reconnu en tant que commande interne
```

**Solution:**

**Option A: Install Maven**
1. Download Maven from https://maven.apache.org/download.cgi
2. Extract to `C:\Program Files\Apache\maven`
3. Add to PATH:
   - Open "Environment Variables"
   - Add `C:\Program Files\Apache\maven\bin` to PATH
   - Restart terminal

**Option B: Use IDE**
- Import the project in IntelliJ IDEA or Eclipse
- The IDE will handle Maven dependencies
- Run services directly from IDE

---

### 3. Port Already in Use

**Error:**
```
Port 8080 is already in use
```

**Solution:**
```powershell
# Find what's using the port
netstat -ano | findstr :8080

# Kill the process (replace PID with actual process ID)
taskkill /F /PID <PID>

# Or run STOP_SERVICES.bat to stop all
```

---

### 4. Database Connection Failed

**Error:**
```
Connection refused: localhost:5432
```

**Solutions:**

**Check if PostgreSQL container is running:**
```bash
docker ps
# You should see ecommerce-postgres container
```

**If not running, start it:**
```bash
cd ecommerce-backend
docker-compose up -d
```

**Check logs:**
```bash
docker logs ecommerce-postgres
```

---

### 5. Database Does Not Exist

**Error:**
```
FATAL: database "ecommerce_users" does not exist
```

**Solution:**
```bash
# Create databases manually
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_users;"
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_products;"
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_orders;"
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_payments;"
```

---

### 6. Java Version Mismatch

**Error:**
```
Unsupported class file major version
```

**Solution:**
1. Check Java version: `java -version`
2. Must be Java 21 or higher
3. Download from https://adoptium.net/
4. Update JAVA_HOME environment variable

---

### 7. Frontend Build Errors

**Error:**
```
Module not found
```

**Solution:**
```bash
cd modern-ecommerce-frontend

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Angular cache
npm run ng cache clean

# Try again
npm start
```

---

### 8. Services Not Connecting Through Gateway

**Issue:** Direct service URLs work, but gateway routes don't

**Solution:**
1. Make sure Gateway service is running on port 8080
2. Check Gateway logs for routing errors
3. Verify service registration in Gateway configuration

---

### 9. Authentication Issues

**Error:**
```
401 Unauthorized
```

**Solutions:**

**Check if User Service is running:**
```bash
curl http://localhost:8081/actuator/health
```

**Verify database has users table:**
```bash
docker exec ecommerce-postgres psql -U postgres -d ecommerce_users -c "\dt"
```

**Load test data:**
- Run SETUP.bat which loads test users
- Or manually import test-data.sql

---

### 10. WebSocket Connection Failed

**Error:**
```
WebSocket connection to 'ws://localhost:8085/ws' failed
```

**Solution:**
1. Ensure Notification Service is running on port 8085
2. Check firewall settings
3. Verify WebSocket configuration in frontend

---

## Service Health Checks

Check if services are running:

```bash
# Check all running Java processes
jps -l

# Check Docker containers
docker ps

# Check service health endpoints
curl http://localhost:8080/actuator/health  # Gateway
curl http://localhost:8081/actuator/health  # User Service
curl http://localhost:8082/actuator/health  # Product Service
curl http://localhost:8083/actuator/health  # Order Service
curl http://localhost:8084/actuator/health  # Payment Service
```

---

## Clean Slate Restart

If everything is broken, start fresh:

```bash
# 1. Stop everything
STOP_SERVICES.bat

# 2. Remove Docker containers and volumes
cd ecommerce-backend
docker-compose down -v

# 3. Clear Maven build
mvn clean

# 4. Start fresh
cd ..
SETUP.bat
```

---

## Getting Help

If you're still stuck:

1. **Check logs:** Look in the service terminal windows for error messages
2. **Check Docker logs:** `docker logs ecommerce-postgres`
3. **Verify prerequisites:** All required software is installed and versions match
4. **Check ports:** Nothing else is using ports 5432, 6379, 8080-8084
5. **Review configuration:** Check application.properties files for correct settings

---

## Useful Commands

```bash
# View all Docker containers
docker ps -a

# View Docker logs
docker logs ecommerce-postgres
docker logs ecommerce-redis

# Access PostgreSQL directly
docker exec -it ecommerce-postgres psql -U postgres

# View all Java processes
jps -l

# Kill all Java processes (use with caution!)
FOR /F "tokens=1" %T IN ('jps -l ^| findstr "spring-boot"') DO taskkill /F /PID %T

# Check what's using a specific port
netstat -ano | findstr :8080
```
