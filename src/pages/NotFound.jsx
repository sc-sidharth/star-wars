import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="app-main">
      <div className="holo-container">
        <div className="holo-card fade-in-glow" style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
          <h1 className="holo-accent" style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '1rem' }}>
            404
          </h1>
          <h2 className="holo-text" style={{ fontSize: 'var(--font-size-xl)', marginBottom: '1rem' }}>
            This is not the page you're looking for
          </h2>
          <p className="holo-text" style={{ marginBottom: '2rem' }}>
            The page you're looking for doesn't exist in this galaxy.
          </p>
          <Link to="/" className="holo-button">
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;


