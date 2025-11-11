# Tasks: Star Wars 3D Interactive Encyclopedia - MVP

**Input**: Design documents from `/specs/001-star-wars-3d-encyclopedia/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/swapi-integration.md

**Tests**: Tests are NOT included in this MVP - focus is on getting a working application in the browser quickly.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**MVP Scope**: User Stories 1 and 2 (both P1) - Character Search and Multi-Criteria Filtering

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend-only SPA**: All code in `/src/` at repository root
- Static assets in `/public/`
- Entry point: `/index.html`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for a React + Vite + Three.js application

- [x] T001 Initialize Vite + React project with `npm create vite@latest . -- --template react`
- [x] T002 Install core dependencies: `npm install react-router-dom @react-three/fiber @react-three/drei three`
- [x] T003 [P] Create project directory structure (src/components, src/hooks, src/services, src/utils, src/styles, src/pages, src/context, public/textures)
- [x] T004 [P] Configure vite.config.js with manual chunks for three.js and react-vendor
- [x] T005 [P] Create global CSS reset in src/styles/global.css
- [x] T006 [P] Create holographic theme CSS variables in src/styles/holographic.css (colors, glow effects, transitions)
- [x] T007 [P] Create base animations CSS in src/styles/animations.css (fadeInGlow, scanline, pulseGlow keyframes)
- [x] T008 [P] Create README.md with quickstart instructions

**Checkpoint**: Project initialized with Vite + React, directory structure ready, styling foundation in place

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 Implement SWAPI service class in src/services/swapi.js with fetch, caching, pagination methods
- [x] T010 [P] Implement cache manager in src/services/cache.js for localStorage operations
- [x] T011 [P] Create debounce utility function in src/utils/debounce.js
- [x] T012 [P] Create formatters utility in src/utils/formatters.js (format dates, numbers, lists)
- [x] T013 [P] Create useDebounce custom hook in src/hooks/useDebounce.js
- [x] T014 [P] Create useSwapiData custom hook in src/hooks/useSwapiData.js for data fetching
- [x] T015 [P] Create useLocalStorage custom hook in src/hooks/useLocalStorage.js
- [x] T016 Create AppContext provider in src/context/AppContext.jsx with state for characters, planets, species, films
- [x] T017 Create router configuration in src/router.jsx with routes for Home, Characters, Planets, Starships
- [x] T018 Set up main App component in src/App.jsx with AppContext.Provider and Router
- [x] T019 Create entry point in src/main.jsx that renders App with global styles
- [x] T020 [P] Create HTML entry point in index.html with proper meta tags and root div
- [x] T021 [P] Create base holographic UI components: HoloButton in src/components/common/HoloButton.jsx
- [x] T022 [P] Create HoloCard component in src/components/common/HoloCard.jsx with glow borders
- [x] T023 [P] Create HoloInput component in src/components/common/HoloInput.jsx with animated border
- [x] T024 [P] Create LoadingSpinner component in src/components/layout/LoadingScreen.jsx with holographic animation
- [x] T025 [P] Create Header component in src/components/layout/Header.jsx with navigation

**Checkpoint**: Foundation ready - SWAPI service working, hooks available, routing configured, base UI components created. User story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Character Search and Discovery (Priority: P1) 🎯 MVP Core

**Goal**: Users can search for Star Wars characters by name and view their complete profiles with holographic UI

**Independent Test**:

1. Open app in browser at `http://localhost:5173`
2. Enter "Luke" in search field
3. See debounced search results appear with holographic animations
4. Click on "Luke Skywalker" card
5. View full character details (name, birth year, height, mass, homeworld, species, films)
6. Verify holographic styling on all UI elements

### Implementation for User Story 1

- [x] T026 [P] [US1] Create SearchBar component in src/components/search/SearchBar.jsx with debounced input
- [x] T027 [P] [US1] Create CharacterCard component in src/components/character/CharacterCard.jsx with holographic styling
- [x] T028 [P] [US1] Create ResultsList component in src/components/search/ResultsList.jsx to display character cards
- [x] T029 [US1] Create CharacterDetail component in src/components/character/CharacterDetail.jsx with full character info display
- [x] T030 [US1] Implement Characters page in src/pages/Characters.jsx integrating SearchBar and ResultsList
- [x] T031 [US1] Implement Home page in src/pages/Home.jsx with welcome message and search feature
- [x] T032 [US1] Add character search logic in AppContext to fetch and filter characters from SWAPI
- [x] T033 [US1] Add character data loading on app initialization in AppContext (fetch all people from SWAPI)
- [x] T034 [US1] Implement partial name matching in search functionality (case-insensitive includes)
- [x] T035 [US1] Add "No results found" message display in ResultsList when search returns empty
- [x] T036 [US1] Add loading state animations during character data fetch using LoadingScreen component
- [x] T037 [US1] Style CharacterCard with holographic CSS (transparent background, glow borders, hover effects)
- [x] T038 [US1] Style CharacterDetail with holographic CSS and smooth fade-in animation
- [x] T039 [US1] Add error handling for SWAPI failures with user-friendly error messages
- [x] T040 [US1] Test search with "Anakin Skywalker", "Luke", and non-existent names in browser

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Users can search for characters and view details in a holographic interface.

