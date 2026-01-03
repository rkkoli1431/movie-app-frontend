// frontend/src/components/Navbar.jsx
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Movie, Search, Dashboard, Logout, Login } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Movie sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          MovieDB
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<Movie />}
          >
            Movies
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/search"
            startIcon={<Search />}
          >
            Search
          </Button>

          {isAdmin() && (
            <Button
              color="inherit"
              component={Link}
              to="/admin"
              startIcon={<Dashboard />}
            >
              Admin
            </Button>
          )}

          {user ? (
            <>
              <Typography sx={{ alignSelf: 'center', mx: 2 }}>
                {user.name}
              </Typography>
              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<Logout />}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              startIcon={<Login />}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;