@echo off
cls
echo ================================================
echo    Setting Up Infrastructure
echo ================================================
echo.
echo This will start:
echo   - PostgreSQL (port 5432)
echo   - Redis (port 6379)
echo   - pgAdmin (port 5050)
echo.

cd ecommerce-backend

echo [*] Starting Docker containers...
docker-compose up -d

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to start Docker containers!
    echo Please make sure Docker is running.
    pause
    exit /b 1
)

echo.
echo [*] Waiting for PostgreSQL to be ready...
timeout /t 15 /nobreak >nul

echo.
echo ================================================
echo    Infrastructure Started!
echo ================================================
echo.
echo Services running:
docker-compose ps

echo.
echo PostgreSQL: localhost:5432 (postgres/postgres)
echo Redis: localhost:6379
echo pgAdmin: http://localhost:5050 (admin@ecommerce.com/admin)
echo.
echo Next step: Load test data with load-test-data.bat
echo.

cd ..
pause
