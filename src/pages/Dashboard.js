import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DataGrid } from '@mui/x-data-grid';
import { Email, Phone, LinkedIn } from '@mui/icons-material';
import { format, isBefore, isToday } from 'date-fns';

// Communication type icons
const communicationIcons = {
  Email: <Email fontSize="small" />,
  Call: <Phone fontSize="small" />,
  LinkedIn: <LinkedIn fontSize="small" />
};

const columns = [
  { 
    field: 'company', 
    headerName: 'Company', 
    width: 200 
  },
  { 
    field: 'lastCommunications', 
    headerName: 'Last 5 Communications', 
    width: 300,
    renderCell: (params) => (
      <List dense sx={{ py: 0 }}>
        {params.value.map((comm, index) => (
          <ListItem key={index} sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              {communicationIcons[comm.type]}
            </ListItemIcon>
            <ListItemText
              primary={`${comm.type}`}
              secondary={format(new Date(comm.date), 'MMM do')}
            />
          </ListItem>
        ))}
      </List>
    )
  },
  { 
    field: 'nextCommunication', 
    headerName: 'Next Scheduled', 
    width: 250,
    renderCell: (params) => {
      const isOverdue = isBefore(new Date(params.value.date), new Date());
      const isDueToday = isToday(new Date(params.value.date));
      
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {communicationIcons[params.value.type]}
          <Box>
            <Typography variant="body2">
              {params.value.type}
            </Typography>
            <Typography 
              variant="caption"
              sx={{ 
                color: isOverdue ? 'error.main' : 'text.secondary',
                fontWeight: isDueToday ? 'bold' : 'normal'
              }}
            >
              {format(new Date(params.value.date), 'MMM do')}
            </Typography>
          </Box>
        </Box>
      );
    }
  },
  { 
    field: 'status', 
    headerName: 'Status', 
    width: 150,
    renderCell: (params) => {
      const statusColor = params.value === 'Overdue' ? 'error' : 
                         params.value === 'Due Soon' ? 'warning' : 'success';
      
      return (
        <Tooltip title={params.value}>
          <Chip 
            label={params.value}
            color={statusColor}
            size="small"
            sx={{ 
              fontWeight: 'bold',
              width: '100%'
            }}
          />
        </Tooltip>
      );
    }
  }
];

// Sample data with proper date objects
const rows = [
  { 
    id: 1,
    company: 'Acme Corp',
    lastCommunications: [
      { type: 'Email', date: new Date(2023, 8, 1) },
      { type: 'Call', date: new Date(2023, 7, 28) },
      { type: 'LinkedIn', date: new Date(2023, 7, 21) }
    ],
    nextCommunication: {
      type: 'LinkedIn Post',
      date: new Date(2023, 8, 15)
    },
    status: 'On Track'
  },
  { 
    id: 2,
    company: 'Globex',
    lastCommunications: [
      { type: 'Email', date: new Date(2023, 7, 30) },
      { type: 'Call', date: new Date(2023, 7, 25) }
    ],
    nextCommunication: {
      type: 'Email',
      date: new Date(2023, 8, 10)
    },
    status: 'Due Soon'
  }
];

function Dashboard() {
  // Calculate status based on dates
  const enhancedRows = rows.map(row => {
    const isOverdue = isBefore(new Date(row.nextCommunication.date), new Date());
    const isDueToday = isToday(new Date(row.nextCommunication.date));
    
    return {
      ...row,
      status: isOverdue ? 'Overdue' : 
              isDueToday ? 'Due Today' : 
              isBefore(new Date(), new Date(row.nextCommunication.date)) ? 'On Track' : 'Due Soon'
    };
  });

  // Calculate summary metrics
  const summaryData = {
    totalCompanies: enhancedRows.length,
    overdue: enhancedRows.filter(row => row.status === 'Overdue').length,
    dueToday: enhancedRows.filter(row => row.status === 'Due Today').length,
    onTrack: enhancedRows.filter(row => row.status === 'On Track').length
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Communication Dashboard
          </Typography>
          
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => <TextField {...params} sx={{ width: 200 }} />}
          />
        </Box>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ 
            p: 3, 
            backgroundColor: 'primary.light',
            color: 'primary.contrastText',
            borderRadius: 2,
            boxShadow: 3
          }}>
            <Typography variant="h6" gutterBottom>
              Total Companies
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {summaryData.totalCompanies}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ 
            p: 3, 
            backgroundColor: 'error.light',
            color: 'error.contrastText',
            borderRadius: 2,
            boxShadow: 3
          }}>
            <Typography variant="h6" gutterBottom>
              Overdue
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {summaryData.overdue}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ 
            p: 3, 
            backgroundColor: 'warning.light',
            color: 'warning.contrastText',
            borderRadius: 2,
            boxShadow: 3
          }}>
            <Typography variant="h6" gutterBottom>
              Due Today
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {summaryData.dueToday}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ 
            p: 3, 
            backgroundColor: 'success.light',
            color: 'success.contrastText',
            borderRadius: 2,
            boxShadow: 3
          }}>
            <Typography variant="h6" gutterBottom>
              On Track
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {summaryData.onTrack}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Overdue Communications */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-2px)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ 
                width: 8,
                height: 40,
                backgroundColor: 'error.main',
                borderRadius: 1,
                mr: 2
              }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Overdue Communications
              </Typography>
            </Box>
            <Box sx={{ height: 300 }}>
              <DataGrid
                rows={enhancedRows.filter(row => row.status === 'Overdue')}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                sx={{
                  border: 0,
                  '& .MuiDataGrid-cell': {
                    borderBottom: '1px solid rgba(224, 224, 224, 0.5)'
                  },
                  '& .MuiDataGrid-cell--statusOverdue': {
                    backgroundColor: 'error.light',
                    '&:hover': {
                      backgroundColor: 'error.main'
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Today's Communications */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-2px)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ 
                width: 8,
                height: 40,
                backgroundColor: 'warning.main',
                borderRadius: 1,
                mr: 2
              }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Today's Communications
              </Typography>
            </Box>
            <Box sx={{ height: 300 }}>
              <DataGrid
                rows={enhancedRows.filter(row => row.status === 'Due Today')}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                sx={{
                  border: 0,
                  '& .MuiDataGrid-cell': {
                    borderBottom: '1px solid rgba(224, 224, 224, 0.5)'
                  },
                  '& .MuiDataGrid-cell--statusDueToday': {
                    backgroundColor: 'warning.light',
                    '&:hover': {
                      backgroundColor: 'warning.main'
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* All Companies */}
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-2px)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ 
                width: 8,
                height: 40,
                backgroundColor: 'primary.main',
                borderRadius: 1,
                mr: 2
              }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                All Companies
              </Typography>
            </Box>
            <Box sx={{ height: 400 }}>
              <DataGrid
                rows={enhancedRows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                sx={{
                  border: 0,
                  '& .MuiDataGrid-cell': {
                    borderBottom: '1px solid rgba(224, 224, 224, 0.5)'
                  }
                }}
                getRowClassName={(params) => 
                  `MuiDataGrid-cell--status${params.row.status.replace(/\s+/g, '')}`
                }
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </LocalizationProvider>
  );
}

export default Dashboard;