import React from 'react';
import { Link } from 'react-router-dom';


const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";


function MovieCard({ movie }) {
  
  
  const imageUrl = movie.poster_path 
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Imagem+Nao+Disponivel"; 

  return (
 
    <Link to={`/movie/${movie.id}`}>
      <div className="movie-card"> {}
        
        {}
        <img 
          src={imageUrl} 
       
          alt={`Poster do filme ${movie.title}`} 
          style={{ width: '100%', height: 'auto' }} 
        />
        
        {}
        <div>
          <h3>{movie.title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;