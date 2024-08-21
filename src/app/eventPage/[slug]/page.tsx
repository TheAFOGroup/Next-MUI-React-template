import MediaGrid from "@/components/events/MediaGrid";
import { Box } from "@mui/material";


const EventPage = ({ params }: { params: { slug: string } }) => {
  const eventId = params.slug
  return (
    <Box>
      <p>Event Id: {params.slug}</p>
      <MediaGrid eventId={eventId}></MediaGrid>
    </Box>

  )

}

export default EventPage;