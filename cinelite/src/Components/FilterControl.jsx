import React from 'react';
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

  const isFilterActive = selectedGenre !== '' || minRating > 0;

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
           {genres?.map(genre => (
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

      <button
        onClick={onResetFilters} 
        disabled={!isFilterActive || disabled} 
        className={styles.resetButton} 
      >
        Limpar Filtros
      </button>
    </div>
  );
}

export default FilterControls;