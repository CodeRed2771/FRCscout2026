import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // 1. Initialize state
  // We use a function here so this logic only runs once on mount
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Return parsed JSON from localStorage, or the initialValue if empty
      return item && item != "" ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  // 2. Persist state
  // Every time 'state' or 'key' changes, update localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;