import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const communicationTypes = ['Email', 'LinkedIn', 'Phone Call', 'Meeting', 'Other'];

function CalendarView() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'LinkedIn Post - Acme Corp',
      start: new Date(2023, 9, 15, 10, 0),
      end: new Date(2023, 9, 15, 11, 0),
      type: 'LinkedIn',
      company: 'Acme Corp',
      notes: 'Posted about new product launch'
    },
    {
      id: 2,
      title: 'Email - Globex',
      start: new Date(2023, 9, 10, 14, 0),
      end: new Date(2023, 9, 10, 15, 0),
      type: 'Email',
      company: 'Globex',
      notes: 'Follow up on partnership proposal'
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    type: '',
    company: '',
    notes: ''
  });

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleCreateEvent = (slotInfo) => {
    setNewEvent({
      ...newEvent,
      start: slotInfo.start,
      end: slotInfo.end
    });
    setOpenDialog(true);
  };

  const handleSaveEvent = () => {
    if (selectedEvent) {
      // Update existing event
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id ? selectedEvent : event
      );
      setEvents(updatedEvents);
    } else {
      // Create new event
      const eventToAdd = {
        ...newEvent,
        id: events.length + 1,
        title: `${newEvent.type} - ${newEvent.company}`
      };
      setEvents([...events, eventToAdd]);
    }
    setOpenDialog(false);
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      start: new Date(),
      end: new Date(),
      type: '',
      company: '',
      notes: ''
    });
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter(event => event.id !== selectedEvent.id);
    setEvents(updatedEvents);
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Communication Calendar
      </Typography>
      
      <Paper sx={{ p: 2, height: 'calc(100vh - 200px)' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleCreateEvent}
          selectable
          style={{ height: '100%' }}
          views={['month', 'week', 'day']}
          defaultView="month"
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.type === 'Email' ? '#1976d2' :
                             event.type === 'LinkedIn' ? '#0e76a8' :
                             event.type === 'Phone Call' ? '#4caf50' :
                             event.type === 'Meeting' ? '#ff9800' : '#9c27b0',
              color: '#fff',
              borderRadius: '4px',
              border: 'none'
            }
          })}
        />
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {selectedEvent ? 'Edit Communication Event' : 'Create New Communication Event'}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Communication Type</InputLabel>
            <Select
              value={selectedEvent ? selectedEvent.type : newEvent.type}
              onChange={(e) => selectedEvent ? 
                setSelectedEvent({...selectedEvent, type: e.target.value}) :
                setNewEvent({...newEvent, type: e.target.value})}
              label="Communication Type"
            >
              {communicationTypes.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            margin="normal"
            fullWidth
            label="Company"
            value={selectedEvent ? selectedEvent.company : newEvent.company}
            onChange={(e) => selectedEvent ? 
              setSelectedEvent({...selectedEvent, company: e.target.value}) :
              setNewEvent({...newEvent, company: e.target.value})}
          />
          
          <TextField
            margin="normal"
            fullWidth
            label="Start Date & Time"
            type="datetime-local"
            value={selectedEvent ? 
              format(selectedEvent.start, "yyyy-MM-dd'T'HH:mm") : 
              format(newEvent.start, "yyyy-MM-dd'T'HH:mm")}
            onChange={(e) => selectedEvent ? 
              setSelectedEvent({...selectedEvent, start: new Date(e.target.value)}) :
              setNewEvent({...newEvent, start: new Date(e.target.value)})}
          />
          
          <TextField
            margin="normal"
            fullWidth
            label="End Date & Time"
            type="datetime-local"
            value={selectedEvent ? 
              format(selectedEvent.end, "yyyy-MM-dd'T'HH:mm") : 
              format(newEvent.end, "yyyy-MM-dd'T'HH:mm")}
            onChange={(e) => selectedEvent ? 
              setSelectedEvent({...selectedEvent, end: new Date(e.target.value)}) :
              setNewEvent({...newEvent, end: new Date(e.target.value)})}
          />
          
          <TextField
            margin="normal"
            fullWidth
            label="Notes"
            multiline
            rows={4}
            value={selectedEvent ? selectedEvent.notes : newEvent.notes}
            onChange={(e) => selectedEvent ? 
              setSelectedEvent({...selectedEvent, notes: e.target.value}) :
              setNewEvent({...newEvent, notes: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          {selectedEvent && (
            <Button onClick={handleDeleteEvent} color="error">
              Delete
            </Button>
          )}
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveEvent} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CalendarView;
