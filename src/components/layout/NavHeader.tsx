import { useAuth } from '@/hooks';
import { APP_ROUTES } from '@/lib';
import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  AccountCircle as ProfileIcon,
  LocalOffer as PromotionsIcon,
  FlightTakeoff as TripsIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NavHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleMenuClose();
    navigate(APP_ROUTES.LOGIN.path);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    navigate(APP_ROUTES.HOME.path);
  };

  const handleProfile = () => {
    handleMenuClose();
    // TODO: Navigate to profile page
    console.log('Navigate to profile');
  };

  const handleMyTrips = () => {
    handleMenuClose();
    // TODO: Navigate to my trips page
    console.log('Navigate to my trips');
  };

  const handlePromotions = () => {
    handleMenuClose();
    // TODO: Navigate to promotions page
    console.log('Navigate to promotions');
  };

  const handleBrandClick = () => {
    navigate(APP_ROUTES.HOME.path);
  };

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Brand */}
        <Box
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={handleBrandClick}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Amadeus Travel
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              display: { xs: 'block', sm: 'none' },
            }}
          >
            AT
          </Typography>
        </Box>

        {/* User Menu */}
        <Box>
          <IconButton
            size="large"
            edge="end"
            aria-label="user menu"
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <PersonIcon />
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: { minWidth: 200 },
            }}
          >
            {isAuthenticated && user ? (
              [
                <Box key="user-info" sx={{ px: 2, py: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {user.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>,
                <Divider key="divider1" />,
                <MenuItem key="profile" onClick={handleProfile}>
                  <ListItemIcon>
                    <ProfileIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>,
                <MenuItem key="trips" onClick={handleMyTrips}>
                  <ListItemIcon>
                    <TripsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>My Trips</ListItemText>
                </MenuItem>,
                <MenuItem key="promotions" onClick={handlePromotions}>
                  <ListItemIcon>
                    <PromotionsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Promotions</ListItemText>
                </MenuItem>,
                <Divider key="divider2" />,
                <MenuItem key="logout" onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>,
              ]
            ) : (
              <MenuItem onClick={handleLogin}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Login</ListItemText>
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
