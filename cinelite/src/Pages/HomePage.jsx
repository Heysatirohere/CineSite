import React from 'react';
import { motion } from 'framer-motion';
import styles from '../Styles/HomePage.module.css';

import Spinner from "../Components/Spinner.jsx";
import ErrorMessage from "../Components/ErrorMessage.jsx";
import MovieCard from "../Components/MovieCard.jsx";
import Pagination from '../Components/Pagination.jsx';
import FilterControls from '../Components/FilterControl.jsx';

import useMovieFilters from '../Hook/useMovieFilters.js';

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

function HomePage({ searchTerm }) {
  const {
    page,
    selectedGenre,
    sliderRating,
    genres,
    movies,
    totalPages,
    isLoadingGenres,
    isLoadingMovies,
    isErrorMovies,
    isFetchingMovies,
    handleGenreChange,
    handleSliderRatingChange,
    handlePageChange,
    handleResetFilters,
  } = useMovieFilters(searchTerm);

  if ((isLoadingMovies || isLoadingGenres) && !movies) return <Spinner />;
  if (isErrorMovies) return <ErrorMessage message="Não foi possível carregar os filmes." />;

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="container">
        <FilterControls
          genres={genres}
          selectedGenre={selectedGenre}
          minRating={sliderRating}
          onGenreChange={handleGenreChange}
          onRatingChange={handleSliderRatingChange}
          onResetFilters={handleResetFilters}
          disabled={!!searchTerm || isLoadingGenres}
        />

        {isFetchingMovies && (
          <div style={{ textAlign: 'center', padding: '1rem', opacity: 0.7 }}>
            <Spinner />
          </div>
        )}

        <div className={styles.movieGrid}>
          {movies?.length ? (
            movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            !isFetchingMovies && <p>Nenhum filme encontrado para os critérios selecionados.</p>
          )}
        </div>

        {totalPages > 1 && movies?.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </motion.div>
  );
}

export default HomePage;
