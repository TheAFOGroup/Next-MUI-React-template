"use client"
import React, { useState } from 'react';
import { useEventContext } from '@/hooks/useEventContext/useEventContext';
import { EventTemplate } from '@/components/events/template/types';
import axios from 'axios';
const EventPreviewPage = () => {
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
  const [eventTemplate, setEventTemplate] = useState<EventTemplate>();

  /*
  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_HOST + '/api/events/getSpeakers', {
      params: {
        events_speaker_id: eventId
      },
      headers: {
        'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
      }
    })
      .then(response => {
        const data = response.data;
        setSpeakers(data as Speaker[]);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);


  const event: EventTemplate = {
    event_name: eventName,
    event_description: eventDescription,
    event_date: eventDate ? eventDate.toString() : '',
    event_time: '', // Add the appropriate value for event_time
    event_location: eventLocation,
    EventSpeaker: eventSpeakers,
    EventAgenda: eventAgenda
  };

  // Use the event object as needed
  console.log("event:", event);

  console.log("eventName:", eventName)
  if (template === "Default") {
    return (
      <div>
        <h1>{eventName}</h1>
        <p>{eventDescription}</p>
      </div>
    );
  }
*/
  return (
    <div>
      <h1>{eventName}</h1>
      <p>{eventDescription}</p>
    </div>
  );
};

export default EventPreviewPage;