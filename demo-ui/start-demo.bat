@echo off
REM GreenFinches Animation Library Demo Launcher for Windows

echo 🎨 Starting GreenFinches Animation Library Demo...
echo.

REM Check if we're in the right directory
if not exist "index.html" (
    echo ❌ Error: Please run this script from the demo-ui directory
    pause
    exit /b 1
)

REM Check if the library is built
if not exist "..\dist\index.umd.js" (
    echo 🔨 Building the animation library first...
    cd ..
    call npm run build
    cd demo-ui
    echo ✅ Library built successfully!
    echo.
)

REM Check for Python
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo 🚀 Starting demo server on http://localhost:8080
    echo 📱 Open your browser and navigate to the URL above
    echo 🛑 Press Ctrl+C to stop the server
    echo.
    python -m http.server 8080
) else (
    echo ❌ Error: Python is not installed or not in PATH
    echo 💡 Please install Python or use 'npm run dev' instead
    pause
    exit /b 1
)