---

## Phase 4: User Story 2 - Multi-Criteria Filtering (Priority: P1) 🎯 MVP Enhancement

**Goal**: Users can filter characters by species, film, or planet to discover characters based on specific criteria

**Independent Test**:

1. Open app in browser at `http://localhost:5173`
2. Navigate to Characters page
3. Select "Human" from species filter dropdown
4. See only human characters displayed
5. Add "A New Hope" film filter
6. See only humans from A New Hope
7. Select "Tatooine" planet filter
8. See characters matching all three criteria
9. Clear filters one by one and verify results update
10. Verify filter state persists in URL (shareable links)

### Implementation for User Story 2

- [x] T041 [P] [US2] Create FilterPanel component in src/components/search/FilterPanel.jsx with filter options
- [x] T042 [P] [US2] Create SpeciesFilter dropdown in src/components/search/FilterPanel.jsx
- [x] T043 [P] [US2] Create FilmFilter dropdown in src/components/search/FilterPanel.jsx
- [x] T044 [P] [US2] Create PlanetFilter dropdown in src/components/search/FilterPanel.jsx
- [x] T045 [US2] Add species data loading in AppContext (fetch all species from SWAPI on init)
- [x] T046 [US2] Add films data loading in AppContext (fetch all films from SWAPI on init)
- [x] T047 [US2] Add planets data loading in AppContext (fetch all planets from SWAPI on init)
- [x] T048 [US2] Create useFilters custom hook in src/hooks/useFilters.js for filter state management
- [x] T049 [US2] Implement multi-criteria filter logic in AppContext (AND logic for combined filters)
- [x] T050 [US2] Integrate FilterPanel into Characters page next to SearchBar
- [x] T051 [US2] Add URL parameter synchronization for filters in useFilters hook (use URLSearchParams)
- [x] T052 [US2] Implement filter clear functionality (clear all, clear individual filter)
- [x] T053 [US2] Add active filter chips display showing currently applied filters with remove buttons
- [x] T054 [US2] Add result count display showing "X characters found" based on active filters
- [x] T055 [US2] Add "No matches found" message when filters return zero results
- [x] T056 [US2] Style FilterPanel with holographic theme (dropdowns with glow, filter chips with animations)
- [x] T057 [US2] Implement filter animations (smooth transitions when adding/removing filters)
- [x] T058 [US2] Add loading indicators for species, films, planets data in filter dropdowns
- [x] T059 [US2] Resolve related entity URLs (species name from species URL, planet name from planet URL, etc.)
- [x] T060 [US2] Test filtering by species only, film only, planet only, and all combinations in browser

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently and together. Users can search and filter characters with a complete holographic interface.

---

## Phase 5: Polish & MVP Completion

**Purpose**: Final touches to make the MVP production-ready for local browser testing

- [x] T061 [P] Add NotFound page component in src/pages/NotFound.jsx for 404 handling
- [x] T062 [P] Add error boundary component in src/components/common/ErrorBoundary.jsx
- [x] T063 [P] Create component-specific CSS in src/styles/components.css for remaining styling
- [x] T064 Add WebGL detection utility in src/utils/validators.js (for future 3D features)
- [x] T065 Add responsive design media queries to all components (mobile, tablet, desktop)
- [x] T066 [P] Add favicon and meta tags for PWA in public/ and index.html
- [x] T067 [P] Optimize bundle size: verify code splitting in vite.config.js is working
- [x] T068 Add keyboard navigation support for search and filters (Enter to search, Escape to clear)
- [x] T069 Add accessibility improvements: ARIA labels, focus indicators, alt texts
- [x] T070 Verify all holographic animations run at 60 FPS in Chrome DevTools Performance tab
- [x] T071 Test cache functionality: verify localStorage persists data across page reloads
- [x] T072 Test offline behavior: verify cached data works when SWAPI is unreachable
- [x] T073 [P] Update README.md with complete setup instructions and MVP feature list
- [x] T074 Create .gitignore file with node_modules, dist, .env exclusions
- [x] T075 Run `npm run build` and verify production build succeeds
- [x] T076 Run `npm run preview` and test production build in browser
- [x] T077 Verify search debouncing works (500ms delay) using browser console logs
- [x] T078 Verify filter persistence: copy URL with filters, paste in new tab, verify filters applied
- [x] T079 Test edge cases: very long names, special characters, rapid filter changes
- [x] T080 Final MVP validation: complete all acceptance scenarios from User Stories 1 and 2

