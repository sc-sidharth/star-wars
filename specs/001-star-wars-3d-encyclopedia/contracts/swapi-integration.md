# API Contracts: SWAPI Integration

**Feature**: Star Wars 3D Interactive Encyclopedia  
**Date**: November 3, 2025  
**Phase**: 1 - Design

## Overview

This document defines how the application integrates with the Star Wars API (SWAPI) at https://swapi.dev/. All interactions are read-only HTTP GET requests. No authentication required.

**Reference**: [SWAPI Documentation](https://swapi.dev/)

---

## Base Configuration

**Base URL**: `https://swapi.dev/api/`  
**Protocol**: HTTPS  
**Authentication**: None required  
**Rate Limiting**: None documented, but implement client-side throttling  
**Response Format**: JSON  
**Character Encoding**: UTF-8

---

## Endpoints

### 1. People (Characters)

#### List All Characters

**Endpoint**: `GET /api/people/`

**Query Parameters**:

- `page` (optional): Page number for pagination (default: 1)
- `search` (optional): Search query (not used client-side)

**Response**:

```json
{
  "count": 82,
  "next": "https://swapi.dev/api/people/?page=2",
  "previous": null,
  "results": [
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
      "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/"
      ],
      "species": [],
      "vehicles": [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/"
      ],
      "starships": [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/"
      ],
      "created": "2014-12-09T13:50:51.644000Z",
      "edited": "2014-12-20T21:17:56.891000Z",
      "url": "https://swapi.dev/api/people/1/"
    }
  ]
}
```

#### Get Single Character

**Endpoint**: `GET /api/people/{id}/`

**Path Parameters**:

- `id`: Character ID (1-82)

**Response**: Single character object (same structure as in results array)

**Cache Strategy**: Cache for 7 days

---

### 2. Planets

#### List All Planets

**Endpoint**: `GET /api/planets/`

**Query Parameters**:

- `page` (optional): Page number for pagination

**Response**:

```json
{
  "count": 60,
  "next": "https://swapi.dev/api/planets/?page=2",
  "previous": null,
  "results": [
    {
      "name": "Tatooine",
      "rotation_period": "23",
      "orbital_period": "304",
      "diameter": "10465",
      "climate": "arid",
      "gravity": "1 standard",
      "terrain": "desert",
      "surface_water": "1",
      "population": "200000",
      "residents": [
        "https://swapi.dev/api/people/1/",
        "https://swapi.dev/api/people/2/"
      ],
      "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/4/",
        "https://swapi.dev/api/films/5/",
        "https://swapi.dev/api/films/6/"
      ],
      "created": "2014-12-09T13:50:49.641000Z",
      "edited": "2014-12-20T20:58:18.411000Z",
      "url": "https://swapi.dev/api/planets/1/"
    }
  ]
}
```

#### Get Single Planet

**Endpoint**: `GET /api/planets/{id}/`

**Path Parameters**:

- `id`: Planet ID (1-60)

**Cache Strategy**: Cache for 7 days

---

### 3. Starships

#### List All Starships

**Endpoint**: `GET /api/starships/`

**Response**:

```json
{
  "count": 36,
  "next": "https://swapi.dev/api/starships/?page=2",
  "previous": null,
  "results": [
    {
      "name": "Death Star",
      "model": "DS-1 Orbital Battle Station",
      "manufacturer": "Imperial Department of Military Research, Sienar Fleet Systems",
      "cost_in_credits": "1000000000000",
      "length": "120000",
      "max_atmosphering_speed": "n/a",
      "crew": "342,953",
      "passengers": "843,342",
      "cargo_capacity": "1000000000000",
      "consumables": "3 years",
      "hyperdrive_rating": "4.0",
      "MGLT": "10",
      "starship_class": "Deep Space Mobile Battlestation",
      "pilots": [],
      "films": ["https://swapi.dev/api/films/1/"],
      "created": "2014-12-10T16:36:50.509000Z",
      "edited": "2014-12-20T21:26:24.783000Z",
      "url": "https://swapi.dev/api/starships/9/"
    }
  ]
}
```

#### Get Single Starship

**Endpoint**: `GET /api/starships/{id}/`

**Cache Strategy**: Cache for 7 days

---

### 4. Species

#### List All Species

**Endpoint**: `GET /api/species/`

**Response**:

```json
{
  "count": 37,
  "next": "https://swapi.dev/api/species/?page=2",
  "previous": null,
  "results": [
    {
      "name": "Human",
      "classification": "mammal",
      "designation": "sentient",
      "average_height": "180",
      "skin_colors": "caucasian, black, asian, hispanic",
      "hair_colors": "blonde, brown, black, red",
      "eye_colors": "brown, blue, green, hazel, grey, amber",
      "average_lifespan": "120",
      "homeworld": "https://swapi.dev/api/planets/9/",
      "language": "Galactic Basic",
      "people": [
        "https://swapi.dev/api/people/66/",
        "https://swapi.dev/api/people/67/"
      ],
      "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/"
      ],
      "created": "2014-12-10T13:52:11.567000Z",
      "edited": "2014-12-20T21:36:42.136000Z",
      "url": "https://swapi.dev/api/species/1/"
    }
  ]
}
```

#### Get Single Species

**Endpoint**: `GET /api/species/{id}/`

**Cache Strategy**: Cache for 7 days

---

### 5. Films

#### List All Films

**Endpoint**: `GET /api/films/`

**Response**:

```json
{
  "count": 6,
  "next": null,
  "previous": null,
  "results": [
    {
      "title": "A New Hope",
      "episode_id": 4,
      "opening_crawl": "It is a period of civil war...",
      "director": "George Lucas",
      "producer": "Gary Kurtz, Rick McCallum",
      "release_date": "1977-05-25",
      "characters": [
        "https://swapi.dev/api/people/1/",
        "https://swapi.dev/api/people/2/"
      ],
      "planets": [
        "https://swapi.dev/api/planets/1/",
        "https://swapi.dev/api/planets/2/"
      ],
      "starships": [
        "https://swapi.dev/api/starships/2/",
        "https://swapi.dev/api/starships/3/"
      ],
      "vehicles": [
        "https://swapi.dev/api/vehicles/4/",
        "https://swapi.dev/api/vehicles/6/"
      ],
      "species": [
        "https://swapi.dev/api/species/1/",
        "https://swapi.dev/api/species/2/"
      ],
      "created": "2014-12-10T14:23:31.880000Z",
      "edited": "2014-12-20T19:49:45.256000Z",
      "url": "https://swapi.dev/api/films/1/"
    }
  ]
}
```

#### Get Single Film

**Endpoint**: `GET /api/films/{id}/`

**Cache Strategy**: Cache for 7 days

---

### 6. Vehicles

#### List All Vehicles

**Endpoint**: `GET /api/vehicles/`

**Response**: Similar structure to Starships but with `vehicle_class` instead of `starship_class`

#### Get Single Vehicle

**Endpoint**: `GET /api/vehicles/{id}/`

**Cache Strategy**: Cache for 7 days

---

## Client Implementation

### SWAPI Service Module

```javascript
// src/services/swapi.js

const BASE_URL = "https://swapi.dev/api";
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const MAX_CONCURRENT_REQUESTS = 5;

class SwapiService {
  constructor() {
    this.cache = new Map();
    this.pendingRequests = new Map();
    this.requestQueue = [];
    this.activeRequests = 0;
  }

  /**
   * Fetch data from SWAPI with caching
   * @param {string} url - Full SWAPI URL or relative path
   * @returns {Promise<Object>}
   */
  async fetch(url) {
    const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

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
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    this.activeRequests++;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `SWAPI error: ${response.status} ${response.statusText}`
        );
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
    return this._fetchAllPages("/people/");
  }

  /**
   * Get all planets with pagination
   */
  async getAllPlanets() {
    return this._fetchAllPages("/planets/");
  }

  /**
   * Get all starships with pagination
   */
  async getAllStarships() {
    return this._fetchAllPages("/starships/");
  }

  /**
   * Get all species
   */
  async getAllSpecies() {
    return this._fetchAllPages("/species/");
  }

  /**
   * Get all films
   */
  async getAllFilms() {
    return this._fetchAllPages("/films/");
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
    return Promise.all(urls.map((url) => this.resolve(url)));
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
      url,
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
      localStorage.setItem("swapi_cache", JSON.stringify(cacheData));
    } catch (error) {
      console.warn("Failed to persist cache:", error);
    }
  }

  /**
   * Load cache from localStorage
   */
  loadCache() {
    try {
      const cacheData = localStorage.getItem("swapi_cache");
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
      console.warn("Failed to load cache:", error);
    }
  }

  /**
   * Clear all cached data
   */
  clearCache() {
    this.cache.clear();
    localStorage.removeItem("swapi_cache");
  }
}

// Export singleton instance
export const swapiService = new SwapiService();
```

---

## Error Handling

### Error Types

| Error         | HTTP Status | Handling                                            |
| ------------- | ----------- | --------------------------------------------------- |
| Network Error | N/A         | Show cached data + "Offline" banner                 |
| Not Found     | 404         | Show "Entity not found" message                     |
| Server Error  | 500+        | Show "Service unavailable, try again later"         |
| Timeout       | N/A         | Show "Request timed out, try again"                 |
| Rate Limit    | 429         | Implement exponential backoff (unlikely with SWAPI) |

### Error Recovery

1. **Automatic Retry**: Retry failed requests up to 3 times with exponential backoff (1s, 2s, 4s)
2. **Cached Fallback**: Always attempt to show cached data on errors
3. **User Notification**: Display non-intrusive error messages
4. **Manual Retry**: Provide "Retry" button for failed requests

---

## Caching Strategy

### Cache Levels

1. **In-Memory Cache**: `Map` object for instant access during session
2. **LocalStorage Cache**: Persisted across sessions (7-day TTL)
3. **Service Worker Cache** (Optional): For offline PWA capabilities

### Cache Keys

Format: `swapi:{resource}:{id}` or raw URL

Examples:

- `https://swapi.dev/api/people/1/`
- `https://swapi.dev/api/planets/3/`

### Cache Invalidation

- **Time-based**: Expire after 7 days
- **Manual**: User-triggered cache clear
- **Storage limit**: LRU eviction if localStorage exceeds 4MB

### Cache Warming

On app load, pre-fetch critical data:

```javascript
async function warmCache() {
  await Promise.all([
    swapiService.getAllFilms(), // Small dataset (6 films)
    swapiService.getAllSpecies(), // Medium dataset (37 species)
    // People, planets, starships loaded on-demand
  ]);
}
```

---

## Performance Considerations

### Request Batching

When resolving related entities, batch requests:

```javascript
// Bad: Sequential requests
for (const url of character.films) {
  await swapiService.resolve(url);
}

// Good: Parallel requests
await Promise.all(character.films.map((url) => swapiService.resolve(url)));
```

### Debouncing

Search queries debounced at 500ms:

```javascript
const debouncedSearch = useDebounce(searchQuery, 500);
```

### Lazy Loading

- Load character details only when card is clicked
- Load planet 3D view only when planet page is opened
- Paginate large lists (show 20 items, load more on scroll)

---

## Testing Strategy

### Mock Responses

Use Mock Service Worker (MSW) for testing:

```javascript
// tests/mocks/swapi.js
import { rest } from "msw";

export const handlers = [
  rest.get("https://swapi.dev/api/people/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        name: "Luke Skywalker",
        // ... mock data
      })
    );
  }),
];
```

### Test Scenarios

1. **Successful Fetch**: Verify data returned correctly
2. **Cache Hit**: Verify cached data used, no network request
3. **Network Error**: Verify error handling and cached fallback
4. **Pagination**: Verify all pages fetched correctly
5. **Concurrent Requests**: Verify request queuing works
6. **Cache Expiration**: Verify expired cache triggers refetch

---

## Summary

✅ **Endpoints**: 6 main resources (people, planets, starships, species, films, vehicles)  
✅ **Caching**: 7-day TTL with localStorage persistence  
✅ **Error Handling**: Graceful degradation with cached fallbacks  
✅ **Performance**: Request queuing, debouncing, parallel resolution  
✅ **Testing**: MSW for mocked API responses

Next: quickstart.md with development setup instructions.
