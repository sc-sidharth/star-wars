# Quick Start Guide

**Feature**: Star Wars 3D Interactive Encyclopedia  
**Date**: November 3, 2025  
**Phase**: 1 - Design

## Overview

This guide will help you set up and run the Star Wars 3D Interactive Encyclopedia locally, build it for production, and deploy it to a hosting service.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Git**: For version control
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+ (with WebGL 2.0 support)

### Verify Installation

```bash
node --version   # Should output v18.0.0 or higher
npm --version    # Should output v9.0.0 or higher
git --version    # Should output git version 2.x
```

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd starWars
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:

- React 18.x
- Vite 5.x
- Three.js + React-Three-Fiber
- React Router
- And all development dependencies

**Expected Installation Time**: 2-3 minutes on a typical connection

---

## Development

### Start Development Server

```bash
npm run dev
```

This command:

- Starts the Vite development server
- Opens the app at `http://localhost:5173`
- Enables hot module replacement (HMR)
- Shows compilation errors in the browser

**Output**:

```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Development Features

- **Hot Module Replacement**: Changes reflect instantly without page reload
- **Error Overlay**: Compilation errors shown in the browser
- **Fast Refresh**: React components update without losing state
- **Source Maps**: Debug with original source code

### Common Development Commands

```bash
# Start dev server
npm run dev

# Start dev server with network access (for mobile testing)
npm run dev -- --host

# Run linting
npm run lint

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Type check (if using TypeScript)
npm run type-check

# Format code
npm run format
```

---

## Project Structure

```
starWars/
├── public/                 # Static assets
│   ├── textures/          # Planet textures for Three.js
│   └── fonts/             # Custom fonts
│
├── src/
│   ├── components/        # React components
│   │   ├── common/        # Shared UI components
│   │   ├── search/        # Search functionality
│   │   ├── character/     # Character views
│   │   ├── planet/        # Planet views (3D)
│   │   ├── starship/      # Starship views
│   │   └── layout/        # Layout components
│   │
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API & business logic
│   ├── utils/             # Helper functions
│   ├── styles/            # CSS files
│   ├── pages/             # Route components
│   ├── context/           # React Context
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
│
├── tests/                 # Test files
├── specs/                 # Feature specifications
├── index.html             # HTML entry point
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies
└── README.md              # Project documentation
```

---

## Building for Production

### Create Production Build

```bash
npm run build
```

This command:

- Bundles the application with Vite
- Optimizes assets (minification, tree-shaking)
- Outputs to the `dist/` directory
- Generates source maps

**Output**:

```
vite v5.0.0 building for production...
✓ 1234 modules transformed.
dist/index.html                   0.45 kB
dist/assets/index-abc123.css     12.34 kB │ gzip:  5.67 kB
dist/assets/index-def456.js     234.56 kB │ gzip: 89.01 kB
✓ built in 12.34s
```

### Preview Production Build

```bash
npm run preview
```

This starts a local server to preview the production build:

```
➜  Local:   http://localhost:4173/
```

### Build Optimization

The Vite build is configured for optimal performance:

1. **Code Splitting**: Separate chunks for Three.js and React
2. **Tree Shaking**: Removes unused code
3. **Minification**: Reduces file sizes
4. **Asset Optimization**: Compresses images and fonts
5. **Source Maps**: Generated for debugging

**Expected Build Size**:

- HTML: < 1 KB
- CSS: ~15 KB (gzipped)
- JavaScript: ~250 KB (gzipped)
- Total: < 300 KB (first load)

---

## Testing

### Unit Tests

Run all unit tests:

```bash
npm run test
```

Run tests in watch mode (recommended during development):

```bash
npm run test:watch
```

Run specific test file:

```bash
npm run test src/services/swapi.test.js
```

### Integration Tests

Run integration tests:

```bash
npm run test:integration
```

### End-to-End Tests

Run E2E tests with Playwright:

```bash
npm run test:e2e
```

Run E2E tests in UI mode:

```bash
npm run test:e2e:ui
```

### Coverage Report

Generate coverage report:

```bash
npm run test:coverage
```

View coverage report in browser:

```bash
open coverage/index.html
```

---

## Deployment

### Option 1: Vercel (Recommended)

**One-Click Deploy**:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Manual Deploy**:

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy:

```bash
vercel
```

3. Follow prompts to link project

4. For production deployment:

```bash
vercel --prod
```

**Configuration**: Create `vercel.json`:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev"
}
```

### Option 2: Netlify

**One-Click Deploy**:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

**Manual Deploy**:

1. Install Netlify CLI:

```bash
npm install -g netlify-cli
```

2. Build and deploy:

```bash
npm run build
netlify deploy --prod --dir=dist
```

**Configuration**: Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: GitHub Pages

1. Install gh-pages:

```bash
npm install -D gh-pages
```

2. Add to `package.json`:

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Deploy:

```bash
npm run deploy
```

4. Configure GitHub Pages in repository settings to use `gh-pages` branch

### Option 4: Custom Server

1. Build the project:

```bash
npm run build
```

2. Copy `dist/` contents to your web server

3. Configure server for SPA routing:
   - All routes should serve `index.html`
   - Example nginx config:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Environment Variables

### Development

Create `.env.development`:

```env
VITE_API_BASE_URL=https://swapi.dev/api
VITE_CACHE_TTL=604800000
VITE_ENABLE_ANALYTICS=false
```

### Production

Create `.env.production`:

```env
VITE_API_BASE_URL=https://swapi.dev/api
VITE_CACHE_TTL=604800000
VITE_ENABLE_ANALYTICS=true
VITE_ANALYTICS_ID=your-analytics-id
```

**Access in Code**:

```javascript
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
```

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error**: `Port 5173 is already in use`

**Solution**:

```bash
# Kill process on port 5173
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

#### 2. WebGL Not Working

**Error**: 3D planets not rendering

**Solution**:

- Verify WebGL support: Visit https://get.webgl.org/
- Update graphics drivers
- Try a different browser
- Check browser console for WebGL errors

#### 3. SWAPI API Down

**Error**: `Failed to fetch from SWAPI`

**Solution**:

- Check SWAPI status: https://swapi.dev/
- Clear cache and retry
- Use cached data (should happen automatically)

#### 4. Build Fails

**Error**: Build process errors

**Solution**:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite

# Try building again
npm run build
```

#### 5. Slow Performance

**Issue**: App feels sluggish

**Solution**:

- Open DevTools → Performance tab
- Check for memory leaks (growing memory usage)
- Verify 3D scenes are properly disposed
- Reduce quality on low-end devices
- Clear browser cache and localStorage

---

## Development Workflow

### Typical Development Cycle

1. **Start dev server**: `npm run dev`
2. **Make changes**: Edit files in `src/`
3. **Test in browser**: Changes reflect instantly
4. **Run tests**: `npm run test` (in another terminal)
5. **Lint code**: `npm run lint`
6. **Commit changes**: `git commit`
7. **Push and deploy**: Auto-deploy on push (if configured)

### Code Quality Checks

Before committing:

```bash
# Format code
npm run format

# Run linter
npm run lint

# Run tests
npm run test

# Build to verify no errors
npm run build
```

### Git Hooks (Optional)

Install Husky for pre-commit hooks:

```bash
npm install -D husky lint-staged

# Initialize
npx husky init
```

Add to `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{css,md}": ["prettier --write"]
  }
}
```

---

## Performance Monitoring

### Lighthouse Audit

Run Lighthouse in Chrome DevTools:

1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Desktop" or "Mobile"
4. Click "Analyze page load"

**Target Scores**:

- Performance: 90+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 100

### Web Vitals

Monitor Core Web Vitals:

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Bundle Analysis

Analyze bundle size:

```bash
npm run build -- --report
```

This generates a visual bundle analysis report.

---

## Browser Support

### Supported Browsers

| Browser | Minimum Version | Notes                        |
| ------- | --------------- | ---------------------------- |
| Chrome  | 90+             | Recommended                  |
| Firefox | 88+             | Fully supported              |
| Safari  | 14+             | Requires macOS 11+ / iOS 14+ |
| Edge    | 90+             | Chromium-based               |
| Opera   | 76+             | Chromium-based               |

### Required Features

- ES6+ JavaScript
- CSS Grid & Flexbox
- LocalStorage API
- Fetch API
- WebGL 2.0 (for 3D features)

### Fallback for Unsupported Browsers

Users on older browsers see:

- Warning banner about limited support
- 2D planet images instead of 3D viewer
- All search/filter features work normally

---

## Resources

### Documentation

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Three.js Manual](https://threejs.org/manual/)
- [React-Three-Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)
- [SWAPI Documentation](https://swapi.dev/documentation)

### Community

- [GitHub Issues](https://github.com/yourusername/starWars/issues)
- [Discussions](https://github.com/yourusername/starWars/discussions)

### Learning Resources

- [React Three Fiber Journey](https://journey.pmnd.rs/)
- [Three.js Fundamentals](https://threejsfundamentals.org/)
- [Vite Awesome](https://github.com/vitejs/awesome-vite)

---

## Next Steps

1. **Explore the app**: Open `http://localhost:5173` and try searching for "Luke"
2. **View a planet in 3D**: Navigate to any planet page
3. **Apply filters**: Try filtering characters by species or film
4. **Check the code**: Browse the `src/` directory
5. **Run tests**: Execute `npm run test` to see test coverage
6. **Make changes**: Modify a component and see it update instantly
7. **Build for production**: Run `npm run build` when ready to deploy

---

## Support

For issues, questions, or contributions:

- **Bug Reports**: [GitHub Issues](https://github.com/yourusername/starWars/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/starWars/discussions)
- **Pull Requests**: Always welcome!

**Happy coding! May the Force be with you.** ✨
