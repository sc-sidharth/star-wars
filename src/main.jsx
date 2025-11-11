import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import './styles/holographic.css';
import './styles/animations.css';
import './styles/components.css';

// Enable React DevTools in development
if (import.meta.env.DEV) {
  console.log('🚀 Star Wars Encyclopedia - Development Mode');
  console.log('📡 SWAPI Base URL:', 'https://swapi.dev/api/');
}

// Service Worker registration for PWA (future enhancement)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    // Future: Register service worker here
    console.log('Service Worker support detected');
  });
}

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
