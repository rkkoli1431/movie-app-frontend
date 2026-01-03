import { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Pagination,
  InputAdornment,
  Paper,
  Fade,
  Skeleton,
} from "@mui/material";
import { Search as SearchIcon, Movie as MovieIcon } from "@mui/icons-material";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../context/MovieContext";

const Search = () => {
  const { movies, loading, pagination, searchMovies } = useMovies();
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchMovies(query, 1);
      setSearched(true);
    }
  };

  const handlePageChange = (event, value) => {
    searchMovies(query, value);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #0a0a0a 0%, #1a1a1a 100%)",
        pb: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        {/* HEADER */}
        <Fade in timeout={600}>
          <Box textAlign="center" mb={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
              }}
            >
              <MovieIcon sx={{ fontSize: 48, color: "#e50914", mr: 1 }} />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  background:
                    "linear-gradient(45deg, #e50914 30%, #ff6b6b 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Search Movies
              </Typography>
            </Box>
            <Typography color="rgba(255,255,255,0.7)">
              Find movies by title, description, director or cast
            </Typography>
          </Box>
        </Fade>

        {/* SEARCH BAR */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
          }}
        >
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{ display: "flex", gap: 2 }}
          >
            <TextField
              fullWidth
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "rgba(255,255,255,0.6)" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e50914",
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                px: 4,
                fontWeight: 700,
                background: "#e50914",
                "&:hover": { background: "#ff1f1f" },
              }}
            >
              Search
            </Button>
          </Box>
        </Paper>

        {/* RESULTS INFO */}
        {searched && !loading && (
          <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 2 }}>
            Found <strong>{pagination.totalMovies}</strong> result(s) for "
            {query}"
          </Typography>
        )}

        {/* LOADING STATE */}
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(8)].map((_, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Skeleton
                  variant="rectangular"
                  height={420}
                  sx={{
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.05)",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            {/* MOVIE GRID */}
            <Grid container spacing={3}>
              {movies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>

            {/* EMPTY STATES */}
            {searched && movies.length === 0 && (
              <Box textAlign="center" py={8}>
                <MovieIcon
                  sx={{ fontSize: 80, color: "rgba(255,255,255,0.2)" }}
                />
                <Typography variant="h5" color="rgba(255,255,255,0.7)">
                  No movies found
                </Typography>
                <Typography color="rgba(255,255,255,0.5)">
                  Try a different keyword
                </Typography>
              </Box>
            )}

            {!searched && (
              <Box textAlign="center" py={8}>
                <Typography variant="h6" color="rgba(255,255,255,0.6)">
                  Start typing to search movies
                </Typography>
              </Box>
            )}

            {/* PAGINATION */}
            {pagination.totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Pagination
                  count={pagination.totalPages}
                  page={pagination.currentPage}
                  onChange={handlePageChange}
                  size="large"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "white",
                      borderColor: "rgba(255,255,255,0.2)",
                    },
                    "& .Mui-selected": {
                      background: "#e50914 !important",
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Search;
