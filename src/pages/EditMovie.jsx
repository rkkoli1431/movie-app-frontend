// frontend/src/pages/EditMovie.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { useMovies } from '../context/MovieContext';

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateMovie } = useMovies();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    rating: '',
    duration: '',
    description: '',
    director: '',
    poster: '',
    genres: '',
    cast: '',
  });

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/movies/${id}`
      );
      setFormData({
        title: data.title,
        year: data.year,
        rating: data.rating,
        duration: data.duration,
        description: data.description,
        director: data.director || '',
        poster: data.poster || '',
        genres: data.genres?.join(', ') || '',
        cast: data.cast?.join(', ') || '',
      });
      setLoading(false);
    } catch (error) {
      setError('Failed to load movie');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
      ...formData,
      year: parseInt(formData.year),
      rating: parseFloat(formData.rating),
      duration: parseInt(formData.duration),
      genres: formData.genres.split(',').map(g => g.trim()).filter(Boolean),
      cast: formData.cast.split(',').map(c => c.trim()).filter(Boolean),
    };

    const result = await updateMovie(id, movieData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/admin'), 2000);
    } else {
      setError(result.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Movie
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Movie updated successfully! Redirecting...
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Rating (0-10)"
                name="rating"
                type="number"
                inputProps={{ step: 0.1, min: 0, max: 10 }}
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Duration (minutes)"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Director"
                name="director"
                value={formData.director}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Poster URL"
                name="poster"
                value={formData.poster}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Genres (comma-separated)"
                name="genres"
                value={formData.genres}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cast (comma-separated)"
                name="cast"
                value={formData.cast}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/admin')}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Update Movie
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditMovie;