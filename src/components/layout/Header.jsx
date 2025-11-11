import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Initialize audio on component mount
  useEffect(() => {
    // Using the Imperial March (Darth Vader's Theme)
    // Audio file should be placed in public/audio/imperial-march.mp3
    audioRef.current = new Audio('/audio/imperial-march.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // Set to 40% volume

    // Handle loading errors gracefully
    audioRef.current.addEventListener('error', () => {
      console.warn('Audio file not found. Please add imperial-march.mp3 to public/audio/');
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
      setIsPlaying(true);
    }
  };

  return (
    <header className="app-header fade-in-glow" role="banner">
      <div className="holo-container" style={{ position: 'relative' }}>
        {/* Sound Toggle Button - Top Right */}
        <button
          onClick={toggleSound}
          className="holo-button"
          aria-label={isPlaying ? 'Mute Imperial March' : 'Play Imperial March'}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            padding: '0.75rem',
            fontSize: '1.5rem',
            minWidth: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: isPlaying ? 'var(--holo-primary)' : 'var(--holo-bg-light)',
            color: isPlaying ? 'var(--holo-bg-dark)' : 'var(--holo-primary)',
            boxShadow: isPlaying ? 'var(--holo-glow-strong)' : 'var(--holo-glow)',
            animation: isPlaying ? 'pulse-glow 2s infinite' : 'none'
          }}
        >
          {isPlaying ? '🔊' : '🔇'}
          <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
            {isPlaying ? 'Imperial March' : 'Play Theme'}
          </span>
        </button>

        <h1 className="holo-title glow-pulse-text">Star Wars Encyclopedia</h1>
        <p className="holo-text">Explore the Galaxy Far, Far Away</p>
        
        <nav 
          style={{ 
            marginTop: '1.5rem', 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
          role="navigation"
          aria-label="Main navigation"
        >
          <Link 
            to="/" 
            className="holo-button"
            aria-current={isActive('/') ? 'page' : undefined}
            style={{
              background: isActive('/') ? 'var(--holo-primary)' : 'var(--holo-bg-light)',
              color: isActive('/') ? 'var(--holo-bg-dark)' : 'var(--holo-primary)',
              fontWeight: isActive('/') ? 'bold' : 'normal'
            }}
          >
            🏠 Home
          </Link>
          <Link 
            to="/characters" 
            className="holo-button"
            aria-current={isActive('/characters') ? 'page' : undefined}
            style={{
              background: isActive('/characters') ? 'var(--holo-primary)' : 'var(--holo-bg-light)',
              color: isActive('/characters') ? 'var(--holo-bg-dark)' : 'var(--holo-primary)',
              fontWeight: isActive('/characters') ? 'bold' : 'normal'
            }}
          >
            👥 Characters
          </Link>
          <Link 
            to="/planets" 
            className="holo-button"
            aria-current={isActive('/planets') ? 'page' : undefined}
            style={{
              background: isActive('/planets') ? 'var(--holo-primary)' : 'var(--holo-bg-light)',
              color: isActive('/planets') ? 'var(--holo-bg-dark)' : 'var(--holo-primary)',
              fontWeight: isActive('/planets') ? 'bold' : 'normal'
            }}
          >
            🌐 Planets
          </Link>
          <Link 
            to="/starships" 
            className="holo-button"
            aria-current={isActive('/starships') ? 'page' : undefined}
            style={{
              background: isActive('/starships') ? 'var(--holo-primary)' : 'var(--holo-bg-light)',
              color: isActive('/starships') ? 'var(--holo-bg-dark)' : 'var(--holo-primary)',
              fontWeight: isActive('/starships') ? 'bold' : 'normal'
            }}
          >
            🚀 Starships
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
