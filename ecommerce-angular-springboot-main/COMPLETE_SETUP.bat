@echo off
cls
echo ================================================
echo    COMPLETE E-COMMERCE SETUP
echo ================================================
echo.
echo This script will:
echo   [1] Start Infrastructure (PostgreSQL, Redis, pgAdmin)
echo   [2] Create Databases
echo   [3] Load Test Data
echo   [4] Build Backend
echo.
echo This may take 5-10 minutes...
echo.
pause

REM Step 1: Start Infrastructure
echo.
echo ================================================
echo [1/4] Starting Infrastructure...
echo ================================================
cd ecommerce-backend
docker-compose up -d

echo.
echo Waiting for PostgreSQL to be ready...
timeout /t 15 /nobreak >nul

REM Step 2: Create Databases
echo.
echo ================================================
echo [2/4] Creating Databases...
echo ================================================
docker exec -i ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_users;"
docker exec -i ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_products;"
docker exec -i ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_orders;"
docker exec -i ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_payments;"

echo Databases created!

REM Step 3: Load Test Data
echo.
echo ================================================
echo [3/4] Loading Test Data...
echo ================================================

REM Copy and execute test data
docker cp test-data.sql ecommerce-postgres:/tmp/test-data.sql
docker exec -i ecommerce-postgres psql -U postgres < test-data.sql

if %errorlevel% equ 0 (
    echo Test data loaded successfully!
) else (
    echo Warning: Some test data may not have loaded correctly
)

REM Step 4: Build Backend
echo.
echo ================================================
echo [4/4] Building Backend...
echo ================================================
call mvn clean install -DskipTests

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Backend build failed!
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ================================================
echo    SETUP COMPLETE!
echo ================================================
echo.
echo Infrastructure is ready:
echo   PostgreSQL: localhost:5432
echo   Redis: localhost:6379
echo   pgAdmin: http://localhost:5050
echo.
echo Test Data loaded:
echo   - 4 users (admin@ecommerce.com, john.doe@example.com)
echo   - 11 products
echo   - 3 orders
echo   Password: test123
echo.
echo Next step: Run START_PROJECT.bat to launch all services
echo.
pause