**Checkpoint**: MVP is complete and ready for local browser testing. All P1 user stories implemented with holographic UI.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) completion
- **User Story 2 (Phase 4)**: Depends on Foundational (Phase 2) completion, builds on User Story 1
- **Polish (Phase 5)**: Depends on User Stories 1 and 2 being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Integrates with US1 search but adds independent filtering capability

### Within Each User Story

**User Story 1 Flow**:

1. Components (SearchBar, CharacterCard, ResultsList, CharacterDetail) - can be parallel
2. Pages (Home, Characters) - depends on components
3. Data loading and search logic in AppContext - can work in parallel with components
4. Styling and animations - can be parallel with logic
5. Error handling and edge cases - after core functionality

**User Story 2 Flow**:

1. Filter components (SpeciesFilter, FilmFilter, PlanetFilter) - can be parallel
2. Data loading (species, films, planets) - can be parallel
3. Filter logic and useFilters hook - after data loading setup
4. Integration into Characters page - after filter components
5. URL synchronization - after filter logic
6. Styling and animations - can be parallel with logic

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T003-T008)
- All Foundational tasks marked [P] can run in parallel within their dependency groups:
  - Group 1 (T010-T015): Utilities and hooks - fully parallel
  - Group 2 (T021-T025): Base UI components - fully parallel
- User Story 1: T026-T028 (components) can run fully parallel
- User Story 2: T041-T044 (filter components) can run fully parallel, T045-T047 (data loading) can run fully parallel
- Polish phase: Most tasks marked [P] can run in parallel (T061-T063, T066-T067, T073-T074)

---

## Parallel Example: User Story 1

```bash
# Launch all core components for User Story 1 together:
Task: "Create SearchBar component in src/components/search/SearchBar.jsx"
Task: "Create CharacterCard component in src/components/character/CharacterCard.jsx"
Task: "Create ResultsList component in src/components/search/ResultsList.jsx"
Task: "Create CharacterDetail component in src/components/character/CharacterDetail.jsx"

# After components are ready, integrate in parallel:
Task: "Implement Characters page in src/pages/Characters.jsx"
Task: "Implement Home page in src/pages/Home.jsx"
Task: "Add character search logic in AppContext"
```

---

## Parallel Example: User Story 2

```bash
# Launch all filter components for User Story 2 together:
Task: "Create SpeciesFilter dropdown in src/components/search/FilterPanel.jsx"
Task: "Create FilmFilter dropdown in src/components/search/FilterPanel.jsx"
Task: "Create PlanetFilter dropdown in src/components/search/FilterPanel.jsx"

# Launch all data loading tasks together:
Task: "Add species data loading in AppContext"
Task: "Add films data loading in AppContext"
Task: "Add planets data loading in AppContext"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. Complete Phase 1: Setup (T001-T008)
2. Complete Phase 2: Foundational (T009-T025) - CRITICAL blocking phase
3. Complete Phase 3: User Story 1 (T026-T040)
4. **STOP and VALIDATE**: Test Character Search independently in browser
5. Complete Phase 4: User Story 2 (T041-T060)
6. **STOP and VALIDATE**: Test Filtering independently and with Search
7. Complete Phase 5: Polish (T061-T080)
8. **FINAL VALIDATION**: Run through all acceptance scenarios
9. MVP ready for local browser testing at `http://localhost:5173`

### What's NOT in MVP

The following User Stories are excluded from MVP (can be added later):

- ❌ **User Story 3 (P2)**: 3D Planet Visualization - requires Three.js scene setup, 3D models, WebGL
- ❌ **User Story 4 (P2)**: Starship Browsing - requires additional pages and components
- ❌ **User Story 5 (P3)**: Enhanced Holographic UI - MVP has basic holographic styling, advanced effects can be added later

### Incremental Delivery After MVP

Once MVP is validated:

