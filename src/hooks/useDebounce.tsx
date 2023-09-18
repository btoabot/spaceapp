import {useState, useEffect} from 'react';

function useDebounce<T>(value: T, delay: number): T {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Update debouncedValue after delay milliseconds
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout if the value changes before the delay period
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
