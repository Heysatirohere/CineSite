import React, { useState, useEffect } from 'react';
import styles from '../Styles/SearchBar.module.css';

function SearchBar({ onSearch }) {
  // Estado local para o que o usuário está digitando
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    const timerId = setTimeout(() => {
    
      onSearch(inputValue);
    }, 500); 
    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue, onSearch]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar por título..."
      value={inputValue}
      onChange={handleChange}
      className={styles.searchInput}
    />
  );
}

export default SearchBar;