import { Box } from "@mui/material";
import React from 'react';

import EventAgendaTable from "@/components/events/EventAgendaTable";
import EventTitle from "@/components/events/EventTitle";
import MediaGrid from "@/components/events/MediaGrid";
import ScrollCards from "@/components/events/Scrollcards/ScrollCard";


const EventPage = ({ params }: { params: { slug: string } }) => {
  const eventId = params.slug
  return (
    <Box>
      <p>Event Id: {params.slug}</p>
      <EventTitle eventId={eventId}></EventTitle>
      <MediaGrid eventId={eventId}></MediaGrid>
      <ScrollCards eventId={eventId}></ScrollCards>
      <EventAgendaTable eventId={eventId} />
    </Box>
  )
}

export default EventPage;