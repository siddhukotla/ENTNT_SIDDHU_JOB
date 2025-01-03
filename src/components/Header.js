import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from '@mui/material';
import { Notifications, AccountCircle } from '@mui/icons-material';

function Header() {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#1a237e',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
      }}
    >
      <Toolbar sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
        padding: '0 24px'
      }}>
        <Typography 
          variant="h6" 
          noWrap 
          component="div"
          sx={{
            fontWeight: 'bold',
            letterSpacing: '1px',
            color: '#ffffff'
          }}
        >
          COMMUNICATION TRACKER
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
