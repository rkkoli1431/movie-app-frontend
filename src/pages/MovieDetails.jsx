import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieById } from "../services/movieService";
import { Box, Typography } from "@mui/material";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieById(id).then(setMovie);
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <Box p={4}>
      <img src={movie.poster} width="300" />
      <Typography variant="h4">{movie.title}</Typography>
      <Typography>⭐ Rating: {movie.rating}</Typography>
      <Typography>📅 Year: {movie.year}</Typography>
      <Typography>⏱ Duration: {movie.duration} mins</Typography>
      <Typography mt={2}>{movie.description}</Typography>
    </Box>
  );
}
