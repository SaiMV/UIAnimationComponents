# FinchesEye UI Animation Library
 **A comprehensive cross-framework animation library for React, Angular, and Vue.js with live demo interface**
 
 Installation

```bash
npm install fincheseye-ui-animation-library
```

### Responsive Sizing
The library automatically adjusts text size based on container dimensions:
- **Small containers** (120px) → Smaller font size
- **Large containers** (600px) → Larger font size
- **Custom sizing** → Use `fontSize` prop for fixed sizes

## 🎨 Styling

### Default Theme
- **Font Family**: 'Orbitron', sans-serif
- **Text Color**: White (#ffffff)
- **Background**: Black (#000000)
- **Responsive**: Automatically scales with container

### Custom Styling
.my-animation {
  font-family: 'Arial', sans-serif;
  color: #ff6b6b;
  background: linear-gradient(45deg, #667eea, #764ba2);
}

### Prerequisites
- Node.js 16+
- npm 8+
- TypeScript 4.5+

### Setup
```bash
# Clone the repository
git clone https://github.com/fincheseye/ui-animation-library.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build:lib

# Run tests
npm test

# Lint code
npm run lint
```

### Project Structure
```
src/
├── core/           # Core animation engine
├── react/          # React components and hooks
├── angular/        # Angular services and directives
├── vue/            # Vue composables and components
├── types/          # TypeScript definitions
└── utils/          # Utility functions
```

## Performance

- **Bundle Size**: ~635KB (UMD)
- **Tree Shaking**: Supported (ESM)
- **Zero Dependencies**: No external dependencies
- **Optimized**: Uses Web Animations API
- **Responsive**: Automatic size calculation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Inspired by modern web animation trends
- Built with TypeScript for type safety
- Cross-framework compatibility design
- Community feedback and contributions

## Support

- Email: support@fincheseye.com
- Issues: [GitHub Issues](https://github.com/fincheseye/ui-animation-library/issues)
- Discussions: [GitHub Discussions](https://github.com/fincheseye/ui-animation-library/discussions)
- Documentation: [Full Documentation](https://fincheseye.com/docs)
