@echo off
echo Building Asteroid Tweaking Utility...
echo.

REM Check if npm is available
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: npm is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo npm found, starting build...
echo.

REM Clean previous build
if exist "dist" (
    echo Cleaning previous build...
    rmdir /s /q "dist"
)

REM Build portable version
echo Building portable version...
npm run build-portable

if %ERRORLEVEL% equ 0 (
    echo.
    echo BUILD SUCCESSFUL!
    echo.
    echo Portable executable created in: dist\AsteroidTweakingUtility-1.0.0-portable.exe
    echo.
    echo You can now run the application directly from the executable file.
    echo.
) else (
    echo.
    echo BUILD FAILED!
    echo Check the error messages above.
    echo.
)

pause
