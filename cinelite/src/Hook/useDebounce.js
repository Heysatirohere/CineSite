import { useState, useEffect } from 'react';
function useDebounce(value, delay) {
  // Estado para o valor "atrasado"
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Cria um timer
    const handler = setTimeout(() => {
      setDebouncedValue(value); 
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); 

  return debouncedValue;
}
export default useDebounce;