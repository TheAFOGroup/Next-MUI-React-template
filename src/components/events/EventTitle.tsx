'use client';

import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { notFound } from 'next/navigation'
import React, { useEffect, useState } from 'react';

import { Loading } from '@/components/Loading';

import { Event } from '@/app/api/events/getEventDetail/types';

interface EventTitleProp {
  eventDetails: Event
}

const EventTitle: React.FC<EventTitleProp> = ({ eventDetails }) => {
  console.log(eventDetails)
  return (
    <Box>
      <Typography variant="h1" component="div" gutterBottom>
        {eventDetails.event_name}
      </Typography>
      <Typography color="textSecondary" sx={{ mb: 1.5 }}>
        {eventDetails.event_description}
      </Typography>
      <Typography variant="h5">
        {eventDetails.event_location}
      </Typography>
      <Typography variant="h5">
        {eventDetails.event_date}   {eventDetails.event_time}
      </Typography>
    </Box>
  );
};

export default EventTitle;
/*

*/