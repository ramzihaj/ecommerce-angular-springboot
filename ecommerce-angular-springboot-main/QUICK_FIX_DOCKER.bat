@echo off
echo ========================================
echo   FIXING DOCKER CONNECTION ISSUE
echo ========================================
echo.

echo [Step 1] Stopping any existing containers...
cd ecommerce-backend
docker-compose down 2>nul

echo.
echo [Step 2] Checking Docker status...
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not running!
    echo.
    echo Please start Docker Desktop and wait for it to be ready.
    echo Then run this script again.
    pause
    exit /b 1
)

echo [OK] Docker is running
echo.

echo [Step 3] Pulling images with retry...
echo This may take a few minutes...
echo.

:retry_postgres
echo Pulling postgres:15-alpine...
docker pull postgres:15-alpine
if %errorlevel% neq 0 (
    echo [WARNING] Failed to pull postgres image
    echo Retrying in 5 seconds...
    timeout /t 5 /nobreak >nul
    goto retry_postgres
)
echo [OK] Postgres image ready

:retry_redis
echo Pulling redis:7-alpine...
docker pull redis:7-alpine
if %errorlevel% neq 0 (
    echo [WARNING] Failed to pull redis image
    echo Retrying in 5 seconds...
    timeout /t 5 /nobreak >nul
    goto retry_redis
)
echo [OK] Redis image ready

echo.
echo [Step 4] Starting containers...
docker-compose up -d

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to start containers
    echo.
    echo Please check:
    echo 1. Docker Desktop is running
    echo 2. No other process is using ports 5432, 6379, 5050
    echo 3. Your internet connection is stable
    echo.
    echo For more help, see DOCKER_TROUBLESHOOTING.md
    pause
    exit /b 1
)

echo.
echo [Step 5] Waiting for PostgreSQL to be ready...
timeout /t 10 /nobreak >nul

echo.
echo [Step 6] Verifying containers...
docker ps

echo.
echo ========================================
echo   DOCKER SETUP COMPLETE!
echo ========================================
echo.
echo Containers running:
echo   - PostgreSQL: localhost:5432
echo   - Redis: localhost:6379
echo   - pgAdmin: localhost:5050
echo.
echo Next steps:
echo   1. Load test data: docker exec -i ecommerce-postgres psql -U postgres ^< test-data.sql
echo   2. Start backend services: cd product-service ^&^& mvn spring-boot:run
echo   3. Start frontend: cd modern-ecommerce-frontend ^&^& npm start
echo.
pause
