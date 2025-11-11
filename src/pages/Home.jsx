import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="app-main" style={{ position: 'relative', zIndex: 1 }}>
      <div className="holo-container">
        <div className="holo-card fade-in-glow">
          <h2 className="holo-accent" style={{ fontSize: 'var(--font-size-2xl)', marginBottom: '1rem' }}>
            Welcome to the Star Wars 3D Encyclopedia
          </h2>
          
          <p className="holo-text" style={{ fontSize: 'var(--font-size-lg)', marginBottom: '1.5rem' }}>
            Explore the vast Star Wars universe with our interactive holographic interface.
            Search for your favorite characters, discover planets, and learn about iconic starships.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
            <div className="holo-card" style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
              <h3 className="holo-accent">👥 Characters</h3>
              <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)', marginTop: '0.5rem' }}>
                Search and filter through 80+ characters from the Star Wars saga
              </p>
              <Link to="/characters" className="holo-button" style={{ marginTop: '1rem', display: 'inline-block' }}>
                Explore Characters
              </Link>
            </div>

            <div className="holo-card" style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
              <h3 className="holo-accent">🌐 Planets</h3>
              <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)', marginTop: '0.5rem' }}>
                Explore planets in interactive 3D visualization
              </p>
              <Link to="/planets" className="holo-button" style={{ marginTop: '1rem', display: 'inline-block' }}>
                View Planets
              </Link>
            </div>

            <div className="holo-card" style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
              <h3 className="holo-accent">🚀 Starships</h3>
              <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)', marginTop: '0.5rem' }}>
                Browse iconic spacecraft from the galaxy
              </p>
              <Link to="/starships" className="holo-button" style={{ marginTop: '1rem', display: 'inline-block' }}>
                Explore Starships
              </Link>
            </div>
          </div>

          <div className="holo-divider" style={{ margin: '2rem 0' }}></div>

          <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)', textAlign: 'center', opacity: 0.7 }}>
            Data provided by <a href="https://swapi.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--holo-primary)' }}>SWAPI</a>
            <br />
            May the Force be with you ⚡
          </p>
        </div>
      </div>
    </main>
  );
}

export default Home;