1. **Add User Story 3**: 3D Planet Viewer

   - Install @react-three/fiber and @react-three/drei
   - Create PlanetViewer3D component
   - Add planet detail page with 3D visualization
   - Add planet textures to public/textures/

2. **Add User Story 4**: Starship Browsing

   - Create StarshipCard and StarshipDetail components
   - Create Starships page
   - Add starship data loading to AppContext
   - Add starship routes

3. **Add User Story 5**: Enhanced Holographic Effects
   - Add scan line overlay effects
   - Add particle effects for loading states
   - Add advanced glow and transparency effects
   - Add holographic distortion effects

---

## Quick Start Commands

```bash
# Setup (run once)
npm create vite@latest . -- --template react
npm install
npm install react-router-dom @react-three/fiber @react-three/drei three

# Development (run every time)
npm run dev
# Open browser to http://localhost:5173

# Test MVP
1. Search for "Luke" - verify results appear with debouncing
2. Click character card - verify detail view loads
3. Select "Human" species filter - verify filtered results
4. Add "A New Hope" film filter - verify combined filtering
5. Clear filters - verify all characters return
6. Reload page - verify data loads from cache quickly

# Build for production
npm run build
npm run preview
```

---

## Notes

- **MVP Focus**: Tasks prioritize getting a working application in the browser quickly
- **No Tests**: Tests excluded from MVP to speed up initial development
- **SWAPI Integration**: All data comes from https://swapi.dev/ API with local caching
- **Holographic UI**: Basic holographic styling included (glow, transparency, animations)
- **Performance**: Debouncing (500ms), caching (7 days), lazy loading implemented
- **Browser Support**: Targets modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- **Responsive**: Mobile-responsive design included in polish phase
- **Accessibility**: Basic ARIA labels and keyboard nav included in polish phase
- **Next Steps**: After MVP validation, add User Stories 3-5 incrementally

---

## Task Count Summary

- **Phase 1 (Setup)**: 8 tasks
- **Phase 2 (Foundational)**: 17 tasks (BLOCKING)
- **Phase 3 (User Story 1)**: 15 tasks
- **Phase 4 (User Story 2)**: 20 tasks
- **Phase 5 (Polish)**: 20 tasks
- **Total**: 80 tasks

**Parallel Tasks**: 31 tasks marked [P] can run in parallel
**Sequential Tasks**: 49 tasks have dependencies
**MVP Core Tasks**: T001-T060 (Setup + Foundational + US1 + US2)
**Polish Tasks**: T061-T080 (Final touches)

---

---

## Phase 6: Post-MVP Enhancements

**Purpose**: Additional visual features and improvements beyond core MVP functionality

- [x] T081 [P] [Enhancement] Add battle shooting scene of spaceships as background animation across all pages in src/components/home/BackgroundBattle.jsx (extend existing component)
- [x] T082 [P] [Enhancement] Create planet image preview with cards in src/components/planet/PlanetCard.jsx with holographic styling and implement in src/pages/Planets.jsx
- [x] T083 [P] [Enhancement] Enhance battle scene with many more spaceships (30+ total), realistic dogfighting animations, and 60+ laser blasts with blue/red/green fire synchronized to ship movements
- [x] T084 [P] [BugFix] Fix planet image preview loading in PlanetCard - images now load correctly with proper fallback handling and loading states
- [x] T085 [P] [Enhancement] Replace planet card static images with interactive 3D planet previews using Three.js with auto-rotation and starfield backgrounds
- [x] T086 [P] [Enhancement] Add sound toggle button in Header to play Imperial March (Darth Vader's theme) with play/pause functionality and volume control
- [x] T087 [P] [Production] Add copyright footer with Sidharth Paliwal attribution, prepare deployment configs for Vercel/Netlify, create comprehensive deployment documentation
- [x] T088 [P] [BugFix] Fix character grid layout to show exactly 3 cards per row with mobile-responsive breakpoints (3→2→1 columns)

**Checkpoint**: Enhanced visual experience with animated space battle backgrounds, planet browsing with image previews, and production-ready deployment.

---

## Format Validation ✅

All tasks follow the required checklist format:

- ✅ Checkbox `- [ ]` at start
- ✅ Task ID (T001-T082) sequential
- ✅ [P] marker for parallelizable tasks
- ✅ [Story] label (US1, US2) for user story phases
- ✅ Clear description with exact file paths
- ✅ Organized by user story for independent implementation
- ✅ Independent test criteria for each story
- ✅ MVP scope clearly defined (US1 + US2)
