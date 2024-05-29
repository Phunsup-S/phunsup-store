import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useUser } from './UserContext';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';

export default function Navbar() {
  const { userId, displayName, pictureUrl, isLoggedIn, login, logout } = useUser();

  const pages = ['Products', 'Pricing', 'Blog'];
  const settings1 = ['Profile'];

  const settings = [displayName];


  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleTitleClick = () => {
    window.location.href = '/';
  };

  const handleAdminClick = () => {
    window.location.href = '/Admin';
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="bg-[#9e958a] flex items-center justify-center" style={{ height: '38px' }}>
        <p style={{ color: 'black', cursor: 'pointer' }} onClick={handleAdminClick}>
          Welcome to our website wish you have fun!
        </p>
      </div>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt="Profile Picture" src={pictureUrl} sx={{ mr: 2 }} />
            <p>{displayName}</p>
          </Box> */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile Picture" src={pictureUrl} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px', }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn ? (
                settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu} 
                  sx={{ 
                    backgroundColor: 'black', 
                    color: '#9e958a',
                    '&:hover': {
                      backgroundColor: '#333',
                    }
                  }}>
                    <Typography sx={{ color: '#9e958a' }} textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))
              ) : (
                <Button sx={{ 
                  backgroundColor: 'black', 
                  color: '#9e958a',
                  '&:hover': {
                    backgroundColor: '#333',
                  }
                }} onClick={login} color="inherit">Login</Button>
              )}
            </Menu>
          </Box>
          <Box
            sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', cursor: 'pointer' }}
            onClick={handleTitleClick}
          >
            <Typography variant="h4" component="div">
              Phunsup's Store
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isLoggedIn ? (
              <Button onClick={logout} color="inherit">Logout</Button>
            ) : (
              <Button onClick={login} color="inherit">Login</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Divider sx={{ bgcolor: '#9e958a' }} />
    </Box>
  );
}
