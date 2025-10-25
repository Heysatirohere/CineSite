HomePage

import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

//Components
import Spinner from "../Components/Spinner.jsx";
import ErrorMessage from "../Components/ErrorMessage.jsx";
import MovieCard from "../Components/MovieCard.jsx";

//API's TMDB

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchPopularMovies = async () => {
  // A URL completa será algo como: 
  // https://api.themoviedb.org/3/movie/popular?api_key=SUA_CHAVE
  const { data } = await axios.get(`${API_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      language: 'pt-BR', 
      page: 1 
    }
  });
  return data.results; 
};

function HomePage() {
const { data: movies, isLoading, isError } = useQuery({
    queryKey: ['popularMovies'], 
    queryFn: fetchPopularMovies
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorMessage message="Não foi possível carregar os filmes." />;
  }

  return (
    <div className="container mx-auto p-4">
      {}
      
      {}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies && movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} /> 
        ))}
      </div>
    </div>
  );
}

export default HomePage;