import React, { useState } from 'react';
import swapiService from '../../services/swapi';

function FilterPanel({ 
  species = [], 
  films = [], 
  planets = [],
  activeFilters = {},
  onFilterChange,
  onClearAll,
  isSidebar = false
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const extractId = (url) => swapiService.extractId(url);

  const handleSpeciesChange = (speciesUrl) => {
    const speciesId = extractId(speciesUrl);
    onFilterChange('species', speciesId);
  };

  const handleFilmChange = (filmUrl) => {
    const filmId = extractId(filmUrl);
    onFilterChange('films', filmId);
  };

  const handlePlanetChange = (e) => {
    const planetId = e.target.value;
    onFilterChange('homeworld', planetId || null);
  };

  const hasActiveFilters = activeFilters.species?.length > 0 || 
                          activeFilters.films?.length > 0 || 
                          activeFilters.homeworld;

  const sidebarStyle = isSidebar ? {
    position: 'sticky',
    top: 'var(--spacing-lg)',
    maxHeight: 'calc(100vh - 2rem)',
    overflowY: 'auto'
  } : {};

  return (
    <div className="filter-panel holo-card" style={sidebarStyle}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 'var(--spacing-md)'
      }}>
        <h3 className="holo-accent" style={{ fontSize: 'var(--font-size-lg)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🎛️</span> Filters
          {isSidebar && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="holo-button"
              style={{ 
                padding: '0.25rem 0.5rem', 
                fontSize: 'var(--font-size-sm)',
                marginLeft: 'auto'
              }}
            >
              {isExpanded ? '−' : '+'}
            </button>
          )}
        </h3>
        {hasActiveFilters && (
          <button 
            onClick={onClearAll} 
            className="holo-button" 
            style={{ 
              fontSize: 'var(--font-size-sm)',
              padding: '0.25rem 0.5rem'
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {(!isSidebar || isExpanded) && (
        <>
          <div className="holo-divider" style={{ margin: 'var(--spacing-sm) 0' }}></div>

          {/* Species Filter */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label className="holo-text" style={{ 
              display: 'block', 
              marginBottom: 'var(--spacing-sm)', 
              fontWeight: 600,
              fontSize: 'var(--font-size-sm)'
            }}>
              Species
            </label>
            <div style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: 'var(--spacing-xs)' }}>
              {species.slice(0, 15).map(s => (
                <label 
                  key={s.url} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: 'var(--spacing-xs)', 
                    cursor: 'pointer',
                    padding: '0.25rem',
                    borderRadius: '4px',
                    transition: 'var(--holo-transition)'
                  }}
                  className="filter-option"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.species?.includes(extractId(s.url)) || false}
                    onChange={() => handleSpeciesChange(s.url)}
                    style={{ marginRight: 'var(--spacing-sm)' }}
                  />
                  <span className="holo-text" style={{ fontSize: 'var(--font-size-sm)' }}>
                    {s.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="holo-divider" style={{ margin: 'var(--spacing-sm) 0' }}></div>

          {/* Films Filter */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label className="holo-text" style={{ 
              display: 'block', 
              marginBottom: 'var(--spacing-sm)', 
              fontWeight: 600,
              fontSize: 'var(--font-size-sm)'
            }}>
              Films
            </label>
            <div>
              {films.map(f => (
                <label 
                  key={f.url} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: 'var(--spacing-xs)', 
                    cursor: 'pointer',
                    padding: '0.25rem',
                    borderRadius: '4px',
                    transition: 'var(--holo-transition)'
                  }}
                  className="filter-option"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.films?.includes(extractId(f.url)) || false}
                    onChange={() => handleFilmChange(f.url)}
                    style={{ marginRight: 'var(--spacing-sm)' }}
                  />
                  <span className="holo-text" style={{ fontSize: 'var(--font-size-sm)' }}>
                    {f.title}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="holo-divider" style={{ margin: 'var(--spacing-sm) 0' }}></div>

          {/* Planet Filter */}
          <div>
            <label className="holo-text" style={{ 
              display: 'block', 
              marginBottom: 'var(--spacing-sm)', 
              fontWeight: 600,
              fontSize: 'var(--font-size-sm)'
            }}>
              Homeworld
            </label>
            <select
              value={activeFilters.homeworld || ''}
              onChange={handlePlanetChange}
              className="holo-input"
              style={{ width: '100%', cursor: 'pointer', fontSize: 'var(--font-size-sm)' }}
            >
              <option value="">All Planets</option>
              {planets.slice(0, 30).map(p => (
                <option key={p.url} value={extractId(p.url)}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <style>{`
        .filter-option:hover {
          background: rgba(0, 243, 255, 0.1);
        }
      `}</style>
    </div>
  );
}

export default FilterPanel;
