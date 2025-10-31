@echo off
echo ================================================
echo    Loading Test Data
echo ================================================

echo.
echo [*] Connecting to PostgreSQL...
echo [*] Container: microservices-postgres
echo.

docker exec -i microservices-postgres psql -U postgres -f /tmp/test-data.sql

if %errorlevel% neq 0 (
    echo.
    echo [!] Failed to load data via container
    echo [*] Trying direct connection...
    
    psql -h localhost -U postgres -d ecommerce_users -f ecommerce-backend\test-data.sql
)

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
