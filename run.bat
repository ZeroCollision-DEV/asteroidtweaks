@echo off
echo Starting Asteroid Tweaking Utility in development mode...
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

echo npm found, starting application...
echo.

REM Start in development mode
npm start

pause
