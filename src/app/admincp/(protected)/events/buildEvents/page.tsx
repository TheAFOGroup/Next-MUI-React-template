import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';

const Page = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted!');
    console.log('Event Name:', eventName);
    console.log('Event Description:', eventDescription);
    console.log('Event Date:', eventDate);
    console.log('Event Location:', eventLocation);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="column" >
        <Grid item xs={12}>
          <TextField
            label="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Event Date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Event Location"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Page;