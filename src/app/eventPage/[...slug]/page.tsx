import { ThemeProvider, StyledEngineProvider, Box } from '@mui/material';
import { notFound } from 'next/navigation'
import React from 'react';


import DefaultTemplate from '@/components/events/template/DefaultTemplate';
import { EventTemplateTypes } from '@/components/events/template/types';

import { getD1Database } from '@/app/api/_lib/DBService/index';
import { GetEvent } from '@/app/api/events/getevent/GetEvent';
import { GetEventType } from '@/app/api/events/getevent/types';

const EventPage = async ({ params }: { params: { slug: string[] } }) => {
  const eventUUID = params.slug.join('/');
  const db = getD1Database();
  const event: GetEventType = await GetEvent(db, eventUUID);

  console.log(event);

  if (!event) {
    return notFound();
  }

  // Transform from GetEventType tp EventTemplateTypes
  const eventTemplate: EventTemplateTypes = {
    event_name: event.event_name,
    event_description: event.event_description,
    event_date: event.event_date,
    event_time: event.event_time,
    event_location: event.event_location,
    EventSpeaker: event.eventSpeaker,
    EventAgenda: event.eventAgenda?.map(agenda => ({
      ...agenda,
      events_agenda_start_time: agenda.events_agenda_start_time.toISOString(), // Convert to string
      events_agenda_end_time: agenda.events_agenda_end_time.toISOString() // Convert to string
    })),
    event_HTMLContent: event.event_HTMLContent,
    event_template: event.event_template,
    EventForm: event.eventForm
  }



  return (
    <Box>
      <DefaultTemplate eventDetails={eventTemplate} />
    </Box>
  )
};

export default EventPage;


