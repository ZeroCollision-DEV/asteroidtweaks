@echo off
echo ========================================
echo ASTEROID TWEAKING UTILITY - ADMIN BUILD
echo ========================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo ✓ Running as Administrator
) else (
    echo ✗ This script requires Administrator privileges
    echo Please right-click and "Run as administrator"
    pause
    exit /b 1
)

echo Cleaning electron-builder cache...
rmdir /s /q "%LOCALAPPDATA%\electron-builder\Cache" 2>nul

echo.
echo Building with administrator privileges...
echo.

REM Run npm build with elevated privileges
npm run build-portable

if %errorLevel% == 0 (
    echo.
    echo ========================================
    echo ✓ BUILD SUCCESSFUL!
    echo ========================================
    echo.
    echo Your premium executable is ready:
    echo - dist\win-unpacked\Asteroid Tweaking Utility.exe
    echo.
    echo Features included:
    echo - INSANE premium UI with space theme
    echo - Windows 11 detection fixed
    echo - 50 unique license keys
    echo - HWID-locked licensing
    echo - Real PowerShell tweaks
    echo.
) else (
    echo.
    echo ✗ Build failed. Please check the error messages above.
)

echo.
pause
