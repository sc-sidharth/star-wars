import React, { useState, useEffect } from 'react';
import { getCharacterImageUrl, getCharacterAvatar } from '../../utils/imageHelpers';

function CharacterCard({ character, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState(null);
  const [imageUrls, setImageUrls] = useState(null);
  
  const avatar = getCharacterAvatar(character.name);

  // Load image URLs immediately on mount
  useEffect(() => {
    const urls = getCharacterImageUrl(character.url, character.name);
    setImageUrls(urls);
    if (urls.primary) {
      setCurrentImageSrc(urls.primary);
    }
  }, [character.url, character.name]);

  // Try to load image
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    // Try fallback source
    if (imageUrls && imageUrls.fallback && e.target.src !== imageUrls.fallback) {
      setCurrentImageSrc(imageUrls.fallback);
      e.target.src = imageUrls.fallback;
    } else {
      // Both failed, hide image
      setImageLoaded(false);
    }
  };

  return (
    <div 
      className="holo-card fade-in-glow character-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      aria-label={`View details for ${character.name}`}
      style={{ 
        cursor: 'pointer',
        transition: 'var(--holo-transition)'
      }}
    >
      {/* Character Image */}
      <div className="character-image" style={{
        width: '100%',
        height: '200px',
        background: imageLoaded 
          ? 'var(--holo-bg-dark)' 
          : `linear-gradient(135deg, ${avatar.color}22 0%, ${avatar.color}44 100%)`,
        borderRadius: '8px',
        marginBottom: 'var(--spacing-md)',
        overflow: 'hidden',
        border: '1px solid var(--holo-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        {currentImageSrc && (
          <img
            src={currentImageSrc}
            alt={character.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: imageLoaded ? 'block' : 'none',
              filter: 'grayscale(100%)',
              transition: 'filter 0.3s ease'
            }}
            loading="eager"
          />
        )}
        {!imageLoaded && (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--spacing-md)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: avatar.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: `0 0 30px ${avatar.color}66, inset 0 0 20px rgba(255, 255, 255, 0.2)`,
              border: '3px solid rgba(255, 255, 255, 0.3)',
              filter: 'grayscale(100%)'
            }}>
              {avatar.initials}
            </div>
          </div>
        )}
      </div>

      <h3 className="holo-accent" style={{ 
        fontSize: 'var(--font-size-lg)', 
        marginBottom: 'var(--spacing-sm)' 
      }}>
        {character.name}
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
        <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)' }}>
          <strong>Birth Year:</strong> {character.birth_year}
        </p>
        <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)' }}>
          <strong>Gender:</strong> {character.gender}
        </p>
        <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)' }}>
          <strong>Height:</strong> {character.height === 'unknown' ? 'Unknown' : `${character.height} cm`}
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

      <style jsx>{`
        .character-card:hover img {
          filter: grayscale(0%) !important;
        }
      `}</style>
    </div>
  );
}

export default CharacterCard;
