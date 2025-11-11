/**
 * SWAPI Service - Star Wars API Client with Caching
 * 
 * Provides methods to fetch data from SWAPI (https://swapi.dev/api/)
 * with built-in caching, pagination handling, and error management.
 */

const BASE_URL = 'https://swapi.dev/api';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const MAX_CONCURRENT_REQUESTS = 5;

class SwapiService {
  constructor() {
    this.cache = new Map();
    this.pendingRequests = new Map();
    this.activeRequests = 0;
  }

  /**
   * Fetch data from SWAPI with caching
   * @param {string} url - Full SWAPI URL or relative path
   * @returns {Promise<Object>}
   */
  async fetch(url) {
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

    // Check cache first
    const cached = this.getCached(fullUrl);
    if (cached) return cached;

    // Check if request is already pending
    if (this.pendingRequests.has(fullUrl)) {
      return this.pendingRequests.get(fullUrl);
    }

    // Create new request
    const request = this._executeRequest(fullUrl);
    this.pendingRequests.set(fullUrl, request);

    try {
      const data = await request;
      this.setCached(fullUrl, data);
      return data;
    } finally {
      this.pendingRequests.delete(fullUrl);
    }
  }

  /**
   * Execute HTTP request with queue management
   */
  async _executeRequest(url) {
    // Wait if too many concurrent requests
    while (this.activeRequests >= MAX_CONCURRENT_REQUESTS) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.activeRequests++;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`SWAPI error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch ${url}:`, error);
      throw error;
    } finally {
      this.activeRequests--;
    }
  }

  /**
   * Get all characters with pagination
   */
  async getAllPeople() {
    return this._fetchAllPages('/people/');
  }

  /**
   * Get all planets with pagination
   */
  async getAllPlanets() {
    return this._fetchAllPages('/planets/');
  }

  /**
   * Get all starships with pagination
   */
  async getAllStarships() {
    return this._fetchAllPages('/starships/');
  }

  /**
   * Get all species
   */
  async getAllSpecies() {
    return this._fetchAllPages('/species/');
  }

  /**
   * Get all films
   */
  async getAllFilms() {
    return this._fetchAllPages('/films/');
  }

  /**
   * Fetch all pages of a paginated endpoint
   */
  async _fetchAllPages(endpoint) {
    const results = [];
    let url = endpoint;

    while (url) {
      const response = await this.fetch(url);
      results.push(...response.results);
      url = response.next;
    }

    return results;
  }

  /**
   * Resolve a SWAPI URL to its entity
   */
  async resolve(url) {
    if (!url) return null;
    return this.fetch(url);
  }

  /**
   * Resolve multiple URLs in parallel
   */
  async resolveMany(urls) {
    if (!urls || urls.length === 0) return [];
    return Promise.all(urls.map(url => this.resolve(url)));
  }

  /**
   * Extract ID from SWAPI URL
   */
  extractId(url) {
    const match = url.match(/\/(\d+)\/$/);
    return match ? match[1] : null;
  }

  /**
   * Get from cache
   */
  getCached(url) {
    const entry = this.cache.get(url);
    if (!entry) return null;

    const now = Date.now();
    if (now > entry.expiresAt) {
      this.cache.delete(url);
      return null;
    }

    return entry.data;
  }

  /**
   * Set cache entry
   */
  setCached(url, data) {
    const now = Date.now();
    this.cache.set(url, {
      data,
      cachedAt: now,
      expiresAt: now + CACHE_TTL,
      url
    });

    // Also save to localStorage
    this._persistCache();
  }

  /**
   * Persist cache to localStorage
   */
  _persistCache() {
    try {
      const cacheData = Array.from(this.cache.entries());
      localStorage.setItem('swapi_cache', JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to persist cache:', error);
    }
  }

  /**
   * Load cache from localStorage
   */
  loadCache() {
    try {
      const cacheData = localStorage.getItem('swapi_cache');
      if (cacheData) {
        const entries = JSON.parse(cacheData);
        this.cache = new Map(entries);

        // Remove expired entries
        const now = Date.now();
        for (const [url, entry] of this.cache.entries()) {
          if (now > entry.expiresAt) {
            this.cache.delete(url);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to load cache:', error);
    }
  }

  /**
   * Clear all cached data
   */
  clearCache() {
    this.cache.clear();
    localStorage.removeItem('swapi_cache');
  }
}

// Export singleton instance
export const swapiService = new SwapiService();
export default swapiService;


