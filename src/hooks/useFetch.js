import { useState, useEffect } from "react";

export const useFetch = (apiFunc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const response = await apiFunc();
        if (mounted) setData(response.data);
      } catch (err) {
        if (mounted) setError(err.message || "Error fetching data");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => (mounted = false);
  }, [apiFunc]);

  return { data, loading, error };
};
