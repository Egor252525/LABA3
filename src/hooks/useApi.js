import { useState, useEffect } from 'react';
import api from '../services/api';

export const useApi = (url, options = {}) => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('API запрос:', url);

      try {
        const response = await api(url, options);
        setData(response.data || []);
      } catch (apiError) {
        console.warn('API request failed:', apiError);
        setData([]); 
        setError('Ошибка загрузки данных');
      }
      
    } catch (err) {
      console.error('API Error:', err);
      setError('Ошибка загрузки данных');
      setData([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData();
    } else {
      setData([]);
      setLoading(false);
    }
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};
