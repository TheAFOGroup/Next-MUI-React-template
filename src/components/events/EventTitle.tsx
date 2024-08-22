'use client';

import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Event } from '@/app/api/events/getEventDetail/types';
import { Loading } from '@/components/loading';

interface EventTitleProp {
  eventId: string
}

const EventTitle: React.FC<EventTitleProp> = ({ eventId }) => {
  const [eventDetails, setEventDetails] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events/getEventDetail?event_id=1")
      .then((response) => response.json()) // Return the JSON data here
      .then((data: unknown) => {
        setEventDetails(data as Event[])
        setLoading(false)
          ; // Set the state with the fetched data
      })
      .catch((error) => console.error(error));
  }, []);

  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <Box>
      <Typography variant="h5" component="div" gutterBottom>
        {eventDetails[0].event_name}
      </Typography>
      <Typography color="textSecondary" sx={{ mb: 1.5 }}>
        {eventDetails[0].event_description}
      </Typography>
      <Typography variant="body2">
        Location {eventDetails[0].event_location}
      </Typography>
      <Typography variant="body2">
        time {eventDetails[0].event_date} {eventDetails[0].event_time}
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        {eventDetails.length > 0 ? eventDetails[0].event_name : "Loading..."}
      </Typography>    </Box>
  );
};

export default EventTitle;
/*

*/