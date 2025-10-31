@echo off
cls
echo ================================================
echo    COMPLETE E-COMMERCE SETUP (FIXED)
echo ================================================
echo.
echo This script will:
echo   [1] Start Infrastructure (PostgreSQL, Redis)
echo   [2] Create Databases
echo   [3] Build Backend (creates tables automatically)
echo   [4] Start Services to create tables
echo   [5] Load Test Data
echo.
echo Duration: ~10 minutes
echo.
pause

REM Step 1: Start Infrastructure
echo.
echo ================================================
echo [1/5] Starting Infrastructure...
echo ================================================
cd ecommerce-backend
docker-compose up -d

echo.
echo Waiting for PostgreSQL to be ready...
timeout /t 15 /nobreak >nul

REM Step 2: Create Databases (ignore errors if exist)
echo.
echo ================================================
echo [2/5] Creating Databases...
echo ================================================
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_users;" 2>nul
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_products;" 2>nul
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_orders;" 2>nul
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_payments;" 2>nul

echo Databases ready!

REM Step 3: Build Backend using Maven Wrapper
echo.
echo ================================================
echo [3/5] Building Backend...
echo ================================================

if exist mvnw.cmd (
    echo Using Maven Wrapper...
    call mvnw.cmd clean install -DskipTests
) else if exist ..\mvnw.cmd (
    echo Using Maven Wrapper from parent...
    call ..\mvnw.cmd clean install -DskipTests
) else (
    echo.
    echo [WARNING] Maven wrapper not found!
    echo Please install Maven or use the wrapper.
    echo.
    echo Trying system Maven...
    where mvn >nul 2>nul
    if %errorlevel% equ 0 (
        call mvn clean install -DskipTests
    ) else (
        echo [ERROR] Maven not found! Please install Maven.
        echo Download: https://maven.apache.org/download.cgi
        cd ..
        pause
        exit /b 1
    )
)

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Backend build failed!
    cd ..
    pause
    exit /b 1
)

echo Backend built successfully!

REM Step 4: Start services temporarily to create tables
echo.
echo ================================================
echo [4/5] Starting Services to Create Tables...
echo ================================================
echo.
echo This will start each service briefly to create database tables.
echo Please wait...
echo.

REM User Service
echo [*] Starting User Service...
cd user-service
start "User Service Init" /MIN cmd /c "if exist ..\mvnw.cmd (call ..\mvnw.cmd spring-boot:run) else (mvn spring-boot:run)"
echo Waiting 45 seconds for tables to be created...
timeout /t 45 /nobreak >nul
taskkill /FI "WINDOWTITLE eq User Service Init*" /F >nul 2>nul
cd ..

REM Product Service
echo [*] Starting Product Service...
cd product-service
start "Product Service Init" /MIN cmd /c "if exist ..\mvnw.cmd (call ..\mvnw.cmd spring-boot:run) else (mvn spring-boot:run)"
echo Waiting 45 seconds for tables to be created...
timeout /t 45 /nobreak >nul
taskkill /FI "WINDOWTITLE eq Product Service Init*" /F >nul 2>nul
cd ..

REM Order Service
echo [*] Starting Order Service...
cd order-service
start "Order Service Init" /MIN cmd /c "if exist ..\mvnw.cmd (call ..\mvnw.cmd spring-boot:run) else (mvn spring-boot:run)"
echo Waiting 45 seconds for tables to be created...
timeout /t 45 /nobreak >nul
taskkill /FI "WINDOWTITLE eq Order Service Init*" /F >nul 2>nul
cd ..

echo.
echo Services stopped. Tables should now exist!

REM Step 5: Load Test Data
echo.
echo ================================================
echo [5/5] Loading Test Data...
echo ================================================

docker cp test-data.sql ecommerce-postgres:/tmp/test-data.sql
docker exec -i ecommerce-postgres psql -U postgres -f /tmp/test-data.sql

if %errorlevel% equ 0 (
    echo.
    echo ================================================
    echo    SETUP COMPLETE!
    echo ================================================
    echo.
    echo Infrastructure Ready:
    echo   PostgreSQL: localhost:5432
    echo   Redis: localhost:6379
    echo   pgAdmin: http://localhost:5050
    echo.
    echo Test Data Loaded:
    echo   - 4 users (password: test123)
    echo     * admin@ecommerce.com
    echo     * john.doe@example.com
    echo     * jane.smith@example.com
    echo   - 11 products
    echo   - 3 orders
    echo.
    echo Next: Run START_PROJECT.bat to launch all services
    echo.
) else (
    echo.
    echo [WARNING] Some test data may not have loaded.
    echo You can try loading it manually later.
    echo.
)

cd ..
pause
