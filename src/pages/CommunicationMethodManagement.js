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
  IconButton,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { Add, Delete, DragIndicator } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const defaultMethods = [
  { name: 'LinkedIn Post', description: 'Post on company LinkedIn page', sequence: 1, mandatory: true },
  { name: 'LinkedIn Message', description: 'Send message on LinkedIn', sequence: 2, mandatory: true },
  { name: 'Email', description: 'Send email to company', sequence: 3, mandatory: true },
  { name: 'Phone Call', description: 'Call company representative', sequence: 4, mandatory: false },
  { name: 'Other', description: 'Other communication method', sequence: 5, mandatory: false }
];

function CommunicationMethodManagement() {
  const [methods, setMethods] = useState(defaultMethods);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    mandatory: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMethod = () => {
    if (formData.name.trim() === '') return;
    const newMethod = {
      ...formData,
      sequence: methods.length + 1
    };
    setMethods(prev => [...prev, newMethod]);
    setFormData({
      name: '',
      description: '',
      mandatory: false
    });
  };

  const handleDeleteMethod = (index) => {
    setMethods(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(methods);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update sequence numbers
    const updatedMethods = items.map((method, index) => ({
      ...method,
      sequence: index + 1
    }));
    
    setMethods(updatedMethods);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Communication Method Management
      </Typography>
      
      {/* Add Method Form */}
      <Box component={Paper} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Add New Method</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            name="name"
            label="Method Name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                name="mandatory"
                checked={formData.mandatory}
                onChange={(e) => setFormData(prev => ({ ...prev, mandatory: e.target.checked }))}
              />
            }
            label="Mandatory"
          />
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={handleAddMethod}
          sx={{ mt: 2 }}
        >
          Add Method
        </Button>
      </Box>

      {/* Methods List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="methods">
          {(provided) => (
            <TableContainer 
              component={Paper}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sequence</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Mandatory</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {methods.map((method, index) => (
                    <Draggable key={method.name} draggableId={method.name} index={index}>
                      {(provided) => (
                        <TableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <TableCell {...provided.dragHandleProps}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <DragIndicator />
                              {method.sequence}
                            </Box>
                          </TableCell>
                          <TableCell>{method.name}</TableCell>
                          <TableCell>{method.description}</TableCell>
                          <TableCell>
                            <Checkbox checked={method.mandatory} disabled />
                          </TableCell>
                          <TableCell>
                            <IconButton color="error" onClick={() => handleDeleteMethod(index)}>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}

export default CommunicationMethodManagement;
