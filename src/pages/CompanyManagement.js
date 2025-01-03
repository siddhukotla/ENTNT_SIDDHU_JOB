import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

function CompanyManagement() {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    linkedin: '',
    emails: '',
    phones: '',
    comments: '',
    periodicity: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCompany = () => {
    if (formData.name.trim() === '') return;
    setCompanies(prev => [...prev, formData]);
    setFormData({
      name: '',
      location: '',
      linkedin: '',
      emails: '',
      phones: '',
      comments: '',
      periodicity: ''
    });
  };

  const handleDeleteCompany = (index) => {
    setCompanies(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Company Management
      </Typography>
      
      {/* Add Company Form */}
      <Box component={Paper} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Add New Company</Typography>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <TextField
            name="name"
            label="Company Name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            name="location"
            label="Location"
            value={formData.location}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="linkedin"
            label="LinkedIn Profile"
            value={formData.linkedin}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="emails"
            label="Emails (comma separated)"
            value={formData.emails}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="phones"
            label="Phone Numbers (comma separated)"
            value={formData.phones}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="comments"
            label="Comments"
            value={formData.comments}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            name="periodicity"
            label="Communication Periodicity"
            value={formData.periodicity}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={handleAddCompany}
          sx={{ mt: 2 }}
        >
          Add Company
        </Button>
      </Box>

      {/* Companies List */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>LinkedIn</TableCell>
              <TableCell>Emails</TableCell>
              <TableCell>Phones</TableCell>
              <TableCell>Periodicity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company, index) => (
              <TableRow key={index}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>
                  {company.linkedin && (
                    <a href={company.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  )}
                </TableCell>
                <TableCell>{company.emails}</TableCell>
                <TableCell>{company.phones}</TableCell>
                <TableCell>{company.periodicity}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteCompany(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CompanyManagement;
