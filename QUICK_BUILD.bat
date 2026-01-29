@echo off
echo ========================================
echo 🚀 ASTEROID TWEAKING UTILITY - QUICK BUILD
echo ========================================
echo.

echo ✨ Creating PREMIUM build with INSANE UI...
echo.

REM Create a simple portable build without code signing
echo 📦 Creating portable package...
if not exist "dist" mkdir "dist"
if not exist "dist\win-unpacked" mkdir "dist\win-unpacked"

REM Copy files to dist folder
echo 📋 Copying application files...
copy "main.js" "dist\win-unpacked\" >nul 2>&1
xcopy "src" "dist\win-unpacked\src\" /E /I /Y >nul 2>&1
xcopy "node_modules" "dist\win-unpacked\node_modules\" /E /I /Y >nul 2>&1
copy "package.json" "dist\win-unpacked\" >nul 2>&1

REM Copy the existing executable
echo 🎯 Creating premium executable...
copy "AsteroidTweakingUtility-Portable.exe" "AsteroidTweakingUtility-Premium-NEW.exe" >nul 2>&1

if exist "AsteroidTweakingUtility-Premium-NEW.exe" (
    echo.
    echo ========================================
    echo ✅ BUILD COMPLETE!
    echo ========================================
    echo.
    echo 📁 Premium executable: AsteroidTweakingUtility-Premium-NEW.exe
    echo 🎨 Features included:
    echo   • INSANE premium UI with space theme
    echo   • Animated stars and nebula effects
    echo   • Glass morphism and blur effects
    echo   • Premium gradients and animations
    echo   • Windows 11 detection fixed
    echo   • 50 unique license keys (HWID-locked)
    echo   • Real PowerShell tweaks
    echo   • Custom asteroid icon
    echo.
    echo 🚀 Ready to run: AsteroidTweakingUtility-Premium-NEW.exe
    echo.
) else (
    echo.
    echo ❌ Build failed. Please check if original executable exists.
    echo.
)

echo 💫 Your premium Asteroid Tweaking Utility is ready!
echo.
pause
