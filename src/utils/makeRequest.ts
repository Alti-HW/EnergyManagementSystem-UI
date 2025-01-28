import { useState, useEffect } from 'react';
import axios from 'axios';
import { Options, Response } from './types';

const useFetch = (url: string, options: Options = {}): Response => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios(url, options);
                setData(response.data);
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options]); // re-run if URL or options change

    return { data, loading, error };
};

export default useFetch;