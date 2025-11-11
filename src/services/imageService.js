/**
 * Image Service - Fetches character images from akabab's StarWars API
 * This service complements SWAPI data with image URLs
 */

const IMAGE_API_BASE = "https://akabab.github.io/starwars-api/api";
const CACHE_KEY = "starwars_images_cache";
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

class ImageService {
  constructor() {
    this.imageCache = new Map();
    this.loadCache();
  }

  /**
   * Load cache from localStorage
   */
  loadCache() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        
        if (age < CACHE_TTL) {
          this.imageCache = new Map(Object.entries(data));
          console.log(`[ImageService] Loaded ${this.imageCache.size} cached images`);
        } else {
          localStorage.removeItem(CACHE_KEY);
        }
      }
    } catch (error) {
      console.error("[ImageService] Failed to load cache:", error);
    }
  }

  /**
   * Save cache to localStorage
   */
  saveCache() {
    try {
      const data = Object.fromEntries(this.imageCache);
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error("[ImageService] Failed to save cache:", error);
    }
  }

  /**
   * Fetch all character images and build name-to-image mapping
   */
  async fetchAllImages() {
    try {
      console.log("[ImageService] Fetching all character images...");
      const response = await fetch(`${IMAGE_API_BASE}/all.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const characters = await response.json();
      
      // Build name-to-image map (normalize names for better matching)
      characters.forEach(char => {
        if (char.image && char.name) {
          const normalizedName = this.normalizeName(char.name);
          this.imageCache.set(normalizedName, {
            image: char.image,
            id: char.id,
            wiki: char.wiki
          });
        }
      });
      
      this.saveCache();
      console.log(`[ImageService] Cached ${this.imageCache.size} character images`);
      
      return this.imageCache;
    } catch (error) {
      console.error("[ImageService] Failed to fetch images:", error);
      return this.imageCache; // Return existing cache on error
    }
  }

  /**
   * Get image URL for a character by name
   */
  getImageByName(characterName) {
    if (!characterName) return null;
    
    const normalizedName = this.normalizeName(characterName);
    const cached = this.imageCache.get(normalizedName);
    
    return cached?.image || null;
  }

  /**
   * Get all image data for a character (includes wiki link)
   */
  getCharacterImageData(characterName) {
    if (!characterName) return null;
    
    const normalizedName = this.normalizeName(characterName);
    return this.imageCache.get(normalizedName) || null;
  }

  /**
   * Normalize character name for consistent matching
   * Handles variations like "Darth Vader" vs "darth vader"
   */
  normalizeName(name) {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' '); // normalize whitespace
  }

  /**
   * Check if images are loaded
   */
  isLoaded() {
    return this.imageCache.size > 0;
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      cachedImages: this.imageCache.size,
      isLoaded: this.isLoaded()
    };
  }
}

// Export singleton instance
const imageService = new ImageService();
export default imageService;


