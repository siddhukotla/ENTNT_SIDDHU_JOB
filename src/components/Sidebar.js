import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, ButtonBase } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Business as CompanyIcon,
  Message as MethodIcon,
  Dashboard as DashboardIcon,
  CalendarToday as CalendarIcon,
  Assessment as ReportIcon
} from '@mui/icons-material';

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          marginTop: '64px',
          backgroundColor: '#f5f5f5',
          borderRight: 'none'
        },
      }}
    >
      <List sx={{ p: 2 }}>
        <ButtonBase 
          component={Link}
          to="/dashboard"
          sx={{
            width: '100%',
            borderRadius: '8px',
            mb: 1,
            '&:hover': {
              backgroundColor: '#e0e0e0'
            }
          }}
        >
          <ListItem sx={{ width: '100%' }}>
            <ListItemIcon sx={{ color: '#1a237e' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Dashboard" 
              primaryTypographyProps={{ 
                fontWeight: 'medium',
                color: '#1a237e'
              }} 
            />
          </ListItem>
        </ButtonBase>
      </List>
      
      <Divider />
      
      <List sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: '#616161' }}>
          Admin Module
        </Typography>
        {[
          { text: 'Company Management', icon: <CompanyIcon />, path: '/company-management' },
          { text: 'Communication Method', icon: <MethodIcon />, path: '/communication-method-management' }
        ].map((item) => (
          <ListItem 
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              borderRadius: '8px',
              mb: 1,
              '&:hover': {
                backgroundColor: '#e0e0e0'
              }
            }}
          >
            <ListItemIcon sx={{ color: '#1a237e' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ 
                fontWeight: 'medium',
                color: '#1a237e'
              }} 
            />
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      <List sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: '#616161' }}>
          User Module
        </Typography>
        {[
          { text: 'Calendar View', icon: <CalendarIcon />, path: '/calendar' },
          { text: 'Reports', icon: <ReportIcon />, path: '/reports' }
        ].map((item) => (
          <ListItem 
            button={true}
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              borderRadius: '8px',
              mb: 1,
              '&:hover': {
                backgroundColor: '#e0e0e0'
              }
            }}
          >
            <ListItemIcon sx={{ color: '#1a237e' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ 
                fontWeight: 'medium',
                color: '#1a237e'
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
