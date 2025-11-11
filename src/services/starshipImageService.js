/**
 * Starship Image Mapping Service
 * Maps starship names to reliable image sources
 */

// Manual mapping for popular starships with known good images
const starshipImageMapping = {
  // Original Trilogy
  "Millennium Falcon": "https://starwars-visualguide.com/assets/img/starships/10.jpg",
  "X-wing": "https://starwars-visualguide.com/assets/img/starships/12.jpg",
  "Imperial shuttle": "https://starwars-visualguide.com/assets/img/starships/22.jpg",
  "Executor": "https://starwars-visualguide.com/assets/img/starships/15.jpg",
  "Rebel transport": "https://starwars-visualguide.com/assets/img/starships/17.jpg",
  
  // Prequel Trilogy
  "Trade Federation cruiser": "https://starwars-visualguide.com/assets/img/starships/32.jpg",
  "Jedi starfighter": "https://starwars-visualguide.com/assets/img/starships/48.jpg",
  "Naboo fighter": "https://starwars-visualguide.com/assets/img/starships/39.jpg",
  
  // Popular ships
  "Star Destroyer": "https://starwars-visualguide.com/assets/img/starships/3.jpg",
  "Death Star": "https://starwars-visualguide.com/assets/img/starships/9.jpg",
  "Y-wing": "https://starwars-visualguide.com/assets/img/starships/11.jpg",
  "TIE Advanced x1": "https://starwars-visualguide.com/assets/img/starships/13.jpg",
  "Slave 1": "https://starwars-visualguide.com/assets/img/starships/21.jpg",
  "A-wing": "https://starwars-visualguide.com/assets/img/starships/28.jpg",
  "B-wing": "https://starwars-visualguide.com/assets/img/starships/29.jpg",
};

/**
 * Get starship icon/emoji based on class or type
 */
export function getStarshipIcon(starship) {
  const name = starship.name?.toLowerCase() || '';
  const shipClass = starship.starship_class?.toLowerCase() || '';
  
  // Specific ships
  if (name.includes('millennium falcon')) return '🦅';
  if (name.includes('death star')) return '⭕';
  if (name.includes('executor') || name.includes('star destroyer')) return '🔺';
  if (name.includes('slave')) return '🎯';
  
  // By class
  if (shipClass.includes('fighter') || name.includes('wing') || name.includes('tie')) return '✈️';
  if (shipClass.includes('corvette')) return '🚢';
  if (shipClass.includes('frigate')) return '⚓';
  if (shipClass.includes('cruiser')) return '🛸';
  if (shipClass.includes('transport')) return '📦';
  if (shipClass.includes('shuttle')) return '🚐';
  if (shipClass.includes('yacht') || shipClass.includes('barge')) return '⛵';
  if (shipClass.includes('bomber')) return '💣';
  if (shipClass.includes('assault')) return '⚔️';
  
  return '🚀'; // Default
}

/**
 * Get starship image URL with comprehensive fallback strategy
 */
export function getStarshipImageData(starship) {
  // Strategy 1: Check manual mapping first (most reliable)
  if (starshipImageMapping[starship.name]) {
    return {
      hasImage: true,
      primary: starshipImageMapping[starship.name],
      fallback: null,
      icon: getStarshipIcon(starship)
    };
  }
  
  // Strategy 2: Try to construct URL from SWAPI ID
  const idMatch = starship.url?.match(/\/(\d+)\/$/);
  const id = idMatch ? idMatch[1] : null;
  
  if (id) {
    return {
      hasImage: false, // Mark as uncertain
      primary: `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`,
      fallback: `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/starships/${id}.jpg`,
      icon: getStarshipIcon(starship)
    };
  }
  
  // Strategy 3: No image available
  return {
    hasImage: false,
    primary: null,
    fallback: null,
    icon: getStarshipIcon(starship)
  };
}

/**
 * Get starship avatar with better visual representation
 */
export function getStarshipAvatar(starship) {
  // Generate a consistent color based on name
  const hash = starship.name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const hue = Math.abs(hash % 360);
  
  // Different color schemes based on ship type
  const shipClass = starship.starship_class?.toLowerCase() || '';
  let saturation = 70;
  let lightness = 50;
  
  if (shipClass.includes('fighter')) {
    saturation = 80; // More vibrant for fighters
    lightness = 55;
  } else if (shipClass.includes('destroyer') || shipClass.includes('cruiser')) {
    saturation = 50; // More muted for capital ships
    lightness = 45;
  }
  
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  
  // Get initials
  const initials = starship.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
  
  return {
    color,
    initials,
    icon: getStarshipIcon(starship)
  };
}

export default {
  getStarshipImageData,
  getStarshipAvatar,
  getStarshipIcon,
  starshipImageMapping
};


