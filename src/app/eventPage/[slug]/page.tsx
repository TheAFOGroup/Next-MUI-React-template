"use client"

import { Box } from '@mui/material';
import axios from 'axios';
import { notFound } from 'next/navigation'
import React, { useEffect, useState } from 'react';

import { Loading } from '@/components/Loading';

import { Event } from '@/app/api/events/getEventDetail/types';


const EventPage = ({ params }: { params: { slug: string } }) => {
  const eventUUID = params.slug

  const [eventDetails, setEventDetails] = useState<Event[]>([]);

  const [loading, setLoading] = useState(true);

  const header = {
    'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/events/getEventDetail', {
          params: {
            event_UUID: eventUUID
          },
          headers: header
        });
        const data = response.data;
        data.uuid
        setEventDetails(data as Event[]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
    </Box>
  )
};

export default EventPage;


