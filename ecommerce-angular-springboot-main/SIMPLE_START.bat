@echo off
cls
echo ================================================
echo    SIMPLE START (Without Maven Build)
echo ================================================
echo.
echo Use this if Maven is not installed.
echo This runs the services with existing .class files.
echo.
echo Services to start:
echo   [1] User Service (8081)
echo   [2] Product Service (8082)
echo   [3] Order Service (8083)
echo   [4] Gateway (8080)
echo   [5] Frontend (4200)
echo.
pause

cd ecommerce-backend

REM Check if compiled classes exist
if not exist "user-service\target\classes" (
    echo.
    echo [ERROR] Backend not compiled!
    echo Please run COMPLETE_SETUP_FIXED.bat first.
    cd ..
    pause
    exit /b 1
)

echo.
echo Starting services with java -jar...
echo.

REM Start User Service
echo [1/5] Starting User Service...
cd user-service\target
for %%f in (*.jar) do (
    start "User Service (8081)" cmd /k "java -jar %%f"
    goto :user_started
)
:user_started
cd ..\..
timeout /t 10 /nobreak >nul

REM Start Product Service
echo [2/5] Starting Product Service...
cd product-service\target
for %%f in (*.jar) do (
    start "Product Service (8082)" cmd /k "java -jar %%f"
    goto :product_started
)
:product_started
cd ..\..
timeout /t 10 /nobreak >nul

REM Start Order Service
echo [3/5] Starting Order Service...
cd order-service\target
for %%f in (*.jar) do (
    start "Order Service (8083)" cmd /k "java -jar %%f"
    goto :order_started
)
:order_started
cd ..\..
timeout /t 10 /nobreak >nul

REM Start Gateway
echo [4/5] Starting Gateway...
cd gateway\target
for %%f in (*.jar) do (
    start "API Gateway (8080)" cmd /k "java -jar %%f"
    goto :gateway_started
)
:gateway_started
cd ..\..

cd ..

REM Start Frontend
echo [5/5] Starting Frontend...
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
echo.
echo Test Account:
echo   Email: john.doe@example.com
echo   Password: test123
echo.
pause
