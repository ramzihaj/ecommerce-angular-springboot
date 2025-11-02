@echo off
echo ================================================
echo    STOPPING E-COMMERCE SERVICES
echo ================================================
echo.

REM Stop all Java Spring Boot processes
echo [*] Stopping all Spring Boot services...
FOR /F "tokens=5" %%T IN ('netstat -ano ^| findstr "8080 8081 8082 8083 8084"') DO (
    taskkill /F /PID %%T 2>nul
)

echo [OK] Services stopped
echo.

REM Stop Docker containers
echo [*] Stopping Docker infrastructure...
cd ecommerce-backend
docker-compose down
cd ..

echo [OK] Infrastructure stopped
echo.
echo ================================================
echo All services stopped successfully!
echo ================================================
pause
