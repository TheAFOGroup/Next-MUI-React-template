"use client"
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useEventContext } from '@/hooks/useEventContext/useEventContext';

import DefaultTemplate from '@/components/events/template/DefaultTemplate';
import { EventTemplateTypes } from '@/components/events/template/types';

import { getD1Database } from '@/app/api/_lib/DBService/index';
import { GetForm } from '@/app/api/forms/getform/getform';
import { Form } from '@/components/events/template/types';
const EventPreviewPage = () => {
  const {
    eventName,
    eventDescription,
    eventDate,
    eventTime,
    eventLocation,
    eventAgenda,
    eventSpeakers,
    selectedFormUUID,
    htmlContent,
    template
  } = useEventContext();

  const [form, setForm] = useState<Form | null>(null);

  useEffect(() => {
    const header = {
      'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
    }
    axios.get(process.env.NEXT_PUBLIC_HOST + '/api/forms/getform', {
      params: {
        form_uuid: selectedFormUUID
      },
      headers: header
    })
      .then(response => {
        const data = response.data;
        setForm(data as Form);
      })
      .catch(error => console.error(error));
  }, [selectedFormUUID]);

  const event: EventTemplateTypes = {
    event_name: eventName,
    event_description: eventDescription,
    event_date: eventDate || undefined,
    event_time: eventTime || undefined,
    event_location: eventLocation,
    EventSpeaker: eventSpeakers,
    EventAgenda: eventAgenda,
    event_HTMLContent: htmlContent,
    event_template: template,
    EventForm: form || undefined
  };

  console.log('event', event);

  return (
    <div>
      <Button onClick={() => history.back()}>Go Back</Button>
      <DefaultTemplate eventDetails={event} ></DefaultTemplate>
    </div >
  )
};

export default EventPreviewPage;