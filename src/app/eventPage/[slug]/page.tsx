import { Box } from "@mui/material";
import React from 'react';

import EventTitle from "@/components/events/EventTitle";
import MediaGrid from "@/components/events/MediaGrid";


const EventPage = ({ params }: { params: { slug: string } }) => {
  const eventId = params.slug
  return (
    <Box>
      <p>Event Id: {params.slug}</p>
      <EventTitle eventId={eventId}></EventTitle>
      <MediaGrid eventId={eventId}></MediaGrid>

    </Box>

  )

}

export default EventPage;
/*
      <EventTitle eventId={eventId}></EventTitle>
      <MediaGrid eventId={eventId}></MediaGrid>

*/