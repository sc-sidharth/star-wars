# Data Model

**Feature**: Star Wars 3D Interactive Encyclopedia  
**Date**: November 3, 2025  
**Phase**: 1 - Design

## Overview

This document defines the data structures for the Star Wars Encyclopedia. All entities are derived from the SWAPI response format and extended with client-side metadata for caching, UI state, and 3D rendering.

---

## Core Entities

### 1. Character (Person)

Represents a character from the Star Wars universe.

**Source**: SWAPI `/api/people/`

**Fields**:

| Field        | Type              | Required | Description                            | Example                                 |
| ------------ | ----------------- | -------- | -------------------------------------- | --------------------------------------- |
| `id`         | string            | Yes      | Unique identifier (extracted from URL) | "1"                                     |
| `name`       | string            | Yes      | Character's full name                  | "Luke Skywalker"                        |
| `height`     | string            | Yes      | Height in centimeters                  | "172"                                   |
| `mass`       | string            | Yes      | Weight in kilograms                    | "77"                                    |
| `hair_color` | string            | Yes      | Hair color                             | "blond"                                 |
| `skin_color` | string            | Yes      | Skin color                             | "fair"                                  |
| `eye_color`  | string            | Yes      | Eye color                              | "blue"                                  |
| `birth_year` | string            | Yes      | Birth year in BBY/ABY format           | "19BBY"                                 |
| `gender`     | string            | Yes      | Gender                                 | "male", "female", "n/a"                 |
| `homeworld`  | string (URL)      | Yes      | Reference to home planet               | "https://swapi.dev/api/planets/1/"      |
| `films`      | string[] (URLs)   | Yes      | Films character appeared in            | ["https://swapi.dev/api/films/1/", ...] |
| `species`    | string[] (URLs)   | Yes      | Species references                     | ["https://swapi.dev/api/species/1/"]    |
| `vehicles`   | string[] (URLs)   | Yes      | Vehicles piloted                       | ["https://swapi.dev/api/vehicles/14/"]  |
| `starships`  | string[] (URLs)   | Yes      | Starships piloted                      | ["https://swapi.dev/api/starships/12/"] |
| `created`    | string (ISO 8601) | Yes      | API record creation date               | "2014-12-09T13:50:51.644000Z"           |
| `edited`     | string (ISO 8601) | Yes      | API record last edit date              | "2014-12-20T21:17:56.891000Z"           |
| `url`        | string (URL)      | Yes      | API endpoint for this resource         | "https://swapi.dev/api/people/1/"       |

**Client Extensions**:

| Field           | Type      | Description                             |
| --------------- | --------- | --------------------------------------- |
| `homeworldData` | Planet    | Resolved homeworld object (lazy loaded) |
| `speciesData`   | Species[] | Resolved species objects (lazy loaded)  |
| `filmsData`     | Film[]    | Resolved film objects (lazy loaded)     |
| `cachedAt`      | number    | Timestamp when cached (for expiration)  |
| `isFavorite`    | boolean   | User favorite status (localStorage)     |

**Validation Rules**:

- `name` must not be empty
- `height` and `mass` should be numeric or "unknown"
- `birth_year` format: digits + "BBY" or "ABY" or "unknown"
- URLs must match SWAPI domain pattern

**Relationships**:

- Many-to-One: Character → Planet (homeworld)
- Many-to-Many: Character ↔ Species
- Many-to-Many: Character ↔ Film
- Many-to-Many: Character ↔ Vehicle
- Many-to-Many: Character ↔ Starship

---

### 2. Planet

Represents a planet or celestial body in the Star Wars universe.

**Source**: SWAPI `/api/planets/`

**Fields**:

| Field             | Type              | Required | Description                  | Example                                  |
| ----------------- | ----------------- | -------- | ---------------------------- | ---------------------------------------- |
| `id`              | string            | Yes      | Unique identifier            | "1"                                      |
| `name`            | string            | Yes      | Planet name                  | "Tatooine"                               |
| `rotation_period` | string            | Yes      | Hours per day                | "23"                                     |
| `orbital_period`  | string            | Yes      | Days per year                | "304"                                    |
| `diameter`        | string            | Yes      | Diameter in kilometers       | "10465"                                  |
| `climate`         | string            | Yes      | Climate description          | "arid"                                   |
| `gravity`         | string            | Yes      | Gravity relative to standard | "1 standard"                             |
| `terrain`         | string            | Yes      | Terrain types                | "desert"                                 |
| `surface_water`   | string            | Yes      | Percentage of surface water  | "1"                                      |
| `population`      | string            | Yes      | Population count             | "200000"                                 |
| `residents`       | string[] (URLs)   | Yes      | Characters from this planet  | ["https://swapi.dev/api/people/1/", ...] |
| `films`           | string[] (URLs)   | Yes      | Films featuring this planet  | ["https://swapi.dev/api/films/1/", ...]  |
| `created`         | string (ISO 8601) | Yes      | API record creation date     | "2014-12-09T13:50:49.641000Z"            |
| `edited`          | string (ISO 8601) | Yes      | API record last edit date    | "2014-12-20T20:58:18.411000Z"            |
| `url`             | string (URL)      | Yes      | API endpoint                 | "https://swapi.dev/api/planets/1/"       |

