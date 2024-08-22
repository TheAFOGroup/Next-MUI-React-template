import MediaGrid from "@/components/events/MediaGrid";
import { Box } from "@mui/material";
import EventTitle from "@/components/events/EventTitle";

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