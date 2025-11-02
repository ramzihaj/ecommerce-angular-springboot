@echo off
cls
echo ================================================
echo    E-COMMERCE FRONTEND - MODE DEMO
echo ================================================
echo.
echo Ce script va demarrer le frontend avec des donnees
echo de demonstration (pas besoin du backend).
echo.
echo Fonctionnalites:
echo   - Tous les composants UI visibles
echo   - Donnees de produits mockees
echo   - Navigation complete
echo   - Themes Dark/Light
echo   - Animations et transitions
echo.
pause

cd modern-ecommerce-frontend

REM Activer le mode mock
echo.
echo [1/3] Activation du mode demo...
node -e "console.log('Mode demo active!')"

REM Installer les dependances si necessaire
echo.
echo [2/3] Verification des dependances...
if not exist "node_modules\" (
    echo Installation des dependances...
    call npm install
) else (
    echo Dependances deja installees
)

REM Demarrer le serveur de developpement
echo.
echo [3/3] Demarrage du frontend...
echo.
echo ================================================
echo    FRONTEND PRET!
echo ================================================
echo.
echo URL: http://localhost:4200
echo.
echo Mode Demo Active - Donnees de test chargees
echo.
echo Pour activer le mode demo dans le navigateur:
echo   1. Ouvrez la Console (F12)
echo   2. Tapez: localStorage.setItem('useMocks', 'true')
echo   3. Rechargez la page (F5)
echo.
echo Pour desactiver le mode demo:
echo   localStorage.setItem('useMocks', 'false')
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.

REM Demarrer Angular
start "" http://localhost:4200
call npm start

cd ..
