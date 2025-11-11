import { useState, useEffect } from 'react';
import swapiService from '../services/swapi';

/**
 * useSwapiData Hook
 * 
 * Custom hook for fetching data from SWAPI with loading and error states
 * 
 * @param {string} endpoint - The SWAPI endpoint to fetch from
 * @param {boolean} immediate - Whether to fetch immediately (default: true)
 * @returns {Object} - { data, loading, error, refetch }
 */
export function useSwapiData(endpoint, immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await swapiService.fetch(endpoint);
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
      console.error(`Error fetching ${endpoint}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate && endpoint) {
      fetchData();
    }
  }, [endpoint, immediate]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

export default useSwapiData;


