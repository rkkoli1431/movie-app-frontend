// frontend/src/context/MovieContext.jsx
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const MovieContext = createContext();

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalMovies: 0,
  });

  const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.token ? { Authorization: `Bearer ${user.token}` } : {};
  };

  const fetchMovies = async (page = 1, limit = 12) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/movies?page=${page}&limit=${limit}`
      );
      setMovies(data.movies);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalMovies: data.totalMovies,
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query, page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/movies/search?query=${query}&page=${page}`
      );
      setMovies(data.movies);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalMovies: data.totalMovies,
      });
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortMovies = async (sortBy, order = 'desc', page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/movies/sorted?sortBy=${sortBy}&order=${order}&page=${page}`
      );
      setMovies(data.movies);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalMovies: data.totalMovies,
      });
    } catch (error) {
      console.error('Error sorting movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMovie = async (movieData) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/movies`,
        movieData,
        { headers: getAuthHeader() }
      );
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add movie',
      };
    }
  };

  const updateMovie = async (id, movieData) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/movies/${id}`,
        movieData,
        { headers: getAuthHeader() }
      );
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update movie',
      };
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/movies/${id}`,
        { headers: getAuthHeader() }
      );
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete movie',
      };
    }
  };

  const value = {
    movies,
    loading,
    pagination,
    fetchMovies,
    searchMovies,
    sortMovies,
    addMovie,
    updateMovie,
    deleteMovie,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};