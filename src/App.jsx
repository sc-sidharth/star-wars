import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import BackToTop from './components/common/BackToTop';
import BackgroundBattle from './components/home/BackgroundBattle';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Planets from './pages/Planets';
import Starships from './pages/Starships';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          {/* Global Background Battle Animation */}
          <BackgroundBattle />
          
          <div className="app" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/planets" element={<Planets />} />
              <Route path="/starships" element={<Starships />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <BackToTop />
          </div>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
