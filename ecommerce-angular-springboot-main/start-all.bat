@echo off
setlocal enabledelayedexpansion

echo ================================================
echo    Starting E-Commerce Platform
echo ================================================

:: Check prerequisites
echo.
echo [*] Checking prerequisites...

where java >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Java is not installed
    exit /b 1
)

where mvn >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Maven is not installed
    exit /b 1
)

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed
    exit /b 1
)

where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed
    exit /b 1
)

echo [OK] All prerequisites met

:: Create logs directory
if not exist "ecommerce-backend\logs" mkdir "ecommerce-backend\logs"

:: Start Docker infrastructure
echo.
echo [*] Starting Docker infrastructure...
cd ecommerce-backend
docker-compose up -d
if %errorlevel% neq 0 (
    echo [ERROR] Failed to start Docker containers
    exit /b 1
)
echo [OK] Docker containers started

:: Wait for PostgreSQL
echo.
echo [*] Waiting for PostgreSQL to be ready...
timeout /t 10 /nobreak >nul

:: Build backend
echo.
echo [*] Building backend services...
call mvn clean install -DskipTests
if %errorlevel% neq 0 (
    echo [ERROR] Backend build failed
    exit /b 1
)
echo [OK] Backend built successfully

:: Start backend services
echo.
echo [*] Starting backend services...

:: Start Gateway
echo [*] Starting API Gateway (port 8080)...
cd gateway
start "Gateway" cmd /c "mvn spring-boot:run > ..\logs\gateway.log 2>&1"
cd ..
timeout /t 5 /nobreak >nul

:: Start User Service
echo [*] Starting User Service (port 8081)...
cd user-service
start "User Service" cmd /c "mvn spring-boot:run > ..\logs\user-service.log 2>&1"
cd ..
timeout /t 5 /nobreak >nul

:: Start Product Service
echo [*] Starting Product Service (port 8082)...
cd product-service
start "Product Service" cmd /c "mvn spring-boot:run > ..\logs\product-service.log 2>&1"
cd ..
timeout /t 5 /nobreak >nul

:: Start Order Service
echo [*] Starting Order Service (port 8083)...
cd order-service
start "Order Service" cmd /c "mvn spring-boot:run > ..\logs\order-service.log 2>&1"
cd ..
timeout /t 5 /nobreak >nul

:: Start Notification Service
echo [*] Starting Notification Service (port 8085)...
cd notification-service
start "Notification Service" cmd /c "mvn spring-boot:run > ..\logs\notification-service.log 2>&1"
cd ..

cd ..

echo [OK] Backend services started

:: Start frontend
echo.
echo [*] Starting frontend...
cd frontend

:: Check if node_modules exists
if not exist "node_modules" (
    echo [*] Installing npm packages...
    call npm install
)

echo [*] Starting Angular development server (port 4200)...
start "Angular Frontend" cmd /c "npm start > ..\ecommerce-backend\logs\frontend.log 2>&1"

cd ..

echo.
echo ================================================
echo    E-Commerce Platform Started Successfully!
echo ================================================
echo.
echo Service URLs:
echo   Frontend:                http://localhost:4200
echo   API Gateway:             http://localhost:8080
echo   User Service (Swagger):  http://localhost:8081/swagger-ui.html
echo   Product Service (Swagger): http://localhost:8082/swagger-ui.html
echo   Order Service (Swagger): http://localhost:8083/swagger-ui.html
echo   pgAdmin:                 http://localhost:5050
echo.
echo Logs location: ecommerce-backend\logs\
echo.
echo To stop all services, run: stop-all.bat
echo.
echo Happy coding!
echo.
pause
