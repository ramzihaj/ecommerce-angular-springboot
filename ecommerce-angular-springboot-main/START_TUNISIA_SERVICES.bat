@echo off
setlocal enabledelayedexpansion

:: =====================================================
:: Script de demarrage - E-Commerce Tunisie
:: =====================================================

echo.
echo ========================================================
echo    Maison Tunisie E-Commerce - Demarrage
echo ========================================================
echo.

:: Verifier Docker
where docker >nul 2>nul
if errorlevel 1 (
    echo [ERREUR] Docker n'est pas installe ou pas dans le PATH
    pause
    exit /b 1
)

:: Verifier Docker Compose
where docker-compose >nul 2>nul
if errorlevel 1 (
    echo [ERREUR] Docker Compose n'est pas installe
    pause
    exit /b 1
)

echo [1/6] Verification de Docker... OK
timeout /t 1 /nobreak >nul

:: Se deplacer dans le repertoire backend
cd ecommerce-backend

:: Copier le fichier d'environnement
if not exist .env (
    if exist .env.tunisia (
        echo [2/6] Copie du fichier d'environnement...
        copy .env.tunisia .env
    )
)

echo [2/6] Configuration de l'environnement... OK
timeout /t 1 /nobreak >nul

:: Demarrer PostgreSQL et Redis
echo [3/6] Demarrage de PostgreSQL 18 et Redis...
docker-compose -f docker-compose-tunisia.yml up -d postgres redis

:: Attendre que PostgreSQL soit pret
echo Attente du demarrage de PostgreSQL...
timeout /t 15 /nobreak >nul

:: Verifier si PostgreSQL est pret
docker exec ecommerce-postgres-tn pg_isready -U postgres >nul 2>nul
if errorlevel 1 (
    echo [AVERTISSEMENT] PostgreSQL met plus de temps a demarrer...
    timeout /t 10 /nobreak >nul
)

echo [3/6] PostgreSQL et Redis demarres OK

:: Demarrer PgAdmin
echo [4/6] Demarrage de PgAdmin...
docker-compose -f docker-compose-tunisia.yml up -d pgadmin adminer
timeout /t 3 /nobreak >nul
echo [4/6] Outils d'administration demarres OK

:: Afficher l'etat des conteneurs
echo.
echo [5/6] Etat des services:
docker-compose -f docker-compose-tunisia.yml ps

echo.
echo [6/6] Services prets! OK
echo.
echo ========================================================
echo               SERVICES DISPONIBLES
echo ========================================================
echo.
echo  PostgreSQL 18
echo    Host: localhost:5432
echo    User: postgres
echo    Databases:
echo      - ecommerce_users_tn
echo      - ecommerce_products_tn
echo      - ecommerce_orders_tn
echo      - ecommerce_payments_tn
echo.
echo  Redis 7
echo    Host: localhost:6379
echo.
echo  PgAdmin 4
echo    URL: http://localhost:5050
echo    Email: admin@maisontn.com
echo    Password: admin123
echo.
echo  Adminer
echo    URL: http://localhost:8090
echo.
echo ========================================================
echo.
echo.
echo Pour demarrer les microservices Spring Boot:
echo   1. Ouvrir un nouveau terminal
echo   2. cd ecommerce-backend
echo   3. mvnw spring-boot:run -pl product-service
echo   4. Repeter pour order-service, payment-service, user-service
echo.
echo Pour voir les logs: docker-compose -f docker-compose-tunisia.yml logs -f
echo Pour arreter: docker-compose -f docker-compose-tunisia.yml down
echo.
pause
