"use client"
import React from 'react';
import { useEventContext } from '@/hooks/useEventContext/useEventContext';
const EventPreviewPage = () => {
  const {
    eventName, setEventName,
    eventDescription, setEventDescription,
    eventDate, setEventDate,
    eventLocation, setEventLocation,
    eventAgenda, setEventAgenda,
    eventSpeakers, setEventSpeakers,
    selectedForm, setSelectedForm,
    htmlContent, setHtmlContent
  } = useEventContext();

  console.log("eventName:", eventName)
  return (
    <div>
      <h1>{eventName}</h1>
      <p>{eventDescription}</p>
    </div>
  );
};

export default EventPreviewPage;