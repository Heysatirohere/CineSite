import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useDebounce from '../Hook/useDebounce';
import styles from '../Styles/SearchBar.module.css';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

const fetchSearchDropdown = async (query) => {
  if (query.length < 3) {
    return [];
  }
  const { data } = await axios.get(`${API_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      language: 'pt-BR',
      query: query,
    }
  });
  return data.results.slice(0, 5);
};

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');
  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const navigate = useNavigate();

  const { data: dropdownResults, isLoading } = useQuery({
    queryKey: ['searchDropdown', debouncedSearchTerm],
    queryFn: () => fetchSearchDropdown(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;

    onSearch(inputValue);
    setInputValue('');
    navigate('/');
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Buscar por título..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={styles.searchInput}
      />
      {debouncedSearchTerm && dropdownResults && (
        <ul className={styles.dropdownList}>
          {isLoading && <li>Carregando...</li>}
          
          {dropdownResults.length === 0 && !isLoading && <li>Nenhum resultado.</li>}
          
          {dropdownResults.map(movie => (
            <li key={movie.id}>
              <Link
                to={`/movie/${movie.id}`}
                className={styles.dropdownItem}
                onClick={() => setInputValue('')}
              >
                <img
                  src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/50x75'}
                  alt={movie.title}
                  className={styles.dropdownImage}
                />
                <span>{movie.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default SearchBar;