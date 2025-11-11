import React, { useState, useEffect } from 'react';
import swapiService from '../services/swapi';
import { formatNumber } from '../utils/formatters';

function StarshipCard({ starship, onClick }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Extract ID from URL and try to load image
    const id = starship.url.match(/\/(\d+)\/$/)?.[1];
    if (id) {
      const imgUrl = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
      
      // Test if image exists
      const img = new Image();
      img.onload = () => {
        setImageUrl(imgUrl);
        setImageLoaded(true);
      };
      img.onerror = () => {
        setImageUrl(null);
        setImageLoaded(false);
      };
      img.src = imgUrl;
    }
  }, [starship.url]);

  return (
    <div
      className="holo-card fade-in-glow"
      onClick={() => onClick(starship)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(starship);
        }
      }}
      aria-label={`View details for ${starship.name}`}
      style={{
        cursor: 'pointer',
        transition: 'var(--holo-transition)'
      }}
    >
      {/* Only show image if it exists */}
      {imageLoaded && imageUrl && (
        <div style={{
          width: '100%',
          height: '200px',
          borderRadius: '8px',
          marginBottom: 'var(--spacing-md)',
          overflow: 'hidden',
          border: '1px solid var(--holo-border)'
        }}>
          <img
            src={imageUrl}
            alt={starship.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            loading="lazy"
          />
        </div>
      )}

      <h3 className="holo-accent" style={{
        fontSize: 'var(--font-size-lg)',
        marginBottom: 'var(--spacing-sm)',
        marginTop: imageLoaded ? 0 : 'var(--spacing-md)'
      }}>
        {starship.name}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
        <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)' }}>
          <strong>Model:</strong> {starship.model || 'Unknown'}
        </p>
        <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)' }}>
          <strong>Manufacturer:</strong> {starship.manufacturer || 'Unknown'}
        </p>
        <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)' }}>
          <strong>Class:</strong> {starship.starship_class || 'Unknown'}
        </p>
      </div>

      <div style={{
        marginTop: 'var(--spacing-md)',
        paddingTop: 'var(--spacing-sm)',
        borderTop: '1px solid var(--holo-border)',
        fontSize: 'var(--font-size-sm)',
        color: 'var(--holo-accent)',
        textAlign: 'center'
      }}>
        Click to view details →
      </div>
    </div>
  );
}

