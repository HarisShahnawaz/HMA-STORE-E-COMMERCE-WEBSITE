import { useState, useEffect } from 'react';

export function useProducts(filters = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the API URL from environment variables
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const params = new URLSearchParams(filters).toString();
    setLoading(true);

    fetch(`${API_URL}/api/products${params ? '?' + params : ''}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => { 
        setProducts(data); 
        setLoading(false); 
      })
      .catch(err => { 
        setError(err.message); 
        setLoading(false); 
      });
  }, [JSON.stringify(filters), API_URL]); // Added API_URL to dependency array

  return { products, loading, error };
}