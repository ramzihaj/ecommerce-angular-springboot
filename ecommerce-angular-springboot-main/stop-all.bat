@echo off
setlocal enabledelayedexpansion

echo ================================================
echo    Stopping E-Commerce Platform
echo ================================================

:: Stop all Java processes (Spring Boot services)
echo.
echo [*] Stopping backend services...
taskkill /F /FI "WINDOWTITLE eq Gateway*" >nul 2>nul
taskkill /F /FI "WINDOWTITLE eq User Service*" >nul 2>nul
taskkill /F /FI "WINDOWTITLE eq Product Service*" >nul 2>nul
taskkill /F /FI "WINDOWTITLE eq Order Service*" >nul 2>nul
taskkill /F /FI "WINDOWTITLE eq Notification Service*" >nul 2>nul

:: Alternative: Kill all Maven processes
taskkill /F /IM "mvn.cmd" >nul 2>nul
taskkill /F /IM "java.exe" /FI "WINDOWTITLE eq *spring-boot*" >nul 2>nul

echo [OK] Backend services stopped

:: Stop frontend
echo.
echo [*] Stopping frontend...
taskkill /F /FI "WINDOWTITLE eq Angular Frontend*" >nul 2>nul
taskkill /F /IM "node.exe" /FI "WINDOWTITLE eq *ng serve*" >nul 2>nul

echo [OK] Frontend stopped

:: Stop Docker containers
echo.
echo [*] Stopping Docker containers...
cd ecommerce-backend
docker-compose down
if %errorlevel% neq 0 (
    echo [ERROR] Failed to stop Docker containers
) else (
    echo [OK] Docker containers stopped
)
cd ..

echo.
echo ================================================
echo    E-Commerce Platform Stopped Successfully!
echo ================================================
echo.
pause
