@echo off
echo Creating portable executable...
echo.

REM Check if win-unpacked folder exists
if not exist "dist\win-unpacked" (
    echo ERROR: dist\win-unpacked folder not found
    echo Please run npm run build-win first
    pause
    exit /b 1
)

REM Create a simple zip file with built-in Windows tools
echo Creating portable package...
echo.

REM Create a temporary folder
if exist "temp_portable" rmdir /s /q "temp_portable"
mkdir "temp_portable"

REM Copy all files
echo Copying application files...
xcopy "dist\win-unpacked\*" "temp_portable\" /E /H /C /I /Y >nul

REM Create a simple launcher batch file
echo Creating launcher...
echo @echo off > "temp_portable\Asteroid Tweaking Utility.bat"
echo cd /d "%%~dp0" >> "temp_portable\Asteroid Tweaking Utility.bat"
echo start Asteroid Tweaking Utility.exe >> "temp_portable\Asteroid Tweaking Utility.bat"

REM Create zip using PowerShell (Windows 10+)
echo Creating ZIP package...
powershell -command "Compress-Archive -Path 'temp_portable\*' -DestinationPath 'AsteroidTweakingUtility-Portable.zip' -Force"

REM Clean up
echo Cleaning up temporary files...
rmdir /s /q "temp_portable"

echo.
echo SUCCESS!
echo.
echo Portable package created: AsteroidTweakingUtility-Portable.zip
echo.
echo To use: Extract the ZIP and run "Asteroid Tweaking Utility.bat"
echo.
pause
