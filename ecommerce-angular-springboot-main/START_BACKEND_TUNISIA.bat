@echo off
chcp 65001 > nul
cls

echo ========================================
echo   E-Commerce Tunisia - Backend Startup
echo ========================================
echo.

REM Verifier Docker
echo [1/5] Verification de Docker...
docker --version > nul 2>&1
if errorlevel 1 (
    echo ERREUR: Docker n'est pas installe ou demarre.
    echo Veuillez demarrer Docker Desktop.
    pause
    exit /b 1
)
echo OK - Docker est pret
echo.

REM Verifier Docker Compose
echo [2/5] Verification de Docker Compose...
docker-compose --version > nul 2>&1
if errorlevel 1 (
    echo ERREUR: Docker Compose n'est pas installe.
    pause
    exit /b 1
)
echo OK - Docker Compose est pret
echo.

REM Naviguer vers le dossier backend
cd /d "%~dp0ecommerce-backend"

echo [3/5] Nettoyage des anciens containers...
docker-compose -f docker-compose-tunisia.yml down -v
echo OK - Anciens containers arretes
echo.

echo [4/5] Construction et demarrage des services...
echo Cela peut prendre plusieurs minutes lors du premier lancement...
echo.
docker-compose -f docker-compose-tunisia.yml up --build -d

if errorlevel 1 (
    echo.
    echo ERREUR: Echec du lancement des services
    echo Verifiez les logs avec: docker-compose -f docker-compose-tunisia.yml logs
    pause
    exit /b 1
)

echo.
echo [5/5] Verification de l'etat des services...
timeout /t 5 /nobreak > nul
docker-compose -f docker-compose-tunisia.yml ps

echo.
echo ========================================
echo   SERVICES DEMARRES AVEC SUCCES !
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
echo - Product Service API  : http://localhost:8081
echo   Swagger UI: http://localhost:8081/swagger-ui.html
echo.
echo - API Gateway          : http://localhost:8080
echo   Health: http://localhost:8080/actuator/health
echo.
echo ========================================
echo.
echo Commandes utiles:
echo - Voir logs: docker-compose -f docker-compose-tunisia.yml logs -f
echo - Arreter: docker-compose -f docker-compose-tunisia.yml down
echo - Redemarrer: docker-compose -f docker-compose-tunisia.yml restart
echo.
echo Appuyez sur une touche pour voir les logs en temps reel...
pause > nul

echo.
echo Affichage des logs (CTRL+C pour quitter)...
docker-compose -f docker-compose-tunisia.yml logs -f
