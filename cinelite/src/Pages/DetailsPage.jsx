import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

//Components
import Spinner from '../Components/Spinner.jsx';
import ErrorMessage from '../Components/ErrorMessage.jsx';

//API's TMDB
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const fetchMovieDetails = async (movieId) => {
  const { data } = await axios.get(`${API_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
      language: 'pt-BR'
    }
  });
 
  return data;
};

const detailsContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: '2rem',
  gap: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
};

const posterStyle = {
  flex: '1 1 300px', 
  maxWidth: '400px',
  borderRadius: '8px',
};

const infoStyle = {
  flex: '2 1 500px', 
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

function DetailsPage() {
  const { id } = useParams();
  const { data: movie, isLoading, isError } = useQuery({
   
    queryKey: ['movieDetails', id],
  
    queryFn: () => fetchMovieDetails(id),
   
    enabled: !!id 
  });

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <ErrorMessage message="Não foi possível carregar os detalhes do filme." />;
  }
  if (!movie) {
    return null;
  }


  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Imagem+Nao+Disponivel";

  return (
    <div style={detailsContainerStyle}>
      {}
      <img 
        src={imageUrl} 
        alt={`Poster do filme ${movie.title}`} 
        style={posterStyle}
      />
      
      <div style={infoStyle}>
        <h1>{movie.title}</h1>
        
        {}
        <h2>Sinopse</h2>
        <p>{movie.overview || "Sinopse não disponível."}</p>
        
        {}
        <p>
          <strong>Nota:</strong> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
        </p>
        
        {}
        <p>
          <strong>Gêneros:</strong> {
            movie.genres && movie.genres.length > 0
              ? movie.genres.map(genre => genre.name).join(', ')
              : 'Não classificado'
          }
        </p>
        
        {}
        <p>
          <strong>Site Oficial:</strong> {
            movie.homepage 
              ? <a href={movie.homepage} target="_blank" rel="noopener noreferrer">Visitar</a>
              : 'Não disponível'
          }
        </p>
      </div>
    </div>
  );
}

export default DetailsPage;