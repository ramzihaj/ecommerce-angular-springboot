@echo off
echo ================================================
echo    Loading Test Data
echo ================================================

echo.
echo [1/3] Starting PostgreSQL container...
cd ecommerce-backend
docker-compose up -d postgres
timeout /t 5 /nobreak >nul

echo.
echo [2/3] Waiting for PostgreSQL to be ready...
timeout /t 10 /nobreak >nul

echo.
echo [3/3] Loading test data...
echo.

REM Copy SQL file into container
docker cp test-data.sql ecommerce-postgres:/tmp/test-data.sql

REM Execute SQL script
docker exec -i ecommerce-postgres psql -U postgres -f /tmp/test-data.sql

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to load test data!
    echo Please check that PostgreSQL container is running.
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ================================================
echo    Test Data Loaded!
echo ================================================
echo.
echo Test Users:
echo   admin@ecommerce.com / test123 (ADMIN)
echo   john.doe@example.com / test123 (USER)
echo   jane.smith@example.com / test123 (USER)
echo.
pause
