import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../Styles/FilterControl.module.css';

function FilterControls({
  genres,
  selectedGenre,
  minRating,
  onGenreChange,
  onRatingChange,
  onResetFilters,
  disabled
}) {
  const [isResetting, setIsResetting] = useState(false);
  const isFilterActive = selectedGenre !== '' || minRating > 0;

  const handleResetClick = () => {
    if (isResetting) return;
    setIsResetting(true);
    onResetFilters();

    // volta o estado visual ao normal após a animação
    setTimeout(() => setIsResetting(false), 1000);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <label htmlFor="genre-select">Gênero:</label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          disabled={disabled || !genres}
          className={styles.selectInput}
        >
          <option value="">Todos</option>
          {genres?.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="rating-input">Nota Mínima ({minRating.toFixed(1)}):</label>
        <input
          type="range"
          id="rating-input"
          min="0"
          max="10"
          step="0.5"
          value={minRating}
          onChange={(e) => onRatingChange(parseFloat(e.target.value))}
          disabled={disabled}
          className={styles.rangeInput}
        />
      </div>

      <motion.button
        onClick={handleResetClick}
        disabled={!isFilterActive || disabled || isResetting}
        className={`${styles.resetButton} ${isResetting ? styles.resetting : ''}`}
        whileTap={{ scale: 0.95 }}
        animate={isResetting ? { rotate: 360, opacity: [1, 0.7, 1] } : {}}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        {isResetting ? 'Limpando...' : 'Limpar Filtros'}
      </motion.button>
    </div>
  );
}

export default FilterControls;
