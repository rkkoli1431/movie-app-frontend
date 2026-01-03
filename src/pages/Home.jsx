import { useEffect, useState } from "react";
import { fetchMovies } from "../services/movieService";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    loadMovies(page);
  }, [page]);

  const loadMovies = async (page) => {
    const data = await fetchMovies(page);
    setMovies(data.movies);
    setTotalPages(data.totalPages);
  };

  return (
    <>
      <Grid container spacing={3} padding={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={3} key={movie._id}>
            <Card
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/movies/${movie._id}`)}
            >
              <CardMedia
                component="img"
                height="350"
                image={movie.poster}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2">
                  ⭐ {movie.rating} | {movie.year}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{ display: "flex", justifyContent: "center", mb: 4 }}
      />
    </>
  );
}
