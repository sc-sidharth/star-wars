import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-main">
          <div className="holo-container">
            <div className="holo-card" style={{ 
              textAlign: 'center', 
              padding: 'var(--spacing-2xl)' 
            }}>
              <h2 className="holo-accent" style={{ marginBottom: '1rem' }}>
                Something went wrong
              </h2>
              <p className="holo-text" style={{ marginBottom: '1.5rem' }}>
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <button
                className="holo-button"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