**Client Extensions**:

| Field           | Type   | Description                                |
| --------------- | ------ | ------------------------------------------ |
| `residentCount` | number | Computed count of residents                |
| `filmsData`     | Film[] | Resolved film objects                      |
| `texture`       | string | Path to planet texture for 3D rendering    |
| `color`         | string | Hex color for procedural planet generation |
| `cachedAt`      | number | Cache timestamp                            |
| `render3D`      | object | 3D rendering metadata (see below)          |

**3D Rendering Metadata** (`render3D` field):

| Field               | Type   | Description                      |
| ------------------- | ------ | -------------------------------- |
| `radius`            | number | Sphere radius for 3D model       |
| `segments`          | number | Sphere geometry segments (32-64) |
| `textureUrl`        | string | URL to texture image             |
| `emissiveColor`     | string | Hex color for glow effect        |
| `emissiveIntensity` | number | Glow intensity (0-1)             |
| `rotationSpeed`     | number | Auto-rotation speed              |

**Validation Rules**:

- `name` must not be empty
- Numeric fields should be positive integers or "unknown"
- `terrain` can be comma-separated list
- `gravity` format: number + "standard" or "unknown"

**Relationships**:

- One-to-Many: Planet → Character (residents)
- Many-to-Many: Planet ↔ Film

---

### 3. Starship

Represents a spacecraft in the Star Wars universe.

**Source**: SWAPI `/api/starships/`

**Fields**:

| Field                    | Type              | Required | Description                   | Example                                    |
| ------------------------ | ----------------- | -------- | ----------------------------- | ------------------------------------------ |
| `id`                     | string            | Yes      | Unique identifier             | "9"                                        |
| `name`                   | string            | Yes      | Starship name                 | "Death Star"                               |
| `model`                  | string            | Yes      | Model/class name              | "DS-1 Orbital Battle Station"              |
| `manufacturer`           | string            | Yes      | Manufacturer                  | "Imperial Department of Military Research" |
| `cost_in_credits`        | string            | Yes      | Cost in galactic credits      | "1000000000000"                            |
| `length`                 | string            | Yes      | Length in meters              | "120000"                                   |
| `max_atmosphering_speed` | string            | Yes      | Max speed in atmosphere       | "n/a"                                      |
| `crew`                   | string            | Yes      | Required crew                 | "342,953"                                  |
| `passengers`             | string            | Yes      | Passenger capacity            | "843,342"                                  |
| `cargo_capacity`         | string            | Yes      | Cargo capacity in kg          | "1000000000000"                            |
| `consumables`            | string            | Yes      | Duration of consumables       | "3 years"                                  |
| `hyperdrive_rating`      | string            | Yes      | Hyperdrive class rating       | "4.0"                                      |
| `MGLT`                   | string            | Yes      | Speed in Megalights           | "10"                                       |
| `starship_class`         | string            | Yes      | Classification                | "Deep Space Mobile Battlestation"          |
| `pilots`                 | string[] (URLs)   | Yes      | Pilot references              | []                                         |
| `films`                  | string[] (URLs)   | Yes      | Films featuring this starship | ["https://swapi.dev/api/films/1/"]         |
| `created`                | string (ISO 8601) | Yes      | API record creation date      | "2014-12-10T16:36:50.509000Z"              |
| `edited`                 | string (ISO 8601) | Yes      | API record last edit date     | "2014-12-20T21:26:24.783000Z"              |
| `url`                    | string (URL)      | Yes      | API endpoint                  | "https://swapi.dev/api/starships/9/"       |

**Client Extensions**:

| Field        | Type        | Description            |
| ------------ | ----------- | ---------------------- |
| `pilotsData` | Character[] | Resolved pilot objects |
| `filmsData`  | Film[]      | Resolved film objects  |
| `cachedAt`   | number      | Cache timestamp        |
| `icon`       | string      | Icon/image path for UI |

**Validation Rules**:

- `name` must not be empty
- Numeric fields should be positive or "unknown"/"n/a"
- `hyperdrive_rating` should be numeric (lower is better)
- `consumables` format: number + unit (days, weeks, months, years)

**Relationships**:

- Many-to-Many: Starship ↔ Character (pilots)
- Many-to-Many: Starship ↔ Film

---

### 4. Species

Represents a species in the Star Wars universe.

**Source**: SWAPI `/api/species/`

**Fields**:

| Field              | Type              | Required | Description                  | Example                                   |
| ------------------ | ----------------- | -------- | ---------------------------- | ----------------------------------------- |
| `id`               | string            | Yes      | Unique identifier            | "1"                                       |
| `name`             | string            | Yes      | Species name                 | "Human"                                   |
| `classification`   | string            | Yes      | Biological classification    | "mammal"                                  |
| `designation`      | string            | Yes      | Sentience designation        | "sentient"                                |
| `average_height`   | string            | Yes      | Average height in cm         | "180"                                     |
| `skin_colors`      | string            | Yes      | Common skin colors           | "caucasian, black, asian, hispanic"       |
| `hair_colors`      | string            | Yes      | Common hair colors           | "blonde, brown, black, red"               |
| `eye_colors`       | string            | Yes      | Common eye colors            | "brown, blue, green, hazel, grey, amber"  |
| `average_lifespan` | string            | Yes      | Average lifespan in years    | "120"                                     |
| `homeworld`        | string (URL)      | No       | Home planet reference        | "https://swapi.dev/api/planets/9/"        |
| `language`         | string            | Yes      | Primary language             | "Galactic Basic"                          |
| `people`           | string[] (URLs)   | Yes      | Characters of this species   | ["https://swapi.dev/api/people/66/", ...] |
| `films`            | string[] (URLs)   | Yes      | Films featuring this species | ["https://swapi.dev/api/films/1/", ...]   |
| `created`          | string (ISO 8601) | Yes      | API record creation date     | "2014-12-10T13:52:11.567000Z"             |
| `edited`           | string (ISO 8601) | Yes      | API record last edit date    | "2014-12-20T21:36:42.136000Z"             |
| `url`              | string (URL)      | Yes      | API endpoint                 | "https://swapi.dev/api/species/1/"        |

**Client Extensions**:

| Field           | Type   | Description               |
| --------------- | ------ | ------------------------- |
| `homeworldData` | Planet | Resolved homeworld        |
| `peopleCount`   | number | Count of known characters |
| `cachedAt`      | number | Cache timestamp           |

**Validation Rules**:

- `name` must not be empty
- Color fields can be comma-separated lists
- `average_height` and `average_lifespan` should be numeric or "unknown"/"indefinite"

**Relationships**:

- Many-to-One: Species → Planet (homeworld, optional)
- One-to-Many: Species → Character (people)
- Many-to-Many: Species ↔ Film

---

### 5. Film

Represents a Star Wars film.

**Source**: SWAPI `/api/films/`

**Fields**:

| Field           | Type                | Required | Description               | Example                                     |
| --------------- | ------------------- | -------- | ------------------------- | ------------------------------------------- |
| `id`            | string              | Yes      | Unique identifier         | "1"                                         |
| `title`         | string              | Yes      | Film title                | "A New Hope"                                |
| `episode_id`    | number              | Yes      | Episode number            | 4                                           |
| `opening_crawl` | string              | Yes      | Opening crawl text        | "It is a period of civil war..."            |
| `director`      | string              | Yes      | Director name             | "George Lucas"                              |
| `producer`      | string              | Yes      | Producer(s)               | "Gary Kurtz, Rick McCallum"                 |
| `release_date`  | string (YYYY-MM-DD) | Yes      | Release date              | "1977-05-25"                                |
| `characters`    | string[] (URLs)     | Yes      | Characters in film        | ["https://swapi.dev/api/people/1/", ...]    |
| `planets`       | string[] (URLs)     | Yes      | Planets in film           | ["https://swapi.dev/api/planets/1/", ...]   |
| `starships`     | string[] (URLs)     | Yes      | Starships in film         | ["https://swapi.dev/api/starships/2/", ...] |
| `vehicles`      | string[] (URLs)     | Yes      | Vehicles in film          | ["https://swapi.dev/api/vehicles/4/", ...]  |
| `species`       | string[] (URLs)     | Yes      | Species in film           | ["https://swapi.dev/api/species/1/", ...]   |
| `created`       | string (ISO 8601)   | Yes      | API record creation date  | "2014-12-10T14:23:31.880000Z"               |
| `edited`        | string (ISO 8601)   | Yes      | API record last edit date | "2014-12-20T19:49:45.256000Z"               |
| `url`           | string (URL)        | Yes      | API endpoint              | "https://swapi.dev/api/films/1/"            |

