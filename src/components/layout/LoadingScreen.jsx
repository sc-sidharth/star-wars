import React from 'react';

function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      gap: '1rem'
    }}>
      <div className="holo-loading" style={{ width: '60px', height: '60px', borderWidth: '4px' }}></div>
      <p className="holo-text glow-pulse-text">Loading data from the Star Wars API...</p>
    </div>
  );
}

export default LoadingScreen;


