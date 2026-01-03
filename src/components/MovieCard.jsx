// frontend/src/components/MovieCard.jsx
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Fade,
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  Star,
  PlayArrow,
  FavoriteBorder,
  Favorite,
  Info,
} from '@mui/icons-material';
import { useState } from 'react';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: { xs: 2, sm: 3 },
        overflow: 'hidden',
        background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
          transform: isMobile ? 'translateY(-4px)' : 'translateY(-12px)',
          boxShadow: `0 ${isMobile ? '12' : '24'}px ${isMobile ? '24' : '48'}px rgba(229, 9, 20, 0.25)`,
          border: '1px solid rgba(229, 9, 20, 0.4)',
          '& .movie-overlay': {
            opacity: 1,
          },
          '& .movie-poster': {
            transform: 'scale(1.08)',
          },
          '& .play-button': {
            transform: 'scale(1)',
            opacity: 1,
          },
          '& .movie-info': {
            transform: 'translateY(0)',
          },
        },
      }}
    >
      {/* Poster Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          height: { xs: 280, sm: 340, md: 400 },
          backgroundColor: 'rgba(20, 20, 20, 0.8)',
        }}
      >
        {/* Rank Badge */}
        {movie.rank && (
          <Chip
            icon={<Star sx={{ fontSize: 16 }} />}
            label={`#${movie.rank}`}
            size="small"
            sx={{
              position: 'absolute',
              top: { xs: 8, sm: 12 },
              left: { xs: 8, sm: 12 },
              zIndex: 3,
              background: 'linear-gradient(135deg, #e50914 0%, #b20710 100%)',
              color: 'white',
              fontWeight: 800,
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              height: { xs: 24, sm: 28 },
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 12px rgba(229, 9, 20, 0.4)',
              '& .MuiChip-icon': {
                color: 'white',
              },
            }}
          />
        )}

        {/* Favorite Button */}
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: { xs: 8, sm: 12 },
            right: { xs: 8, sm: 12 },
            zIndex: 3,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(10px)',
            color: isFavorite ? '#e50914' : 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(229, 9, 20, 0.2)',
              transform: 'scale(1.1)',
            },
          }}
          size={isMobile ? 'small' : 'medium'}
        >
          {isFavorite ? (
            <Favorite sx={{ fontSize: { xs: 20, sm: 24 } }} />
          ) : (
            <FavoriteBorder sx={{ fontSize: { xs: 20, sm: 24 } }} />
          )}
        </IconButton>

        {/* Movie Poster */}
        <CardMedia
          component="img"
          image={movie.poster || 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.title}
          className="movie-poster"
          onLoad={() => setImageLoaded(true)}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: imageLoaded ? 1 : 0,
          }}
        />

        {/* Loading Skeleton */}
        {!imageLoaded && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, rgba(40,40,40,0.8) 0%, rgba(60,60,60,0.8) 50%, rgba(40,40,40,0.8) 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              '@keyframes shimmer': {
                '0%': { backgroundPosition: '-200% 0' },
                '100%': { backgroundPosition: '200% 0' },
              },
            }}
          />
        )}

        {/* Overlay */}
        <Box
          className="movie-overlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.95) 100%)',
            opacity: isMobile ? 0.6 : 0,
            transition: 'opacity 0.4s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Play Button */}
          <IconButton
            className="play-button"
            sx={{
              transform: isMobile ? 'scale(0.8)' : 'scale(0)',
              opacity: isMobile ? 0.9 : 0,
              transition: 'all 0.3s ease',
              background: 'rgba(229, 9, 20, 0.95)',
              color: 'white',
              width: { xs: 50, sm: 64 },
              height: { xs: 50, sm: 64 },
              '&:hover': {
                background: '#e50914',
                transform: 'scale(1.1)',
              },
            }}
          >
            <PlayArrow sx={{ fontSize: { xs: 28, sm: 36 } }} />
          </IconButton>
        </Box>

        {/* Quick Info Overlay - Bottom */}
        <Box
          className="movie-info"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: { xs: 1.5, sm: 2 },
            background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.95) 40%)',
            transform: isMobile ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.4s ease',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating
              value={movie.rating / 2}
              precision={0.1}
              readOnly
              size={isMobile ? 'small' : 'medium'}
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#ffc107',
                },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 700,
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
              }}
            >
              {movie.rating}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Content Section */}
      <CardContent
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 2.5 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title */}
        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          sx={{
            fontWeight: 700,
            mb: 1.5,
            color: 'white',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: { xs: '2.5em', sm: '3.2em' },
            lineHeight: 1.3,
            fontSize: { xs: '1rem', sm: '1.1rem' },
          }}
        >
          {movie.title}
        </Typography>

        {/* Rating Section - Horizontal */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1.5,
            pb: 1.5,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Star sx={{ color: '#ffc107', fontSize: { xs: 18, sm: 20 } }} />
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 700,
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
              }}
            >
              {movie.rating}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
              }}
            >
              /10
            </Typography>
          </Box>

          <Tooltip title="More Info" arrow>
            <IconButton
              size="small"
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                '&:hover': {
                  color: '#e50914',
                  background: 'rgba(229, 9, 20, 0.1)',
                },
              }}
            >
              <Info fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Meta Info */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            mb: 1.5,
            flexWrap: 'wrap',
          }}
        >
          <Chip
            icon={<CalendarToday sx={{ fontSize: { xs: 14, sm: 16 } }} />}
            label={movie.year}
            size="small"
            sx={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              fontWeight: 600,
              height: { xs: 24, sm: 26 },
              '& .MuiChip-icon': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          />
          <Chip
            icon={<AccessTime sx={{ fontSize: { xs: 14, sm: 16 } }} />}
            label={`${movie.duration} min`}
            size="small"
            sx={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              fontWeight: 600,
              height: { xs: 24, sm: 26 },
              '& .MuiChip-icon': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          />
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.65)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            lineHeight: 1.6,
            mb: 1.5,
            flexGrow: 1,
          }}
        >
          {movie.description}
        </Typography>

        {/* Genres */}
        {movie.genres && movie.genres.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              flexWrap: 'wrap',
              mt: 'auto',
            }}
          >
            {movie.genres.slice(0, 3).map((genre, index) => (
              <Chip
                key={index}
                label={genre}
                size="small"
                sx={{
                  background: 'rgba(229, 9, 20, 0.15)',
                  color: '#ff6b6b',
                  border: '1px solid rgba(229, 9, 20, 0.25)',
                  fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  fontWeight: 600,
                  height: { xs: 20, sm: 22 },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(229, 9, 20, 0.25)',
                    borderColor: 'rgba(229, 9, 20, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;