**Client Extensions**:

| Field      | Type   | Description                 |
| ---------- | ------ | --------------------------- |
| `cachedAt` | number | Cache timestamp             |
| `poster`   | string | Poster image URL (external) |

**Validation Rules**:

- `title` must not be empty
- `episode_id` should be 1-9
- `release_date` must be valid ISO date
- `opening_crawl` must be non-empty

**Relationships**:

- Many-to-Many: Film ↔ Character
- Many-to-Many: Film ↔ Planet
- Many-to-Many: Film ↔ Starship
- Many-to-Many: Film ↔ Vehicle
- Many-to-Many: Film ↔ Species

---

### 6. Vehicle

Represents a vehicle (non-starship) in the Star Wars universe.

**Source**: SWAPI `/api/vehicles/`

**Fields**: Similar to Starship but without hyperdrive/MGLT fields

| Field                      | Type            | Required | Description             |
| -------------------------- | --------------- | -------- | ----------------------- |
| `id`                       | string          | Yes      | Unique identifier       |
| `name`                     | string          | Yes      | Vehicle name            |
| `model`                    | string          | Yes      | Model designation       |
| `manufacturer`             | string          | Yes      | Manufacturer            |
| `cost_in_credits`          | string          | Yes      | Cost                    |
| `length`                   | string          | Yes      | Length in meters        |
| `max_atmosphering_speed`   | string          | Yes      | Max speed               |
| `crew`                     | string          | Yes      | Required crew           |
| `passengers`               | string          | Yes      | Passenger capacity      |
| `cargo_capacity`           | string          | Yes      | Cargo capacity          |
| `consumables`              | string          | Yes      | Consumables duration    |
| `vehicle_class`            | string          | Yes      | Vehicle classification  |
| `pilots`                   | string[] (URLs) | Yes      | Pilot references        |
| `films`                    | string[] (URLs) | Yes      | Films featuring vehicle |
| `created`, `edited`, `url` | strings         | Yes      | API metadata            |

---

## Support Structures

### Cache Entry

Wraps any entity for localStorage caching.

```typescript
interface CacheEntry<T> {
  data: T;
  cachedAt: number; // Unix timestamp
  expiresAt: number; // Unix timestamp (cachedAt + TTL)
  url: string; // Original SWAPI URL
}
```

### Paginated Response

SWAPI pagination wrapper.

```typescript
interface PaginatedResponse<T> {
  count: number; // Total count
  next: string | null; // Next page URL
  previous: string | null; // Previous page URL
  results: T[]; // Array of entities
}
```

### Search/Filter State

Client-side filter state.

```typescript
interface FilterState {
  search: string; // Search query
  species: string[]; // Species IDs
  films: string[]; // Film IDs
  homeworld: string | null; // Planet ID
  gender: string | null; // Gender value
  starshipClass: string | null; // Starship class
}
```

### UI State

Global UI state.

```typescript
interface UIState {
  loading: boolean;
  error: string | null;
  selectedCharacter: string | null; // Character ID
  selectedPlanet: string | null; // Planet ID
  selectedStarship: string | null; // Starship ID
  view3DEnabled: boolean; // 3D viewer active
  sidebarOpen: boolean;
}
```

---

## Data Flow

### 1. Initial Load

```
App Start → Check Cache → Cache Valid?
  → Yes: Load from localStorage
  → No: Fetch from SWAPI → Cache Response → Render
```

### 2. Entity Resolution

```
Character with homeworld URL → Check Cache
  → Cached: Return immediately
  → Not cached: Fetch → Cache → Return
```

### 3. Search Flow

```
User Types → Debounce (500ms) → Filter in Memory → Update Results
```

### 4. Filter Flow

```
User Selects Filter → Update URL Params → Filter in Memory → Update Results
```

---

## Indexing Strategy

For fast lookups, create in-memory indexes:

```javascript
{
  charactersById: Map<string, Character>,
  planetsByName: Map<string, Planet>,
  filmsByEpisode: Map<number, Film>,
  speciesByName: Map<string, Species>,
  starshipsByClass: Map<string, Starship[]>
}
```

---

## Summary

- **6 core entities** from SWAPI (Character, Planet, Starship, Species, Film, Vehicle)
- **Client extensions** for caching, 3D rendering, and UI state
- **Relationships** resolved on-demand with caching
- **Validation rules** ensure data integrity
- **Indexing strategy** optimizes lookups

All entities follow SWAPI schema with minimal client-side augmentation. Next: API contracts.
