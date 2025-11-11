# Research & Technical Decisions

**Feature**: Star Wars 3D Interactive Encyclopedia  
**Date**: November 3, 2025  
**Phase**: 0 - Research & Outline

## Overview

This document consolidates research findings and technical decisions for building the Star Wars 3D Interactive Encyclopedia. All decisions are based on the specified tech stack: React + Vite, Three.js, CSS, and SWAPI.

---

## 1. SWAPI Integration Patterns

### Decision: Direct REST API Integration with Local Caching

**Rationale**:

- SWAPI provides a simple REST API at https://swapi.dev/api/ with no authentication required
- All data is read-only, no mutations needed
- Response format is consistent JSON with cross-references as URLs
- Local caching dramatically improves performance and reduces API load

**Implementation Approach**:

```javascript
// Base endpoints
- /api/people/ - Characters
- /api/planets/ - Planets
- /api/starships/ - Starships
- /api/species/ - Species
- /api/films/ - Films
- /api/vehicles/ - Vehicles
```

**API Response Structure** (example from https://swapi.dev/):

```json
{
  "name": "Luke Skywalker",
  "height": "172",
  "mass": "77",
  "hair_color": "blond",
  "skin_color": "fair",
  "eye_color": "blue",
  "birth_year": "19BBY",
  "gender": "male",
  "homeworld": "https://swapi.dev/api/planets/1/",
  "films": ["https://swapi.dev/api/films/2/", ...],
  "species": ["https://swapi.dev/api/species/1/"],
  "vehicles": [...],
  "starships": [...],
  "created": "2014-12-09T13:50:51.644000Z",
  "edited": "2014-12-20T21:17:56.891000Z",
  "url": "https://swapi.dev/api/people/1/"
}
```

**Caching Strategy**:

- **Cache Location**: Browser localStorage (5-10MB available)
- **Cache Duration**: 7 days (data is static, no frequent updates)
- **Cache Keys**: URL-based (e.g., `swapi:people:1`)
- **Cache Invalidation**: Time-based expiration + manual clear option

**Pagination Handling**:

- SWAPI returns paginated results with `next` and `previous` URLs
- Implement "Load More" or infinite scroll for large datasets
- Cache each page independently

**Cross-Reference Resolution**:

- SWAPI uses URLs for relationships (e.g., homeworld URL in character)
- Lazy load related entities on-demand
- Cache resolved entities to prevent duplicate fetches
- Show loading states while resolving references

**Rate Limiting**:

- SWAPI has no documented rate limits but implement good practices
- Max 5 concurrent requests
- Debounce search queries (500ms)
- Batch related entity fetches where possible

**Error Handling**:

- Network errors: Show cached data with "offline" indicator
- 404 errors: Entity not found message
- 500+ errors: Generic error message with retry option
- Timeout after 10 seconds

**Alternatives Considered**:

- GraphQL wrapper: Rejected - adds unnecessary complexity, no official GraphQL endpoint
- Backend proxy: Rejected - not needed for public API, adds infrastructure cost
- Real-time updates: N/A - SWAPI data is static

---

## 2. Three.js Integration for React

### Decision: React-Three-Fiber (@react-three/fiber) with Drei Helpers

**Rationale**:

- React-Three-Fiber provides declarative Three.js integration with React
- Better component lifecycle management than vanilla Three.js
- Easier cleanup and memory management
- Ecosystem of helper libraries (@react-three/drei)
- Maintains React patterns and hooks

**Core Dependencies**:

```json
{
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.88.0",
  "three": "^0.160.0"
}
```

**React-Three-Fiber Benefits**:

- Automatic disposal of Three.js objects
- React hooks for animations and interactions
- Declarative scene graph matching React component tree
- Integration with React Suspense for loading states

**Planet Rendering Approach**:

```jsx
<Canvas>
  <PerspectiveCamera position={[0, 0, 5]} />
  <ambientLight intensity={0.3} />
  <pointLight position={[10, 10, 10]} />

  <Sphere args={[1, 64, 64]}>
    <meshStandardMaterial map={planetTexture} emissive={holographicGlow} />
  </Sphere>

  <OrbitControls enableZoom enableRotate enablePan={false} />
</Canvas>
```

**Performance Optimizations**:

- Use `useMemo` for geometries and materials
- Implement LOD (Level of Detail) for mobile devices
- Lazy load textures with Suspense boundaries
- Limit to 60 FPS with `frameloop="demand"` when idle
- Use `useFrame` hook sparingly for animations

**Mobile Considerations**:

- Reduce polygon count on smaller screens
- Simplify textures for mobile (lower resolution)
- Disable advanced effects (shadows, post-processing) on low-end devices
- Touch gesture support for rotation/zoom
- Fallback to static 2D images if WebGL unavailable

**Scene Management**:

- One Canvas per planet view (not reused)
- Dispose scenes when component unmounts
- Monitor memory usage with Chrome DevTools
- Implement texture atlasing if multiple planets shown simultaneously

**Alternatives Considered**:

- Vanilla Three.js: Rejected - more boilerplate, manual cleanup, harder to integrate with React
- Babylon.js: Rejected - larger bundle size, less React ecosystem support
- CSS 3D transforms: Rejected - insufficient for realistic planet rendering

---

## 3. Holographic UI Design System

### Decision: Custom CSS with CSS Variables and Keyframe Animations

**Rationale**:

- Full control over holographic aesthetic
- No additional JavaScript bundle size
- Excellent performance for CSS animations
- Easy theming with CSS custom properties
- Hardware-accelerated animations

**Visual Design Principles**:

- **Color Palette**: Cyan (#00f3ff), blue (#0066ff), teal (#00ffcc), white (#ffffff)
- **Transparency**: 0.1-0.4 alpha for glass-morphism effect
- **Glow Effects**: box-shadow with blur and spread
- **Scan Lines**: Linear gradients with animation
- **Borders**: Thin, bright borders with glow
- **Typography**: Monospace or futuristic sans-serif fonts

**Core CSS Variables**:

```css
:root {
  --holo-primary: #00f3ff;
  --holo-secondary: #0066ff;
  --holo-accent: #00ffcc;
  --holo-bg: rgba(0, 20, 40, 0.8);
  --holo-border: rgba(0, 243, 255, 0.5);
  --holo-glow: 0 0 10px rgba(0, 243, 255, 0.8);
  --holo-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Key Animations**:

1. **Fade-in with glow**:

```css
@keyframes fadeInGlow {
  from {
    opacity: 0;
    filter: blur(10px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
}
```

2. **Scan line effect**:

```css
@keyframes scanline {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
}
```

3. **Pulse glow**:

```css
@keyframes pulseGlow {
  0%,
  100% {
    box-shadow: 0 0 5px var(--holo-primary);
  }
  50% {
    box-shadow: 0 0 20px var(--holo-primary);
  }
}
```

**Component Patterns**:

- Cards: Translucent background with border glow
- Buttons: Glow on hover, scale transform
- Inputs: Animated border on focus
- Loading states: Rotating holographic spinner
- Transitions: Slide + fade combinations

**Performance Considerations**:

- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid `filter` on large elements (expensive)
- Limit box-shadow blur radius to 20px max
- Use `will-change` sparingly
- Disable animations on low-end devices (prefers-reduced-motion)

**Accessibility**:

- Maintain 4.5:1 contrast ratio for text (use white/bright cyan on dark backgrounds)
- Provide `prefers-reduced-motion` alternatives
- Ensure focus indicators are visible
- Support keyboard navigation
- ARIA labels for decorative elements

**Alternatives Considered**:

- Framer Motion: Rejected - adds 40KB, CSS animations sufficient
- GSAP: Rejected - adds bundle size, overkill for this project
- Tailwind CSS: Rejected - custom holographic design easier with vanilla CSS
- Styled Components: Rejected - prefer CSS files for this aesthetic

---

## 4. Search & Filter Optimization

### Decision: Debounced Client-Side Search with Multi-Criteria Filtering

**Rationale**:

- SWAPI doesn't support query parameters for filtering
- Client-side filtering provides instant results after initial data load
- Debouncing prevents excessive re-renders during typing
- All Star Wars data fits comfortably in memory (~2MB total)

**Debounce Implementation**:

```javascript
// Custom hook
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

**Debounce Timing**:

- **Search input**: 500ms (balanced between responsiveness and API calls)
- **Filter checkboxes**: No debounce (immediate response)
- **Slider controls**: 200ms (more frequent updates expected)

**Search Algorithm**:

```javascript
// Fuzzy search with multiple fields
function searchCharacters(characters, query) {
  const lowerQuery = query.toLowerCase();
  return characters.filter(char =>
    char.name.toLowerCase().includes(lowerQuery) ||
    char.birth_year.toLowerCase().includes(lowerQuery) ||
    // ... other searchable fields
  );
}
```

**Multi-Criteria Filtering**:

- Combine filters with AND logic (all must match)
- Support multiple values per filter type (OR within category)
- Example: (Species = Human OR Droid) AND (Film = "A New Hope")

**Filter State Management**:

```javascript
const [filters, setFilters] = useState({
  species: [], // Array of species IDs
  films: [], // Array of film IDs
  homeworld: null, // Single planet ID
  gender: null, // Single gender value
});
```

**URL-Based Filter Persistence**:

- Use URLSearchParams to store active filters
- Enables sharing filtered views via URL
- Browser back/forward navigation works correctly
- Example: `/characters?species=1,2&film=1`

**Performance Optimization**:

- Memoize filter functions with `useMemo`
- Virtualize large result lists (react-window or react-virtualized)
- Show only first 50 results, "Load More" for pagination
- Index data by ID for O(1) lookups

**User Experience**:

- Show result count as user types
- Clear all filters button
- Active filter chips with individual remove buttons
- Preserve filter state during navigation
- Loading skeleton during initial data fetch

**Alternatives Considered**:

- Server-side filtering: N/A - SWAPI doesn't support it
- Debounce at 300ms: Too fast, causes jitter on slower devices
- Debounce at 1000ms: Too slow, feels unresponsive
- Third-party search library (Fuse.js): Rejected - simple includes() sufficient for this dataset

---

## 5. State Management

### Decision: React Context API + Custom Hooks

**Rationale**:

- Application state is relatively simple (fetched data + UI state)
- React Context sufficient for sharing data across components
- Custom hooks encapsulate business logic
- No need for Redux/MobX complexity
- Smaller bundle size

**Global State**:

```javascript
// AppContext.jsx
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ... fetch logic

  return (
    <AppContext.Provider
      value={{ characters, planets, starships, loading, error }}
    >
      {children}
    </AppContext.Provider>
  );
};
```

**Custom Hooks**:

- `useSwapiData(endpoint)`: Fetch and cache SWAPI data
- `useDebounce(value, delay)`: Debounce input values
- `useLocalStorage(key, initial)`: Sync state with localStorage
- `useFilters()`: Manage filter state and URL params
- `use3DScene()`: Initialize Three.js scene

**Alternatives Considered**:

- Redux Toolkit: Rejected - overkill for this app size
- Zustand: Rejected - Context API sufficient
- Jotai/Recoil: Rejected - adds dependency, no atomic updates needed

---

## 6. Testing Strategy

### Decision: Vitest + React Testing Library + Playwright (E2E)

**Rationale**:

- Vitest is Vite-native, fast, and Jest-compatible
- React Testing Library aligns with user-centric testing
- Playwright for critical user flows
- No need for Cypress complexity

**Unit Tests**:

- Utility functions (debounce, formatters, validators)
- Custom hooks (useDebounce, useSwapiData)
- Service layer (SWAPI client, cache manager)

**Component Tests**:

- Holographic UI components (HoloButton, HoloCard)
- Search and filter components
- Character/Planet/Starship cards
- Mock SWAPI responses with MSW (Mock Service Worker)

**Integration Tests**:

- Search with filters end-to-end
- 3D planet viewer interaction
- Cache persistence
- Error handling flows

**E2E Tests** (Playwright):

- Search for "Luke Skywalker" → View details
- Apply multiple filters → Verify results
- Navigate to planet → Interact with 3D view
- Offline behavior with cached data

**Coverage Goals**:

- Utilities: 90%+
- Services: 80%+
- Components: 70%+
- Overall: 75%+

**Alternatives Considered**:

- Jest: Rejected - Vitest is faster with Vite
- Cypress: Rejected - Playwright has better API and is faster

---

## 7. Build & Deployment

### Decision: Vite + Static Hosting (Vercel/Netlify)

**Rationale**:

- Vite provides extremely fast dev server and optimized production builds
- Static hosting is free and fast (CDN distribution)
- No backend required, pure JAMstack architecture
- Easy CI/CD integration

**Vite Configuration**:

```javascript
// vite.config.js
export default {
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          "react-vendor": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["three", "@react-three/fiber"],
  },
};
```

**Deployment Options**:

1. **Vercel** (Recommended):

   - Auto-deploy on git push
   - Free SSL, global CDN
   - Preview deployments for PRs
   - Analytics included

2. **Netlify**:

   - Similar features to Vercel
   - Built-in form handling (if needed later)
   - Split testing capabilities

3. **GitHub Pages**:
   - Free for public repos
   - Manual deploy with GitHub Actions
   - No server-side features

**Build Optimization**:

- Code splitting by route
- Lazy load Three.js until needed
- Image optimization for textures
- Tree shaking unused code
- Minification and compression (gzip/brotli)

**Performance Targets**:

- Lighthouse score: 90+ on all metrics
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Total bundle size: < 500KB (gzipped)

---

## 8. Browser Compatibility & Progressive Enhancement

### Decision: Target Modern Browsers with WebGL Fallbacks

**Minimum Browser Versions**:

- Chrome/Edge: 90+ (2021)
- Firefox: 88+ (2021)
- Safari: 14+ (2020)
- Mobile: iOS 14+, Android 10+

**Required Features**:

- ES6+ JavaScript
- CSS Grid & Flexbox
- LocalStorage API
- Fetch API
- WebGL 2.0 (for 3D features)

**Fallback Strategy**:

1. **WebGL Detection**:

```javascript
function hasWebGLSupport() {
  const canvas = document.createElement("canvas");
  return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
}
```

2. **Graceful Degradation**:

   - No WebGL: Show 2D planet images instead of 3D viewer
   - Show warning banner: "3D features require WebGL support"
   - All other features remain functional

3. **Progressive Enhancement**:
   - Core search/filter works without JavaScript
   - Enhanced with React for better UX
   - Animations disabled on low-end devices

**Polyfills**:

- None required (targeting modern browsers only)
- Users on older browsers see upgrade message

---

## Summary

All technical decisions documented and justified. Key takeaways:

✅ **SWAPI Integration**: Direct REST with aggressive local caching  
✅ **3D Rendering**: React-Three-Fiber for declarative Three.js  
✅ **UI Design**: Custom CSS holographic theme with animations  
✅ **Search/Filter**: 500ms debounced client-side filtering  
✅ **State Management**: React Context + custom hooks  
✅ **Testing**: Vitest + React Testing Library + Playwright  
✅ **Deployment**: Vite + Vercel/Netlify static hosting  
✅ **Compatibility**: Modern browsers with WebGL fallbacks

**Next Steps**: Proceed to Phase 1 - Design artifacts (data-model.md, contracts, quickstart.md)
