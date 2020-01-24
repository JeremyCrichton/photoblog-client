import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // A piece of data that wont' be reinitialized when this fn runs again (whenever component that uses this hook rerenders)
  // - stores data across re-render cycles
  const activeHttpRequests = useRef([]);

  // Wrap this fn w/ useCallback so fn never gets recreated when the component that uses this hook re-renders
  // - elmininates possibility of inefficient re-render cycles or an infinite loop
  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);

      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal
        });

        const responseData = await response.json();

        // Keep every controller except controller used in this request
        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  // all this abort ctrl logic is so we don't continue w/ a request that is on its way out if we switch away from component that triggered the request
  useEffect(() => {
    // fn w/in useEffect fn executes as a cleanup fn before useEffect runs again
    // OR when component that uses useEffect (uses this custom hook) unmounts
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
