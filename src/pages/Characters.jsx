import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useFilters } from '../hooks/useFilters';
import LoadingScreen from '../components/layout/LoadingScreen';
import SearchBar from '../components/search/SearchBar';
import FilterPanel from '../components/search/FilterPanel';
import ResultsList from '../components/search/ResultsList';
import CharacterDetail from '../components/character/CharacterDetail';
import swapiService from '../services/swapi';

function Characters() {
  const { characters, species, films, planets, loading, error, imagesLoading } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { filters, setFilter, clearAllFilters, hasActiveFilters } = useFilters();

  // Filter characters based on search query and filters
  const filteredCharacters = useMemo(() => {
    let results = characters;

    // Apply search query
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      results = results.filter(character =>
        character.name.toLowerCase().includes(lowerQuery) ||
        character.birth_year.toLowerCase().includes(lowerQuery)
      );
    }

    // Apply species filter
    if (filters.species && filters.species.length > 0) {
      results = results.filter(character => {
        if (!character.species || character.species.length === 0) {
          // Characters with no species are considered human (species ID 1)
          return filters.species.includes('1');
        }
        return character.species.some(speciesUrl => {
          const speciesId = swapiService.extractId(speciesUrl);
          return filters.species.includes(speciesId);
        });
      });
    }

    // Apply films filter
    if (filters.films && filters.films.length > 0) {
      results = results.filter(character =>
        character.films.some(filmUrl => {
          const filmId = swapiService.extractId(filmUrl);
          return filters.films.includes(filmId);
        })
      );
    }

    // Apply homeworld filter
    if (filters.homeworld) {
      results = results.filter(character => {
        const homeworldId = swapiService.extractId(character.homeworld);
        return homeworldId === filters.homeworld;
      });
    }

    return results;
  }, [characters, searchQuery, filters]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <main className="app-main">
        <div className="holo-container">
          <div className="holo-card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
            <h2 className="holo-accent">Error Loading Data</h2>
            <p className="holo-text" style={{ marginTop: '1rem' }}>{error}</p>
            <p className="holo-text" style={{ marginTop: '0.5rem', fontSize: 'var(--font-size-sm)' }}>
              Please check your internet connection and try again.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="app-main">
      <div className="holo-container">
        <h2 className="holo-title" style={{ 
          fontSize: 'var(--font-size-2xl)', 
          marginBottom: 'var(--spacing-md)', 
          textAlign: 'center' 
        }}>
          Star Wars Characters
        </h2>

        <p className="holo-text" style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--spacing-xl)', 
          opacity: 0.8 
        }}>
          Search and filter through {characters.length} characters from the Star Wars universe
        </p>

        {/* Image Loading Indicator */}
        {imagesLoading && (
          <div className="holo-card" style={{
            marginBottom: 'var(--spacing-lg)',
            padding: 'var(--spacing-md)',
            textAlign: 'center',
            background: 'rgba(0, 243, 255, 0.05)',
            border: '1px solid var(--holo-accent)'
          }}>
            <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)', margin: 0 }}>
              <span className="pulse-glow" style={{ marginRight: 'var(--spacing-sm)' }}>⚡</span>
              Loading character images...
            </p>
          </div>
        )}

        {/* Search Bar - Full Width */}
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Search by name (e.g., 'Luke', 'Anakin Skywalker')..."
        />

        {/* Active Filters Display */}
        {hasActiveFilters() && (
          <div style={{ 
            marginBottom: 'var(--spacing-lg)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--spacing-sm)',
            alignItems: 'center'
          }}>
            <span className="holo-text" style={{ fontSize: 'var(--font-size-sm)' }}>
              Active Filters:
            </span>
            {filters.species?.map(speciesId => {
              const speciesItem = species.find(s => swapiService.extractId(s.url) === speciesId);
              return speciesItem ? (
                <span 
                  key={speciesId}
                  className="holo-card"
                  style={{ 
                    padding: '0.25rem 0.75rem',
                    fontSize: 'var(--font-size-sm)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {speciesItem.name}
                  <button 
                    onClick={() => setFilter('species', speciesId)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'var(--holo-accent)', 
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    ✕
                  </button>
                </span>
              ) : null;
            })}
            {filters.films?.map(filmId => {
              const film = films.find(f => swapiService.extractId(f.url) === filmId);
              return film ? (
                <span 
                  key={filmId}
                  className="holo-card"
                  style={{ 
                    padding: '0.25rem 0.75rem',
                    fontSize: 'var(--font-size-sm)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {film.title}
                  <button 
                    onClick={() => setFilter('films', filmId)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'var(--holo-accent)', 
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    ✕
                  </button>
                </span>
              ) : null;
            })}
            {filters.homeworld && (() => {
              const planet = planets.find(p => swapiService.extractId(p.url) === filters.homeworld);
              return planet ? (
                <span 
                  className="holo-card"
                  style={{ 
                    padding: '0.25rem 0.75rem',
                    fontSize: 'var(--font-size-sm)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {planet.name}
                  <button 
                    onClick={() => setFilter('homeworld', null)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'var(--holo-accent)', 
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    ✕
                  </button>
                </span>
              ) : null;
            })()}
          </div>
        )}

        {/* Sidebar Layout: Filters + Results */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: 'var(--spacing-xl)',
          alignItems: 'start'
        }}>
          {/* Left Sidebar - Filters */}
          <FilterPanel
            species={species}
            films={films}
            planets={planets}
            activeFilters={filters}
            onFilterChange={setFilter}
            onClearAll={clearAllFilters}
            isSidebar={true}
          />

          {/* Main Content - Results */}
          <div>
            <ResultsList
              characters={filteredCharacters}
              onCharacterClick={setSelectedCharacter}
              currentPage={currentPage}
              itemsPerPage={12}
              onPageChange={setCurrentPage}
              emptyMessage={
                searchQuery || hasActiveFilters()
                  ? "No characters match your search and filters"
                  : "No characters available"
              }
            />
          </div>
        </div>

        {selectedCharacter && (
          <CharacterDetail
            character={selectedCharacter}
            onClose={() => setSelectedCharacter(null)}
          />
        )}
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .app-main > .holo-container > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

export default Characters;
