import React, { createContext, useContext, useState, useEffect } from 'react';
import swapiService from '../services/swapi';
import imageService from '../services/imageService';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Data states
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);
  const [species, setSpecies] = useState([]);
  const [films, setFilms] = useState([]);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    species: [],
    films: [],
    homeworld: null
  });

  // Load cache and initialize data
  useEffect(() => {
    initializeData();
  }, []);

  async function initializeData() {
    setLoading(true);
    setImagesLoading(true);
    setError(null);

    try {
      // Load cache first
      swapiService.loadCache();

      // Fetch all data (will use cache if available)
      const [peopleData, planetsData, speciesData, filmsData, starshipsData] = await Promise.all([
        swapiService.getAllPeople(),
        swapiService.getAllPlanets(),
        swapiService.getAllSpecies(),
        swapiService.getAllFilms(),
        swapiService.getAllStarships()
      ]);

      setCharacters(peopleData);
      setPlanets(planetsData);
      setSpecies(speciesData);
      setFilms(filmsData);
      setStarships(starshipsData);
      
      // Fetch images in background (don't block main UI)
      imageService.fetchAllImages()
        .then(() => {
          console.log('[AppContext] Images loaded successfully');
          setImagesLoading(false);
        })
        .catch(err => {
          console.error('[AppContext] Failed to load images:', err);
          setImagesLoading(false);
        });
      
    } catch (err) {
      setError(err.message || 'Failed to load data');
      console.error('Error initializing data:', err);
    } finally {
      setLoading(false);
    }
  }

  const value = {
    // Data
    characters,
    planets,
    starships,
    species,
    films,
    
    // States
    loading,
    imagesLoading,
    error,
    searchQuery,
    filters,
    
    // Actions
    setSearchQuery,
    setFilters,
    refetch: initializeData,
    
    // Image service
    imageService
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

export default AppContext;

