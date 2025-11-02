@echo off
cls
echo ================================================
echo    STARTING E-COMMERCE SERVICES
echo ================================================
echo.

REM Check if Docker is running
echo [*] Checking Docker...
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Desktop is not running!
    echo         Please start Docker Desktop first.
    pause
    exit /b 1
)

REM Check if containers are running
docker ps | findstr "ecommerce-postgres" >nul
if %errorlevel% neq 0 (
    echo [*] Infrastructure not running. Starting...
    cd ecommerce-backend
    docker-compose up -d
    timeout /t 10 /nobreak >nul
    cd ..
)

echo [OK] Infrastructure is running
echo.

REM Check for Maven
where mvn >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Maven is not installed!
    echo.
    echo Please either:
    echo   1. Install Maven from https://maven.apache.org/download.cgi
    echo   2. Use your IDE (IntelliJ IDEA or Eclipse) to run the services
    echo.
    echo To run from IDE:
    echo   - Open the project in your IDE
    echo   - Navigate to each service's main application class
    echo   - Run the Spring Boot application
    echo.
    pause
    exit /b 1
)

cd ecommerce-backend

echo.
echo ================================================
echo Starting Microservices...
echo ================================================
echo.
echo Services will open in separate windows.
echo Please wait for each service to fully start.
echo.

REM Gateway Service
if exist gateway\pom.xml (
    echo [1/5] Starting Gateway Service (port 8080)...
    start "Gateway Service" cmd /k "cd gateway && mvn spring-boot:run"
    timeout /t 5 /nobreak >nul
)

REM User Service
if exist user-service\pom.xml (
    echo [2/5] Starting User Service (port 8081)...
    start "User Service" cmd /k "cd user-service && mvn spring-boot:run"
    timeout /t 5 /nobreak >nul
)

REM Product Service
if exist product-service\pom.xml (
    echo [3/5] Starting Product Service (port 8082)...
    start "Product Service" cmd /k "cd product-service && mvn spring-boot:run"
    timeout /t 5 /nobreak >nul
)

REM Order Service
if exist order-service\pom.xml (
    echo [4/5] Starting Order Service (port 8083)...
    start "Order Service" cmd /k "cd order-service && mvn spring-boot:run"
    timeout /t 5 /nobreak >nul
)

REM Payment Service
if exist payment-service\pom.xml (
    echo [5/5] Starting Payment Service (port 8084)...
    start "Payment Service" cmd /k "cd payment-service && mvn spring-boot:run"
)

cd ..

echo.
echo ================================================
echo    ALL SERVICES STARTING...
echo ================================================
echo.
echo Services are launching in separate windows.
echo Wait 1-2 minutes for all services to fully start.
echo.
echo Service Endpoints:
echo   - Gateway:  http://localhost:8080
echo   - Users:    http://localhost:8081
echo   - Products: http://localhost:8082
echo   - Orders:   http://localhost:8083
echo   - Payments: http://localhost:8084
echo.
echo To start the frontend:
echo   1. Open a new terminal
echo   2. cd modern-ecommerce-frontend
echo   3. npm install (first time only)
echo   4. npm start
echo.
echo To stop all services:
echo   - Close all service windows
echo   - Run: docker-compose -f ecommerce-backend\docker-compose.yml down
echo.
pause
