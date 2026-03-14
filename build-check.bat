@echo off
cd /d "%~dp0"
echo Checking if node_modules exists...
if not exist node_modules (
    echo node_modules not found. Installing dependencies...
    call npm install
)
echo Running build...
call npm run build
if errorlevel 1 (
    echo Build failed!
    pause
    exit /b 1
)
echo Build successful!
echo.
echo To run the development server, use:
echo   npm run dev
pause
