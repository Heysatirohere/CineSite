import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Styles/MovieCard.module.css';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  
  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null; 

  return (
    <Link to={`/movie/${movie.id}`} className={styles.card}>
      
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={`Poster do filme ${movie.title}`} 
          className={styles.poster}
        />
      ) : (
        <div className={styles.placeholder}>
          <span>Imagem não disponível</span>
        </div>
      )}
    
      <div className={styles.info}>
        <h3 className={styles.title}>
          {movie.title}
        </h3>
      </div>
    </Link>
  );
}

export default MovieCard;