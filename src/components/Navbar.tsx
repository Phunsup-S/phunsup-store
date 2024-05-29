import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useUser } from './UserContext';

export default function Navbar() {
  const { userId, displayName, pictureUrl, isLoggedIn, login, logout } = useUser();

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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt="Profile Picture" src={pictureUrl} sx={{ mr: 2 }} />
            <p>{displayName}</p>
          </Box>
          <Box
            sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', cursor: 'pointer' }}
            onClick={handleTitleClick}
          >
            <Typography variant="h5" component="div">
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
