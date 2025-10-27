import { useState, useEffect } from 'react';

function useDebounce(value, delay, forceImmediate = false) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (forceImmediate) {
      setDebouncedValue(value);
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, forceImmediate]);

  return debouncedValue;
}

export default useDebounce;
