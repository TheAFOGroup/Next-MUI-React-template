"use client"

import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { notFound } from 'next/navigation'
import React, { useEffect, useState } from 'react';

import { Loading } from '@/components/Loading';

import { Event } from '@/app/api/events/getEventDetail/types';
import EventTitle from '@/components/events/EventTitle';
import MediaGrid from '@/components/events/MediaGrid';
import ScrollCards from '@/components/events/Scrollcards/ScrollCard';
import EventAgendaTable from '@/components/events/EventAgendaTable';
import EventIframeGrid from '@/components/events/EventIframeGrid';

const EventPage = ({ params }: { params: { slug: string } }) => {
  const eventUUID = params.slug
  const [eventDetails, setEventDetails] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_HOST + '/api/events/getEventDetail', {
      params: {
        event_UUID: eventUUID
      },
      headers: {
        'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
      }
    })
      .then(response => {
        const data = response.data;
        data.uuid
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
      <EventTitle eventDetails={eventDetails[0]}></EventTitle>
      <MediaGrid eventId={eventDetails[0].event_id}></MediaGrid>
      <ScrollCards eventId={eventDetails[0].event_id}></ScrollCards>
      <EventAgendaTable eventId={eventDetails[0].event_id} />
      <EventIframeGrid eventId={eventDetails[0].event_id} />
    </Box>
  )
};

export default EventPage;


