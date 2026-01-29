@echo off
echo Manually building Asteroid Tweaking Utility...
echo.

REM Check if dist folder exists
if not exist "dist" (
    echo Creating dist folder...
    mkdir "dist"
)

REM Check if win-unpacked folder exists
if not exist "dist\win-unpacked" (
    echo Creating win-unpacked folder...
    mkdir "dist\win-unpacked"
)

REM Copy main application files
echo Copying application files...
copy "main.js" "dist\win-unpacked\" >nul
copy "package.json" "dist\win-unpacked\" >nul
xcopy "src" "dist\win-unpacked\src\" /E /I /Y >nul
xcopy "node_modules" "dist\win-unpacked\node_modules\" /E /I /Y >nul

REM Create the executable
echo Creating portable executable...
copy "dist\win-unpacked\Asteroid Tweaking Utility.exe" "AsteroidTweakingUtility-Premium.exe" 2>nul

if exist "AsteroidTweakingUtility-Premium.exe" (
    echo.
    echo SUCCESS! Portable executable created: AsteroidTweakingUtility-Premium.exe
    echo.
    echo The application includes:
    echo - Premium space-themed UI with animations
    echo - Windows 11 detection fix
    echo - 50 unique license keys (one-time use)
    echo - HWID-based license locking
    echo - Real PowerShell tweaks
    echo.
) else (
    echo.
    echo Build completed but executable may need to be created manually.
    echo Run the application from: dist\win-unpacked\Asteroid Tweaking Utility.exe
    echo.
)

pause
