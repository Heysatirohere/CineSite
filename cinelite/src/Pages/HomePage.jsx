import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styles from '../Styles/HomePage.module.css'; 

// Components
import Spinner from "../Components/Spinner.jsx";
import ErrorMessage from "../Components/ErrorMessage.jsx";
import MovieCard from "../Components/MovieCard.jsx";
import Pagination from '../Components/Pagination.jsx'; 

// API's TMDB
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

function HomePage({ searchTerm }) {
  const [page, setPage] = useState(1);

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
    setPage(1);
  }, [searchTerm]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorMessage message="Não foi possível carregar os filmes." />;
  }

  const movies = data?.movies;
  const totalPagesFromAPI = data?.totalPages;
  const totalPages = Math.min(totalPagesFromAPI, API_PAGE_LIMIT);

  return (
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
      {totalPages > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

export default HomePage;
