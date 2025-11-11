import imageService from '../services/imageService';

/**
 * Get character image URL with multiple fallback sources
 */
export function getCharacterImageUrl(characterUrl, characterName) {
  const id = extractIdFromUrl(characterUrl);
  
  // Priority 1: Try akabab's API (best quality, real images)
  const akaImage = imageService.getImageByName(characterName);
  if (akaImage) {
    return {
      primary: akaImage,
      fallback: null,
      id: id,
      source: 'akabab'
    };
  }
  
  // Priority 2: Fall back to Star Wars Visual Guide
  const sources = [
    `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
    `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/characters/${id}.jpg`,
  ];
  
  return {
    primary: sources[0],
    fallback: sources[1],
    id: id,
    source: 'visualguide'
  };
}

/**
 * Get starship image URL with multiple fallback sources
 */
export function getStarshipImageUrl(starshipUrl) {
  const id = extractIdFromUrl(starshipUrl);
  
  // Star Wars Visual Guide has starship images
  const sources = [
    `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`,
    `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/starships/${id}.jpg`,
  ];
  
  return {
    primary: sources[0],
    fallback: sources[1],
    id: id,
    source: 'visualguide'
  };
}

/**
 * Get planet image URL with multiple fallback sources
 */
export function getPlanetImageUrl(planetUrl) {
  const id = extractIdFromUrl(planetUrl);
  
  // Star Wars Visual Guide has planet images
  const sources = [
    `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`,
    `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/planets/${id}.jpg`,
  ];
  
  return {
    primary: sources[0],
    fallback: sources[1],
    id: id,
    source: 'visualguide'
  };
}

/**
 * Get placeholder avatar based on character name
 */
export function getCharacterAvatar(characterName) {
  // Generate a consistent color based on name
  const hash = characterName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const hue = Math.abs(hash % 360);
  const color = `hsl(${hue}, 70%, 50%)`;
  
  // Get initials
  const initials = characterName
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
  
  return {
    color,
    initials
  };
}

/**
 * Get placeholder avatar for starship
 */
export function getStarshipAvatar(starshipName) {
  // Generate a consistent color based on name
  const hash = starshipName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const hue = Math.abs(hash % 360);
  const color = `hsl(${hue}, 70%, 50%)`;
  
  // Get initials
  const initials = starshipName
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
  
  return {
    color,
    initials
  };
}

/**
 * Extract ID from SWAPI URL
 */
function extractIdFromUrl(url) {
  const match = url.match(/\/(\d+)\/$/);
  return match ? match[1] : null;
}

export default {
  getCharacterImageUrl,
  getCharacterAvatar,
  getStarshipImageUrl,
  getStarshipAvatar,
  getPlanetImageUrl
};
