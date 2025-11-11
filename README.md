# Star Wars 3D Interactive Encyclopedia

An immersive, holographic-style Star Wars encyclopedia featuring interactive 3D planet visualizations, character search, and an epic space battle background animation.

🌐 **[View Live Demo](https://star-wars-nu-three.vercel.app/)**  

![Star Wars Encyclopedia](https://img.shields.io/badge/Star%20Wars-Encyclopedia-00f3ff?style=for-the-badge)
![Built with React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js)

## ✨ Features

### 🌌 Immersive Holographic UI
- Cyan glowing holographic theme
- Animated space battle background with 30+ ships
- 60+ laser blasts with realistic dogfighting animations
- Pulsing effects and scan-line overlays

### 🪐 Interactive 3D Planets
- Real-time 3D planet rendering with Three.js
- Auto-rotating planets colored by terrain
- Interactive orbit controls
- Starfield backgrounds

### 👥 Character Search & Discovery
- Search 80+ Star Wars characters
- Advanced multi-criteria filtering
- Character details with images
- Debounced search for performance

### 🚀 Starship Database
- Browse iconic Star Wars starships
- Detailed specifications
- Image previews with fallbacks
- Pagination support

### 🎵 Imperial March Theme
- Toggle Darth Vader's theme music
- Looping background music
- Visual feedback when playing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/starWars.git
cd starWars

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the app.

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
starWars/
├── public/
│   ├── audio/              # Audio files (Imperial March)
│   └── textures/           # 3D textures
├── src/
│   ├── components/
│   │   ├── character/      # Character cards & details
│   │   ├── common/         # Reusable UI components
│   │   ├── home/           # Background battle animation
│   │   ├── layout/         # Header, Footer, Loading
│   │   ├── planet/         # 3D planet viewer & cards
│   │   ├── search/         # Search & filter components
│   │   └── starship/       # Starship components
│   ├── context/            # React Context (AppContext)
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Route pages
│   ├── services/           # API services (SWAPI)
│   ├── styles/             # Global CSS & themes
│   └── utils/              # Helper functions
├── specs/                  # Project specifications
└── vite.config.js         # Vite configuration
```

## 🛠️ Tech Stack

- **Frontend:** React 18.3
- **3D Graphics:** Three.js, @react-three/fiber, @react-three/drei
- **Routing:** React Router DOM
- **Build Tool:** Vite
- **Styling:** CSS Variables, Holographic Theme
- **Data Source:** SWAPI (Star Wars API)

## 🎨 Key Features Breakdown

### Background Battle Animation
- 6 X-Wing fighters with dogfighting maneuvers
- 8 TIE fighters with pursuit patterns
- 4 A-Wing interceptors (fast)
- 4 TIE Interceptors (elite)
- 3 Y-Wing bombers
- Millennium Falcon with hero entrance
- Star Destroyer capital ship
- 60+ laser bolts (blue/red/green)
- 8 dynamic explosions
- 15 engine trails

### 3D Planet Visualization
- WebGL-powered rendering
- Terrain-based coloring:
  - 🟡 Desert (sandy beige)
  - ❄️ Ice (light blue)
  - 🌲 Forest (green)
  - 🌊 Ocean (deep blue)
  - 🏙️ Urban (gray)
  - 🌋 Volcanic (red)
  - 🐊 Swamp (olive)
- Atmospheric glow effects
- Auto-rotation with orbit controls

## 📡 API Integration

This app uses [SWAPI](https://swapi.dev) - The Star Wars API for all data:
- Characters
- Planets
- Starships
- Films
- Species

## 📝 License & Copyright

© 2025 Sidharth Paliwal. All rights reserved.

**Note:** Star Wars and all related characters are trademarks of Lucasfilm Ltd. This is a fan-made educational project and is not affiliated with or endorsed by Lucasfilm or Disney.

## 🙏 Acknowledgments

- Data provided by [SWAPI](https://swapi.dev)
- Images from [Star Wars Visual Guide](https://starwars-visualguide.com)
- Built with ❤️ and the Force

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

---

⚡ **May the Force be with you!** ⚡
