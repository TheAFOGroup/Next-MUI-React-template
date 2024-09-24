import React from 'react';
import { Event } from '@/app/api/events/getEventDetail/types';
import { Grid, Typography } from '@mui/material';

interface DefaultTemplateProp {
  eventDetails: Event;
}

const DefaultTemplate: React.FC<DefaultTemplateProp> = ({ eventDetails }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h1" component="div" gutterBottom>
          {eventDetails.event_name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color="textSecondary" sx={{ mb: 1.5 }}>
          {eventDetails.event_description}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {eventDetails.event_location}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5">
          {eventDetails.event_date}   {eventDetails.event_time}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DefaultTemplate;