import { useState, useEffect } from 'react';

export function useProducts(filters = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(filters).toString();
    fetch(`http://localhost:5000/api/products${params ? '?' + params : ''}`)
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [JSON.stringify(filters)]);

  return { products, loading, error };
}