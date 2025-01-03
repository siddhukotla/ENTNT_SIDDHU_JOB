import React from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import CompanyManagement from './pages/CompanyManagement';
import CommunicationMethodManagement from './pages/CommunicationMethodManagement';
import CalendarView from './pages/CalendarView';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Box sx={{ display: 'flex' }}>
          <Header />
          <Sidebar />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1,
              p: 3,
              marginTop: '64px' // To account for AppBar height
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/company-management" element={<CompanyManagement />} />
              <Route path="/communication-method-management" element={<CommunicationMethodManagement />} />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </Box>
        </Box>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
