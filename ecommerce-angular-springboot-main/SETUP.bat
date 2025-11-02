@echo off
setlocal enabledelayedexpansion

cls
echo ================================================
echo    E-COMMERCE COMPLETE SETUP
echo ================================================
echo.

REM ========================================
REM STEP 1: Check Prerequisites
REM ========================================
echo [STEP 1/6] Checking Prerequisites...
echo.

set "PREREQ_OK=1"

REM Check Docker Desktop
echo [*] Checking Docker Desktop...
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Desktop is not running!
    echo         Please start Docker Desktop and wait until it's fully running.
    echo         Then run this script again.
    set "PREREQ_OK=0"
) else (
    echo [OK] Docker Desktop is running
)

REM Check Maven
echo [*] Checking Maven...
where mvn >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Maven is not installed or not in PATH
    echo           You can download it from: https://maven.apache.org/download.cgi
    echo           After installation, add Maven's bin directory to your PATH
    echo.
    echo [INFO] You can still proceed if you plan to use an IDE (IntelliJ/Eclipse)
    echo        instead of building from command line.
    echo.
    choice /C YN /M "Do you want to continue without Maven"
    if errorlevel 2 (
        set "PREREQ_OK=0"
    )
) else (
    echo [OK] Maven is installed
)

if "!PREREQ_OK!"=="0" (
    echo.
    echo ================================================
    echo [FAILED] Prerequisites not met!
    echo ================================================
    echo Please fix the issues above and run this script again.
    pause
    exit /b 1
)

echo.
echo ================================================
echo All prerequisites met! Proceeding with setup...
echo ================================================
echo.
pause

REM ========================================
REM STEP 2: Start Infrastructure
REM ========================================
echo.
echo [STEP 2/6] Starting Infrastructure...
echo ================================================
cd ecommerce-backend
docker-compose up -d

if %errorlevel% neq 0 (
    echo [ERROR] Failed to start Docker containers!
    cd ..
    pause
    exit /b 1
)

echo.
echo [*] Waiting for PostgreSQL to be ready (15 seconds)...
timeout /t 15 /nobreak >nul

REM ========================================
REM STEP 3: Create Databases
REM ========================================
echo.
echo [STEP 3/6] Creating Databases...
echo ================================================
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_users;" 2>nul
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_products;" 2>nul
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_orders;" 2>nul
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_payments;" 2>nul

echo [OK] Databases created (or already exist)

REM ========================================
REM STEP 4: Build Backend
REM ========================================
echo.
echo [STEP 4/6] Building Backend Services...
echo ================================================
echo This may take several minutes...
echo.

where mvn >nul 2>&1
if %errorlevel% equ 0 (
    call mvn clean install -DskipTests
    if !errorlevel! neq 0 (
        echo [ERROR] Backend build failed!
        cd ..
        pause
        exit /b 1
    )
    echo [OK] Backend built successfully
) else (
    echo [SKIPPED] Maven not available - you'll need to build using your IDE
    echo           or install Maven and run: mvn clean install -DskipTests
)

REM ========================================
REM STEP 5: Initialize Database Tables
REM ========================================
echo.
echo [STEP 5/6] Initializing Database Tables...
echo ================================================
echo.
echo Tables will be created automatically when you first run the services.
echo This happens via Spring Boot JPA auto-DDL feature.
echo.

REM ========================================
REM STEP 6: Load Test Data
REM ========================================
echo.
echo [STEP 6/6] Loading Test Data...
echo ================================================

if exist test-data.sql (
    docker cp test-data.sql ecommerce-postgres:/tmp/test-data.sql 2>nul
    docker exec -i ecommerce-postgres psql -U postgres -f /tmp/test-data.sql 2>nul
    
    if !errorlevel! equ 0 (
        echo [OK] Test data loaded successfully
    ) else (
        echo [INFO] Test data will be loaded after first service startup
        echo       You can run load-test-data.bat later
    )
) else (
    echo [INFO] test-data.sql not found - skipping test data
)

cd ..

REM ========================================
REM SETUP COMPLETE
REM ========================================
echo.
echo ================================================
echo    SETUP COMPLETE!
echo ================================================
echo.
echo Infrastructure Running:
echo   - PostgreSQL:  localhost:5432
echo   - Redis:       localhost:6379
echo   - pgAdmin:     http://localhost:5050
echo                  (Email: admin@ecommerce.com, Password: admin)
echo.
echo Databases Created:
echo   - ecommerce_users
echo   - ecommerce_products
echo   - ecommerce_orders
echo   - ecommerce_payments
echo.
echo Next Steps:
echo   1. Run START_SERVICES.bat to start all microservices
echo   2. Or use your IDE to run individual services
echo   3. Frontend will be available at http://localhost:4200
echo.
echo Test Credentials (if test data loaded):
echo   - admin@ecommerce.com / test123
echo   - john.doe@example.com / test123
echo.
pause
