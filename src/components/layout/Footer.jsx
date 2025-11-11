import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        marginTop: 'auto',
        padding: 'var(--spacing-xl) var(--spacing-md)',
        borderTop: '1px solid var(--holo-border)',
        textAlign: 'center',
        background: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <div className="holo-divider" style={{ margin: '0 auto var(--spacing-md)', maxWidth: '400px' }}></div>
      
      <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-sm)' }}>
        Data provided by{' '}
        <a 
          href="https://swapi.dev" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ 
            color: 'var(--holo-primary)',
            textDecoration: 'underline'
          }}
        >
          SWAPI
        </a>
      </p>

      <p className="holo-text" style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-sm)' }}>
        Built with React, Three.js & @react-three/fiber
      </p>

      <div className="holo-divider" style={{ margin: 'var(--spacing-md) auto', maxWidth: '400px' }}></div>

      <p 
        className="holo-accent" 
        style={{ 
          fontSize: 'var(--font-size-sm)', 
          fontWeight: 'bold',
          textShadow: 'var(--holo-glow)'
        }}
      >
        © {currentYear} Sidharth Paliwal. All rights reserved.
      </p>

      <p className="holo-text" style={{ fontSize: 'var(--font-size-xs)', marginTop: 'var(--spacing-sm)', opacity: 0.7 }}>
        Star Wars and all related characters are trademarks of Lucasfilm Ltd.
      </p>

      <p className="holo-text" style={{ fontSize: 'var(--font-size-xs)', marginTop: 'var(--spacing-xs)' }}>
        ⚡ May the Force be with you ⚡
      </p>
    </footer>
  );
}

export default Footer;


