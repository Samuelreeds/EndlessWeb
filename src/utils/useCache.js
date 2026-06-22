import { useState, useEffect } from 'react';
import { api } from './api';

// In-memory cache object persists across route changes
const globalCache = {};

export function useCache(key, endpoint) {
  const [data, setData] = useState(globalCache[key] || null);
  const [isLoading, setIsLoading] = useState(!globalCache[key]);

  useEffect(() => {
    if (globalCache[key]) {
      setData(globalCache[key]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    api.fetch(endpoint)
      .then(res => res.json())
      .then(result => {
        globalCache[key] = result;
        setData(result);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [key, endpoint]);

  const updateCache = (newData) => {
    globalCache[key] = newData;
    setData(newData);
  };

  return { data, isLoading, updateCache };
}