/**
 * Cache Manager - LocalStorage cache operations
 * 
 * Provides utilities for managing browser localStorage cache
 */

const CACHE_KEY_PREFIX = 'starwars_';
const DEFAULT_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

export const cacheManager = {
  /**
   * Get item from cache
   */
  get(key) {
    try {
      const fullKey = `${CACHE_KEY_PREFIX}${key}`;
      const item = localStorage.getItem(fullKey);
      
      if (!item) return null;

      const parsed = JSON.parse(item);
      const now = Date.now();

      // Check if expired
      if (now > parsed.expiresAt) {
        this.remove(key);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.warn(`Failed to get cache for ${key}:`, error);
      return null;
    }
  },

  /**
   * Set item in cache
   */
  set(key, data, ttl = DEFAULT_TTL) {
    try {
      const fullKey = `${CACHE_KEY_PREFIX}${key}`;
      const now = Date.now();

      const item = {
        data,
        cachedAt: now,
        expiresAt: now + ttl
      };

      localStorage.setItem(fullKey, JSON.stringify(item));
      return true;
    } catch (error) {
      console.warn(`Failed to set cache for ${key}:`, error);
      return false;
    }
  },

  /**
   * Remove item from cache
   */
  remove(key) {
    try {
      const fullKey = `${CACHE_KEY_PREFIX}${key}`;
      localStorage.removeItem(fullKey);
      return true;
    } catch (error) {
      console.warn(`Failed to remove cache for ${key}:`, error);
      return false;
    }
  },

  /**
   * Clear all cache with our prefix
   */
  clearAll() {
    try {
      const keys = Object.keys(localStorage);
      const ourKeys = keys.filter(key => key.startsWith(CACHE_KEY_PREFIX));
      
      ourKeys.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.warn('Failed to clear cache:', error);
      return false;
    }
  },

  /**
   * Get cache size information
   */
  getSize() {
    try {
      const keys = Object.keys(localStorage);
      const ourKeys = keys.filter(key => key.startsWith(CACHE_KEY_PREFIX));
      
      let totalSize = 0;
      ourKeys.forEach(key => {
        const item = localStorage.getItem(key);
        totalSize += item ? item.length : 0;
      });

      return {
        itemCount: ourKeys.length,
        sizeBytes: totalSize,
        sizeKB: (totalSize / 1024).toFixed(2),
        sizeMB: (totalSize / (1024 * 1024)).toFixed(2)
      };
    } catch (error) {
      console.warn('Failed to get cache size:', error);
      return null;
    }
  }
};

export default cacheManager;


