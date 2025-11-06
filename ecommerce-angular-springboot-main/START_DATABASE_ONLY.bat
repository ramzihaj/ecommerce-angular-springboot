@echo off
chcp 65001 > nul
cls

echo ========================================
echo   Base de donnees Tunisia uniquement
echo ========================================
echo.

REM Verifier Docker
echo [1/3] Verification de Docker...
docker --version > nul 2>&1
if errorlevel 1 (
    echo ERREUR: Docker n'est pas installe ou demarre.
    echo Veuillez demarrer Docker Desktop.
    pause
    exit /b 1
)
echo OK - Docker est pret
echo.

REM Naviguer vers le dossier backend
cd /d "%~dp0ecommerce-backend"

echo [2/3] Demarrage de PostgreSQL, Redis, PgAdmin, Adminer...
docker-compose -f docker-compose-tunisia.yml up -d postgres redis pgadmin adminer

if errorlevel 1 (
    echo.
    echo ERREUR: Echec du lancement
    pause
    exit /b 1
)

echo.
echo [3/3] Verification...
timeout /t 3 /nobreak > nul
docker-compose -f docker-compose-tunisia.yml ps

echo.
echo ========================================
echo   BASE DE DONNEES DEMARREE !
echo ========================================
echo.
echo Services disponibles:
echo.
echo - PostgreSQL 18        : localhost:5432
echo   User: postgres
echo   Password: postgres_secure_2024
echo   Database: ecommerce_tunisia_db
echo.
echo - Redis 7              : localhost:6379
echo.
echo - PgAdmin 4            : http://localhost:5050
echo   Email: admin@maisontn.com
echo   Password: admin123
echo.
echo - Adminer              : http://localhost:8090
echo.
echo ========================================
echo.
echo Vous pouvez maintenant lancer les services
echo Spring Boot depuis votre IDE.
echo.
echo Arreter: docker-compose -f docker-compose-tunisia.yml down
echo.
pause
