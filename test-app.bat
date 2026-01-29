@echo off
echo Testing Asteroid Tweaking Utility Premium...
echo.

if exist "AsteroidTweakingUtility-Premium.exe" (
    echo Premium executable found: AsteroidTweakingUtility-Premium.exe
    echo File size: 
    for %%I in ("AsteroidTweakingUtility-Premium.exe") do echo %%~zI bytes
    echo.
    echo Launching application...
    echo.
    echo License Keys Available (50 total):
    echo ASTEROID-X1N7-2024-K8P9-M2V4
    echo ASTEROID-X2J8-2024-L9Q0-N3W5
    echo ASTEROID-X3K9-2024-M0R1-O4X6
    echo ... (47 more keys)
    echo.
    echo Features:
    echo - Premium space-themed UI with animations
    echo - Windows 11 detection fixed
    echo - HWID-locked license system
    echo - Real PowerShell tweaks
    echo.
    start "" "AsteroidTweakingUtility-Premium.exe"
) else (
    echo Premium executable not found!
    echo Please run the build process first.
)

echo.
pause
