'use client';

import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { notFound } from 'next/navigation'
import React, { useEffect, useState } from 'react';

import { Loading } from '@/components/Loading';

import { Event } from '@/app/api/events/getEventDetail/types';

interface EventTitleProp {
  eventId: string
}

const EventTitle: React.FC<EventTitleProp> = ({ eventId }) => {
  const [eventDetails, setEventDetails] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_HOST + '/api/events/getEventDetail', {
      params: {
        event_id: eventId
      },
      headers: {
        'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
      }
    })
      .then(response => {
        const data = response.data;
        setEventDetails(data as Event[]);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  if (loading) {
    return (
      <Loading />
    )
  }
  if (eventDetails.length === 0) {
    notFound()
  }
  return (
    <Box>
      <Typography variant="h1" component="div" gutterBottom>
        {eventDetails[0].event_name}
      </Typography>
      <Typography color="textSecondary" sx={{ mb: 1.5 }}>
        {eventDetails[0].event_description}
      </Typography>
      <Typography variant="h5">
        {eventDetails[0].event_location}
      </Typography>
      <Typography variant="h5">
        {eventDetails[0].event_date}   {eventDetails[0].event_time}
      </Typography>
    </Box>
  );
};

export default EventTitle;
/*

*/