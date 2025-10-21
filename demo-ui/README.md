# FinchesEye Animation Library - Demo UI

This is an interactive demo application that showcases the FinchesEye Animation Library across React, Angular, and Vue.js frameworks.

## Features

- 🎨 **Interactive Animation Gallery** - View all 12+ animation presets
- 🔄 **Framework Switching** - Switch between React, Angular, and Vue examples
- 💻 **Live Code Examples** - See real code for each framework
- 🎯 **Live Demo Area** - Try animations in real-time
- 📋 **Copy to Clipboard** - Easy code copying
- 📱 **Responsive Design** - Works on all devices

## Getting Started

### Option 1: Simple HTTP Server

```bash
# Navigate to the demo-ui directory
cd demo-ui

# Start a simple HTTP server
python -m http.server 8080
# or
python3 -m http.server 8080

# Open http://localhost:8080 in your browser
```

### Option 2: Using Node.js

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# The demo will open automatically in your browser
```

### Option 3: Using Live Server (VS Code)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## How to Use

1. **Select Framework**: Use the dropdown to choose between React, Angular, or Vue.js
2. **Browse Animations**: Scroll through the animation gallery to see all available presets
3. **View Code**: Click "View Code" on any animation to see framework-specific implementation
4. **Try Animation**: Click "Try Animation" to see the animation in the live demo area
5. **Copy Code**: Use the "Copy Code" button to copy implementation code to your clipboard

## Available Animations

- **fadeIn** - Smooth fade in effect
- **fadeOut** - Smooth fade out effect
- **slideInUp** - Slide in from bottom
- **slideInDown** - Slide in from top
- **slideInLeft** - Slide in from left
- **slideInRight** - Slide in from right
- **zoomIn** - Zoom in with fade
- **zoomOut** - Zoom out with fade
- **bounce** - Bouncing effect
- **shake** - Shaking effect
- **pulse** - Continuous pulsing (infinite)
- **rotate** - Continuous rotation (infinite)

## Code Examples

The demo provides complete, copy-paste ready code examples for:

### React
- `useAnimation` hook usage
- `AnimatedComponent` usage
- Configuration options
- Event handling

### Angular
- Service injection
- Directive usage
- Component integration
- Module setup

### Vue
- Composable usage
- Component usage
- Template integration
- Reactive state

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## File Structure

```
demo-ui/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── app.js             # JavaScript application logic
├── package.json       # Node.js dependencies
└── README.md          # This file
```

## Customization

You can easily customize the demo by:

1. **Adding New Animations**: Edit the `animations` array in `app.js`
2. **Modifying Styles**: Update `styles.css` for different themes
3. **Adding Frameworks**: Extend the code generation in `generateCodeExamples()`
4. **Changing Layout**: Modify the HTML structure in `index.html`

## Integration with Library

This demo uses the built UMD version of the GreenFinches Animation Library:

```html
<script src="../dist/index.umd.js"></script>
```

Make sure the library is built before running the demo:

```bash
# From the root directory
npm run build
```

## Troubleshooting

### Animations Not Working
- Make sure the library is built (`npm run build` from root)
- Check browser console for errors
- Ensure you're using a modern browser with Web Animations API support

### Code Not Copying
- Check if your browser supports the Clipboard API
- Try using a different browser
- Manually select and copy the code

### Styling Issues
- Clear browser cache
- Check if all CSS files are loading
- Verify file paths are correct

## Contributing

To contribute to the demo:

1. Fork the repository
2. Make your changes
3. Test across different browsers
4. Submit a pull request

## License

MIT License - See the main project LICENSE file for details.
