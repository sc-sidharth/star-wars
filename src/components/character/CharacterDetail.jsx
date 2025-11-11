import React, { useState, useEffect } from 'react';
import swapiService from '../../services/swapi';
import { formatHeight, formatMass, formatList } from '../../utils/formatters';
import { getCharacterImageUrl, getCharacterAvatar } from '../../utils/imageHelpers';
import { useApp } from '../../context/AppContext';

function CharacterDetail({ character, onClose }) {
  const { imagesLoading } = useApp();
  const [homeworldData, setHomeworldData] = useState(null);
  const [speciesData, setSpeciesData] = useState([]);
  const [filmsData, setFilmsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageUrls, setImageUrls] = useState(null);

  useEffect(() => {
    loadRelatedData();
  }, [character]);

  useEffect(() => {
    const urls = getCharacterImageUrl(character.url, character.name);
    setImageUrls(urls);
    loadCharacterImage(urls);
  }, [character, imagesLoading]);

  async function loadRelatedData() {
    setLoading(true);
    try {
      const [homeworld, species, films] = await Promise.all([
        character.homeworld ? swapiService.resolve(character.homeworld) : null,
        swapiService.resolveMany(character.species),
        swapiService.resolveMany(character.films)
      ]);
      
      setHomeworldData(homeworld);
      setSpeciesData(species);
      setFilmsData(films);
    } catch (error) {
      console.error('Error loading related data:', error);
    } finally {
      setLoading(false);
    }
  }

  function loadCharacterImage(urls) {
    if (!urls) return;
    
    // Try primary source
    const img = new Image();
    img.onload = () => {
      setImageSrc(urls.primary);
      setImageLoaded(true);
    };
    img.onerror = () => {
      // Try fallback source if available
      if (urls.fallback) {
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          setImageSrc(urls.fallback);
          setImageLoaded(true);
        };
        fallbackImg.onerror = () => {
          // Both failed, use placeholder
          setImageLoaded(false);
        };
        fallbackImg.src = urls.fallback;
      } else {
        // No fallback, use placeholder
        setImageLoaded(false);
      }
    };
    img.src = urls.primary;
  }

  const avatar = getCharacterAvatar(character.name);

  return (
    <div className="character-detail-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
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
          aria-label="Close character details"
        >
          ✕ Close
        </button>

        {/* Character Header with Image */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 'var(--spacing-xl)',
          marginBottom: 'var(--spacing-xl)',
          alignItems: 'start'
        }}>
          {/* Character Image/Avatar */}
          <div style={{
            width: '200px',
            height: '280px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '2px solid var(--holo-border)',
            boxShadow: 'var(--holo-glow)',
            background: imageLoaded 
              ? 'var(--holo-bg-dark)' 
              : `linear-gradient(135deg, ${avatar.color}22 0%, ${avatar.color}44 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {imageLoaded && imageSrc ? (
              <img
                src={imageSrc}
                alt={character.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                loading="lazy"
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--spacing-md)'
              }}>
                {/* Large Initials Circle */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: avatar.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: 'var(--spacing-sm)',
                  boxShadow: `0 0 40px ${avatar.color}66, inset 0 0 30px rgba(255, 255, 255, 0.2)`,
                  border: '4px solid rgba(255, 255, 255, 0.3)'
                }}>
                  {avatar.initials}
                </div>
                
                <p className="holo-text" style={{
                  fontSize: 'var(--font-size-sm)',
                  textAlign: 'center',
                  opacity: 0.7
                }}>
                  {character.name}
                </p>
              </div>
            )}
          </div>

          {/* Character Name & Basic Info */}
          <div>
            <h2 className="holo-accent" style={{ 
              fontSize: 'var(--font-size-2xl)', 
              marginBottom: 'var(--spacing-sm)'
            }}>
              {character.name}
            </h2>
            <p className="holo-text" style={{ 
              fontSize: 'var(--font-size-lg)', 
              opacity: 0.8,
              marginBottom: 'var(--spacing-md)'
            }}>
              {character.birth_year} • {character.gender}
            </p>
            {loading ? (
              <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)' }}>
                Loading additional information...
              </p>
            ) : (
              <>
                {homeworldData && (
                  <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-xs)' }}>
                    🌍 From <strong className="holo-accent">{homeworldData.name}</strong>
                  </p>
                )}
                {speciesData.length > 0 ? (
                  <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)' }}>
                    🧬 Species: <strong className="holo-accent">{formatList(speciesData.map(s => s.name))}</strong>
                  </p>
                ) : (
                  <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)' }}>
                    🧬 Species: <strong className="holo-accent">Human</strong>
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="holo-divider"></div>

        {/* Physical Attributes & Background in Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: 'var(--spacing-xl)',
          marginBottom: 'var(--spacing-xl)'
        }}>
          <div>
            <h3 className="holo-accent" style={{ 
              marginBottom: 'var(--spacing-sm)',
              fontSize: 'var(--font-size-lg)'
            }}>
              Physical Attributes
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Height:</span> <strong>{formatHeight(character.height)}</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Mass:</span> <strong>{formatMass(character.mass)}</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Hair:</span> <strong>{character.hair_color}</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Skin:</span> <strong>{character.skin_color}</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Eyes:</span> <strong>{character.eye_color}</strong>
              </p>
            </div>
          </div>

          <div>
            <h3 className="holo-accent" style={{ 
              marginBottom: 'var(--spacing-sm)',
              fontSize: 'var(--font-size-lg)'
            }}>
              Background
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Birth Year:</span> <strong>{character.birth_year}</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Gender:</span> <strong>{character.gender}</strong>
              </p>
              {loading ? (
                <p className="holo-text">
                  <span style={{ opacity: 0.7 }}>Loading...</span>
                </p>
              ) : (
                <>
                  <p className="holo-text">
                    <span style={{ opacity: 0.7 }}>Homeworld:</span> <strong>{homeworldData?.name || 'Unknown'}</strong>
                  </p>
                  <p className="holo-text">
                    <span style={{ opacity: 0.7 }}>Species:</span> <strong>{speciesData.length > 0 ? formatList(speciesData.map(s => s.name)) : 'Human'}</strong>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="holo-divider"></div>

        {/* Film Appearances */}
        <div>
          <h3 className="holo-accent" style={{ 
            marginBottom: 'var(--spacing-sm)',
            fontSize: 'var(--font-size-lg)'
          }}>
            Film Appearances ({loading ? '...' : filmsData.length})
          </h3>
          {loading ? (
            <p className="holo-text">Loading films...</p>
          ) : filmsData.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 'var(--spacing-sm)'
            }}>
              {filmsData.map(film => (
                <div 
                  key={film.url} 
                  className="holo-card"
                  style={{ 
                    padding: 'var(--spacing-sm)',
                    background: 'rgba(0, 243, 255, 0.05)'
                  }}
                >
                  <p className="holo-accent" style={{ 
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'bold',
                    marginBottom: '0.25rem'
                  }}>
                    {film.title}
                  </p>
                  <p className="holo-text" style={{ 
                    fontSize: 'var(--font-size-xs)',
                    opacity: 0.7
                  }}>
                    Episode {film.episode_id}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="holo-text">No film data available</p>
          )}
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .character-detail-overlay > .holo-card > div:first-of-type {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          
          .character-detail-overlay > .holo-card > div:first-of-type > div:first-child {
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}

export default CharacterDetail;
