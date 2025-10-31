@echo off
cls
echo ================================================
echo    E-Commerce Project Launcher
echo ================================================
echo.
echo This script will start:
echo   1. Product Service (port 8082)
echo   2. Order Service (port 8083)
echo   3. User Service (port 8081)
echo   4. Gateway (port 8080)
echo   5. Frontend (port 4200)
echo.
echo Press any key to continue...
pause >nul

cd ecommerce-backend

echo.
echo ================================================
echo [1/5] Starting Product Service...
echo ================================================
cd product-service
start "Product Service (8082)" cmd /k "mvn spring-boot:run"
timeout /t 10 /nobreak >nul
cd ..

echo.
echo ================================================
echo [2/5] Starting Order Service...
echo ================================================
cd order-service  
start "Order Service (8083)" cmd /k "mvn spring-boot:run"
timeout /t 10 /nobreak >nul
cd ..

echo.
echo ================================================
echo [3/5] Starting User Service...
echo ================================================
cd user-service
start "User Service (8081)" cmd /k "mvn spring-boot:run"
timeout /t 10 /nobreak >nul
cd ..

echo.
echo ================================================
echo [4/5] Starting Gateway...
echo ================================================
cd gateway
start "API Gateway (8080)" cmd /k "mvn spring-boot:run"
timeout /t 10 /nobreak >nul
cd ..

cd ..

echo.
echo ================================================
echo [5/5] Starting Frontend...
echo ================================================
cd modern-ecommerce-frontend
start "Angular Frontend (4200)" cmd /k "npm start"

echo.
echo ================================================
echo    All Services Started!
echo ================================================
echo.
echo URLs:
echo   Frontend: http://localhost:4200
echo   Gateway: http://localhost:8080
echo   Swagger User: http://localhost:8081/swagger-ui.html
echo   Swagger Product: http://localhost:8082/swagger-ui.html
echo   Swagger Order: http://localhost:8083/swagger-ui.html
echo.
echo Test Account:
echo   Email: john.doe@example.com
echo   Password: test123
echo.
echo Press any key to exit...
pause >nul
