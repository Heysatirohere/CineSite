import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useDebounce from './useDebounce';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_PAGE_LIMIT = 500;

const fetchPopularMovies = async (page) => {
  const { data } = await axios.get(`${API_URL}/movie/popular`, {
    params: { api_key: API_KEY, language: 'pt-BR', page }
  });
  return { movies: data.results, totalPages: Math.min(data.total_pages || 0, API_PAGE_LIMIT) };
};

const fetchSearchMovies = async (query, page) => {
  const { data } = await axios.get(`${API_URL}/search/movie`, {
    params: { api_key: API_KEY, language: 'pt-BR', query, page }
  });
  return { movies: data.results, totalPages: Math.min(data.total_pages || 0, API_PAGE_LIMIT) };
};

const fetchGenres = async () => {
  const { data } = await axios.get(`${API_URL}/genre/movie/list`, {
    params: { api_key: API_KEY, language: 'pt-BR' }
  });
  return data.genres;
};

const fetchDiscoverMovies = async (page, genreId, ratingGte) => {
  const params = {
    api_key: API_KEY,
    language: 'pt-BR',
    page,
    sort_by: 'popularity.desc',
    include_adult: false,
    'vote_average.gte': ratingGte > 0 ? ratingGte : undefined,
  };
  if (genreId) params.with_genres = genreId;
  const { data } = await axios.get(`${API_URL}/discover/movie`, { params });
  return { movies: data.results, totalPages: Math.min(data.total_pages || 0, API_PAGE_LIMIT) };
};

function useMovieFilters(searchTerm) {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialGenre = searchParams.get('genre') || '';
  const initialRating = parseFloat(searchParams.get('rating') || '0');
  const initialPage = parseInt(searchParams.get('page') || '1', 10);

  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [sliderRating, setSliderRating] = useState(initialRating);
  const [page, setPage] = useState(initialPage);
  const [forceImmediate, setForceImmediate] = useState(false);

  const debouncedRating = useDebounce(sliderRating, 400, forceImmediate);

  const { data: genres, isLoading: isLoadingGenres } = useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
    staleTime: Infinity,
  });

  const {
    data: movieData,
    isLoading: isLoadingMovies,
    isError: isErrorMovies,
    isFetching: isFetchingMovies,
  } = useQuery({
    queryKey: ['movies', searchTerm, selectedGenre, debouncedRating, page],
    queryFn: () => {
      if (searchTerm) return fetchSearchMovies(searchTerm, page);
      if (selectedGenre || debouncedRating > 0)
        return fetchDiscoverMovies(page, selectedGenre, debouncedRating);
      return fetchPopularMovies(page);
    },
    keepPreviousData: true,
  });

  // --- Atualiza URL ---
  useEffect(() => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (selectedGenre) params.genre = selectedGenre;
    if (debouncedRating > 0) params.rating = String(debouncedRating);
    params.page = String(page);

    setSearchParams(params, { replace: true });
  }, [searchTerm, selectedGenre, debouncedRating, page, setSearchParams]);

  // --- Sincroniza estado com URL ---
  useEffect(() => {
    const urlPage = parseInt(searchParams.get('page') || '1', 10);
    const urlGenre = searchParams.get('genre') || '';
    const urlRating = parseFloat(searchParams.get('rating') || '0');

    if (urlPage !== page) setPage(urlPage);
    if (urlGenre !== selectedGenre) setSelectedGenre(urlGenre);
    if (urlRating !== sliderRating) setSliderRating(urlRating);
  }, [searchParams]);

  const handleGenreChange = useCallback((newGenreId) => setSelectedGenre(newGenreId), []);
  const handleSliderRatingChange = useCallback((newRating) => {
    setForceImmediate(false);
    setSliderRating(newRating);
  }, []);
  const handlePageChange = useCallback((newPage) => setPage(newPage), []);

  const handleResetFilters = useCallback(() => {
    setForceImmediate(true); 
    setSelectedGenre('');
    setSliderRating(0);
    setPage(1);

    const params = new URLSearchParams();
    params.set('page', '1');
    setSearchParams(params, { replace: true });

    // volta o comportamento normal depois de 1 render
    setTimeout(() => setForceImmediate(false), 50);
  }, [setSearchParams]);

  return {
    page,
    selectedGenre,
    sliderRating,
    genres,
    movies: movieData?.movies,
    totalPages: movieData?.totalPages || 0,
    isLoadingGenres,
    isLoadingMovies,
    isErrorMovies,
    isFetchingMovies,
    handleGenreChange,
    handleSliderRatingChange,
    handlePageChange,
    handleResetFilters,
  };
}

export default useMovieFilters;
