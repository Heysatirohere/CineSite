import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styles from '../Styles/HomePage.module.css'; 
import { motion } from 'framer-motion';

import Spinner from "../Components/Spinner.jsx";
import ErrorMessage from "../Components/ErrorMessage.jsx";
import MovieCard from "../Components/MovieCard.jsx";
import Pagination from '../Components/Pagination.jsx'; 

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_PAGE_LIMIT = 500;

const fetchPopularMovies = async (page) => {
  const { data } = await axios.get(`${API_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      language: 'pt-BR',
      page: page 
    }
  });

  return {
    movies: data.results,
    totalPages: data.total_pages
  };
};

const fetchSearchMovies = async (query, page) => {
  const { data } = await axios.get(`${API_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      language: 'pt-BR',
      query: query,
      page: page
    }
  });
  return {
    movies: data.results,
    totalPages: data.total_pages
  };
};

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
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const [page, setPage] = useState(initialPage);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', searchTerm, page], 
    queryFn: () => {
      if (searchTerm === '' || searchTerm === null) {
        return fetchPopularMovies(page);
      } else {
        return fetchSearchMovies(searchTerm, page);
      }
    },
    keepPreviousData: true 
  });

  useEffect(() => {
    const currentSearchParam = searchParams.get('search');
    if ((searchTerm && searchTerm !== currentSearchParam) || (!searchTerm && currentSearchParam)) {
        setPage(1); 
    }
  }, [searchTerm, searchParams]);

  useEffect(() => {
    const params = {};
    if (searchTerm) {
      params.search = searchTerm;
    }
    params.page = page.toString();
    setSearchParams(params, { replace: true }); 
  }, [page, searchTerm, setSearchParams]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorMessage message="Não foi possível carregar os filmes." />;
  }

  const movies = data?.movies;
  const totalPagesFromAPI = data?.totalPages;
  const totalPages = Math.min(totalPagesFromAPI || 0, API_PAGE_LIMIT); 

  const handlePageChange = (newPage) => {
    setPage(newPage); 
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="container"> 
        <div className={styles.movieGrid}>
          {movies && movies.length > 0 ? (
            movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            !isLoading && <p>Nenhum filme encontrado.</p>
          )}
        </div>
        {totalPages > 0 && movies && movies.length > 0 && (
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