// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// export const fetchMovies = async () => {
//   try {
//     const res = await fetch(`${API_URL}/movies`);
//     if (!res.ok) throw new Error("Failed to fetch movies");
//     return await res.json();
//   } catch (error) {
//     console.error("Frontend API Error:", error.message);
//     return { movies: [] };
//   }
// };

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/movies";

// ALL MOVIES (pagination)
export const fetchMovies = async (page = 1, limit = 12) => {
  const res = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`
  );
  return res.data;
};

// SORT MOVIES
export const fetchSortedMovies = async (
  sortBy = "rating",
  order = "desc",
  page = 1
) => {
  const res = await axios.get(
    `${API_URL}/sorted?sortBy=${sortBy}&order=${order}&page=${page}`
  );
  return res.data;
};

// SEARCH MOVIES
export const searchMovies = async (query, page = 1) => {
  const res = await axios.get(
    `${API_URL}/search?query=${query}&page=${page}`
  );
  return res.data;
};

// SINGLE MOVIE
export const fetchMovieById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
