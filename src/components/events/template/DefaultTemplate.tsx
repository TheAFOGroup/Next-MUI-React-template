import { Grid, Typography } from '@mui/material';
import React from 'react';

import EventAgendaTable from '@/components/events/EventAgendaTable/EventAgendaTable';
import MediaGrid from '@/components/events/MeidaCard/MediaGrid';
import Form from '@/components/form/form';

import { EventTemplateTypes } from './types';
interface DefaultTemplateProp {
  eventDetails: EventTemplateTypes;
}

const DefaultTemplate: React.FC<DefaultTemplateProp> = async ({ eventDetails }) => {
  console.log("eventDetails", eventDetails)
  if (eventDetails.EventAgenda?.[0]?.events_agenda_title === ""
    && eventDetails.EventAgenda.length === 1) {
    eventDetails.EventAgenda = []
  }

  // Transform the image URL to a Cloudflare Image Delivery URL
  eventDetails.EventSpeaker?.forEach((speaker) => {
    speaker.events_speaker_image_url = `${process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_DELIVERY_URL}/${speaker.events_speaker_image_url}/250x250`;
    console.log("speaker", speaker)
  })

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
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
          {eventDetails.event_date?.format("DD/MM/YY")}   {eventDetails.event_time?.format("HH:mm")}
        </Typography>
      </Grid>
      {eventDetails.EventAgenda &&
        <Grid item xs={12}>
          <EventAgendaTable agenda={eventDetails.EventAgenda} />
        </Grid>
      }
      {eventDetails.EventSpeaker && <Grid item xs={12}>
        <MediaGrid speakers={eventDetails.EventSpeaker} />
      </Grid>
      }

      <Grid item xs={12}>
        <div dangerouslySetInnerHTML={{ __html: eventDetails.event_HTMLContent || "" }} />
      </Grid>

      {eventDetails.EventForm &&
        <Grid item xs={12}>
          <Form form={eventDetails.EventForm} />
        </Grid>
      }
    </Grid>


  );
};

export default DefaultTemplate;