function StarshipDetail({ starship, onClose }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const id = starship.url.match(/\/(\d+)\/$/)?.[1];
    if (id) {
      const imgUrl = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
      
      const img = new Image();
      img.onload = () => {
        setImageUrl(imgUrl);
        setImageLoaded(true);
      };
      img.onerror = () => {
        setImageUrl(null);
        setImageLoaded(false);
      };
      img.src = imgUrl;
    }
  }, [starship.url]);

  return (
    <div className="starship-detail-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 'var(--spacing-lg)',
      overflow: 'auto'
    }}>
      <div className="holo-card scale-in" style={{
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          className="holo-button"
          style={{
            position: 'absolute',
            top: 'var(--spacing-md)',
            right: 'var(--spacing-md)',
            padding: '0.5rem 1rem',
            zIndex: 10
          }}
          aria-label="Close starship details"
        >
          ✕ Close
        </button>

        {/* Starship Header */}
        <div style={{
          marginBottom: 'var(--spacing-xl)'
        }}>
          {imageLoaded && imageUrl && (
            <div style={{
              width: '100%',
              maxHeight: '300px',
              marginBottom: 'var(--spacing-lg)',
              overflow: 'hidden',
              borderRadius: '8px',
              border: '2px solid var(--holo-border)',
              boxShadow: 'var(--holo-glow)'
            }}>
              <img
                src={imageUrl}
                alt={starship.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}

          <h2 className="holo-accent" style={{
            fontSize: 'var(--font-size-2xl)',
            marginBottom: 'var(--spacing-sm)',
            textAlign: 'center'
          }}>
            {starship.name}
          </h2>
          <p className="holo-text" style={{
            fontSize: 'var(--font-size-lg)',
            opacity: 0.8,
            marginBottom: 'var(--spacing-xs)',
            textAlign: 'center'
          }}>
            {starship.model}
          </p>
          <p className="holo-text" style={{ 
            fontSize: 'var(--font-size-sm)',
            textAlign: 'center'
          }}>
            <strong className="holo-accent">{starship.starship_class}</strong>
          </p>
        </div>

        <div className="holo-divider"></div>

        {/* Starship Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--spacing-xl)',
          marginTop: 'var(--spacing-xl)'
        }}>
          <div>
            <h3 className="holo-accent" style={{
              marginBottom: 'var(--spacing-sm)',
              fontSize: 'var(--font-size-lg)'
            }}>
              Specifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Manufacturer:</span> <strong>{starship.manufacturer || 'Unknown'}</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Cost:</span> <strong>{formatNumber(starship.cost_in_credits)} credits</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Length:</span> <strong>{formatNumber(starship.length)} m</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Max Speed:</span> <strong>{formatNumber(starship.max_atmosphering_speed)} km/h</strong>
              </p>
            </div>
          </div>

          <div>
            <h3 className="holo-accent" style={{
              marginBottom: 'var(--spacing-sm)',
              fontSize: 'var(--font-size-lg)'
            }}>
              Capacity
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Crew:</span> <strong>{formatNumber(starship.crew)}</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Passengers:</span> <strong>{formatNumber(starship.passengers)}</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Cargo Capacity:</span> <strong>{formatNumber(starship.cargo_capacity)} kg</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Consumables:</span> <strong>{starship.consumables || 'Unknown'}</strong>
              </p>
            </div>
          </div>

          <div>
            <h3 className="holo-accent" style={{
              marginBottom: 'var(--spacing-sm)',
              fontSize: 'var(--font-size-lg)'
            }}>
              Performance
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Hyperdrive Rating:</span> <strong>{starship.hyperdrive_rating || 'N/A'}</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>MGLT:</span> <strong>{starship.MGLT || 'Unknown'}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Starships() {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStarship, setSelectedStarship] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    loadStarships();
  }, []);

  async function loadStarships() {
    setLoading(true);
    setError(null);
    
    try {
      const data = await swapiService.getAllStarships();
      setStarships(data);
    } catch (err) {
      setError(err.message || 'Failed to load starships');
      console.error('Error loading starships:', err);
    } finally {
      setLoading(false);
    }
  }

  // Filter starships
  const filteredStarships = starships.filter(starship =>
    starship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    starship.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    starship.starship_class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredStarships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStarships = filteredStarships.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (loading) {
    return (
      <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
        <div className="holo-card">
          <div className="pulse-glow" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>
            🚀
          </div>
          <h2 className="holo-accent">Loading Starships...</h2>
          <p className="holo-text">Accessing galactic database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
        <div className="holo-card">
          <h2 className="holo-accent" style={{ color: 'var(--holo-error)' }}>Error Loading Starships</h2>
          <p className="holo-text">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 'var(--spacing-xl)' }}>
      <h2 className="holo-accent" style={{
        fontSize: 'var(--font-size-3xl)',
        marginBottom: 'var(--spacing-md)',
        textAlign: 'center'
      }}>
        Star Wars Starships
      </h2>

      <p className="holo-text" style={{
        textAlign: 'center',
        marginBottom: 'var(--spacing-xl)',
        opacity: 0.8
      }}>
        Explore {starships.length} iconic starships from the Star Wars universe
      </p>

      {/* Search */}
      <div style={{ marginBottom: 'var(--spacing-xl)', maxWidth: '600px', margin: '0 auto var(--spacing-xl)' }}>
        <input
          type="text"
          placeholder="Search starships by name, model, or class..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="holo-input"
          style={{ width: '100%', fontSize: 'var(--font-size-md)' }}
        />
      </div>

      {/* Results Count */}
      <p className="holo-text" style={{
        textAlign: 'center',
        marginBottom: 'var(--spacing-lg)',
        fontSize: 'var(--font-size-sm)'
      }}>
        Showing {startIndex + 1}-{Math.min(endIndex, filteredStarships.length)} of {filteredStarships.length} {filteredStarships.length === 1 ? 'starship' : 'starships'}
      </p>

      {/* Starships Grid */}
      {currentStarships.length > 0 ? (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'var(--spacing-lg)',
            marginBottom: 'var(--spacing-xl)'
          }}>
            {currentStarships.map(starship => (
              <StarshipCard
                key={starship.url}
                starship={starship}
                onClick={setSelectedStarship}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              marginTop: 'var(--spacing-xl)'
            }}>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="holo-button"
                style={{
                  opacity: currentPage === 1 ? 0.5 : 1,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                ← Previous
              </button>

              <span className="holo-text">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="holo-button"
                style={{
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                Next →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="holo-card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
          <p className="holo-text" style={{ fontSize: 'var(--font-size-lg)' }}>
            No starships found matching "{searchQuery}"
          </p>
        </div>
      )}

      {/* Starship Detail Modal */}
      {selectedStarship && (
        <StarshipDetail
          starship={selectedStarship}
          onClose={() => setSelectedStarship(null)}
        />
      )}
    </div>
  );
}

export default Starships;
