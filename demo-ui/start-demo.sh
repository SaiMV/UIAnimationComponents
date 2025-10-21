#!/bin/bash

# GreenFinches Animation Library Demo Launcher

echo "🎨 Starting GreenFinches Animation Library Demo..."
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the demo-ui directory"
    exit 1
fi

# Check if the library is built
if [ ! -f "../dist/index.umd.js" ]; then
    echo "🔨 Building the animation library first..."
    cd ..
    npm run build
    cd demo-ui
    echo "✅ Library built successfully!"
    echo ""
fi

# Check for Python
if command -v python3 &> /dev/null; then
    echo "🚀 Starting demo server on http://localhost:8080"
    echo "📱 Open your browser and navigate to the URL above"
    echo "🛑 Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8080
elif command -v python &> /dev/null; then
    echo "🚀 Starting demo server on http://localhost:8080"
    echo "📱 Open your browser and navigate to the URL above"
    echo "🛑 Press Ctrl+C to stop the server"
    echo ""
    python -m http.server 8080
else
    echo "❌ Error: Python is not installed or not in PATH"
    echo "💡 Please install Python or use 'npm run dev' instead"
    exit 1
fi
