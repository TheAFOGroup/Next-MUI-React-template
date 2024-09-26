"use client"
import React, { useState, useEffect } from 'react';
import { useEventContext } from '@/hooks/useEventContext/useEventContext';
import { EventTemplateTypes } from '@/components/events/template/types';
import { GetSpeakersRespond } from '@/app/api/speaker/getspeakers/types';
import { EventAgenda } from '@/app/api/events/getEventsAgenda/types';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Button } from '@mui/material';
import DefaultTemplate from '@/components/events/template/DefaultTemplate';

const EventPreviewPage = () => {
  const { data: session } = useSession();
  const {
    eventName,
    eventDescription,
    eventDate,
    eventTime,
    eventLocation,
    eventAgenda,
    eventSpeakers,
    selectedForm,
    htmlContent,
    template
  } = useEventContext();

  const event: EventTemplateTypes = {
    event_name: eventName,
    event_description: eventDescription,
    event_date: eventDate || undefined,
    event_time: eventTime || undefined,
    event_location: eventLocation,
    EventSpeaker: eventSpeakers,
    EventAgenda: eventAgenda,
  };

  console.log('event', event);

  return (
    <div>
      <Button onClick={() => history.back()}>Go Back</Button>
      <DefaultTemplate eventDetails={event}></DefaultTemplate>
    </div >
  )
};

export default EventPreviewPage;