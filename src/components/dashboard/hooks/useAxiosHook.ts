import { useState, useEffect } from "react";
import axios from "axios";

// Custom Hook to make API requests using Axios
const useAxios = (
  url: string,
  method = "GET",
  body = null,
  headers = {},
  immediate = true
) => {
  const [data, setData] = useState<any>(null); // To store response data
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState<any>(null); // To track error state

  const fetchData = async (overrideBody?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method,
        url,
        data: overrideBody ?? body,
        headers,
      });
      setData(response.data); // Set the data received from the API
    } catch (err) {
      setError(err);
      setData(null); // Handle error and set error state
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Use effect to call the fetchData function when URL or method changes
  useEffect(() => {
    if (immediate) {
      fetchData(); // Fetch data immediately on component mount
    }
  }, [url, method, body, headers, immediate]);

  return { data, loading, error, fetchData }; // Return data, loading, error, and fetchData function
};

export default useAxios;
