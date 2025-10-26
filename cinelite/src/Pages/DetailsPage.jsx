import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styles from '../Styles/DetailsPage.module.css';
import { motion } from 'framer-motion';

// Components
import Spinner from '../Components/Spinner.jsx';
import ErrorMessage from '../Components/ErrorMessage.jsx';

// API's TMDB
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

const fetchMovieDetails = async (movieId) => {
  const { data } = await axios.get(`${API_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
      language: 'pt-BR'
    }
  });
  return data;
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
    <motion.div
      className={styles.pageContainer}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className={styles.detailsContainer}>
        <img 
          src={imageUrl} 
          alt={`Poster do filme ${movie.title}`} 
          className={styles.poster} 
        />
        
        <div className={styles.info}>
          <h1>{movie.title}</h1>
          
          <h2>Sinopse</h2>
          <p>{movie.overview || "Sinopse não disponível."}</p>
          
          <p>
            <strong>Nota:</strong> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
          </p>
          <p>
            <strong>Gêneros:</strong> {
              movie.genres && movie.genres.length > 0
                ? movie.genres.map(genre => genre.name).join(', ')
                : 'Não classificado'
            }
          </p>
          <p>
            <strong>Site Oficial:</strong> {
              movie.homepage 
                ? <a href={movie.homepage} target="_blank" rel="noopener noreferrer">Visitar</a>
                : 'Não disponível'
            }
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default DetailsPage;