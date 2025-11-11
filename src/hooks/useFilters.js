import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * useFilters Hook
 * 
 * Manages filter state and URL synchronization
 * 
 * @returns {Object} - { filters, setFilter, clearFilter, clearAllFilters }
 */
export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    species: searchParams.getAll('species') || [],
    films: searchParams.getAll('films') || [],
    homeworld: searchParams.get('homeworld') || null
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    filters.species.forEach(id => params.append('species', id));
    filters.films.forEach(id => params.append('films', id));
    if (filters.homeworld) params.set('homeworld', filters.homeworld);
    
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const setFilter = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'homeworld') {
        return { ...prev, homeworld: value };
      }
      
      // For array filters (species, films)
      const currentValues = prev[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [filterType]: newValues };
    });
  };

  const clearFilter = (filterType) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: filterType === 'homeworld' ? null : []
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      species: [],
      films: [],
      homeworld: null
    });
  };

  const hasActiveFilters = () => {
    return filters.species.length > 0 || 
           filters.films.length > 0 || 
           filters.homeworld !== null;
  };

  return {
    filters,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters
  };
}

export default useFilters;


