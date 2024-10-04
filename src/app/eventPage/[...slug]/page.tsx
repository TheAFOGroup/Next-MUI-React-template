"use client";

import { Alert, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import DefaultTemplate from '@/components/events/template/DefaultTemplate';
import { EventTemplateTypes } from '@/components/events/template/types';

import { GetEventType } from '@/app/api/events/getevent/types';
import { SubmitFormType, SubmmitField } from '@/app/api/forms/submitform/types';


const EventPage = ({ params }: { params: { slug: string[] } }) => {
  const router = useRouter();
  const cookie = "event_form_submitted_" + params.slug.join('_');

  const eventURL = params.slug.join('/');
  const [alert, setAlert] = useState("");
  const [event, setEvent] = useState<GetEventType>({
    event_id: 0,
    event_name: "",
    event_owner: "",
    created_at: dayjs(),
    updated_at: dayjs()
  });
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [notfound, setNotFound] = useState(false);


  const header = {
    'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
  }

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_HOST + '/api/events/getevent', {
      params: {
        url: eventURL
      },
      headers: header
    })
      .then(response => {
        const data = response.data;
        setEvent(data as GetEventType);
      })
      .catch(error => {
        console.error(error);
        if (error.response?.status === 404) {
          setNotFound(true);
        }
      });
  }, []);

  if (notfound) {
    router.push('/404');
    return <></>;
  }

  const handleSubmit = async (fields: SubmmitField[]) => {
    const data: SubmitFormType = {
      form_id: event.eventForm?.form_id ?? 0,
      form_fields: fields
    }

    axios({
      method: 'post',
      url: process.env.NEXT_PUBLIC_HOST + '/api/forms/submitform',
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
      }
    }).then((res) => {
      console.log(res.data)

      // set cookies for this form in client side
      setFormSubmitted(true);

      Cookies.set(cookie, 'true', { path: '/' });
    })
      .catch((error) => {
        if (error.response?.data?.message) {
          setAlert(error.response.data.message);
        } else {
          setAlert('An error occurred');
        }
      })
  };

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
    EventForm: {
      form_id: event.eventForm?.form_id ?? 0,
      form_name: event.eventForm?.form_name ?? "",
      form_description: event.eventForm?.form_description ?? "",
      form_fields: event.eventForm?.form_fields ?? [],
      form_on_submit: handleSubmit
    }
  }


  const handleNewForm = () => {
    setFormSubmitted(false);
    setAlert("");
  };
  /*
    if (params.slug[params.slug.length - 1] === "streaming") {
      // Do something if the last element of params.slug is "stream"
      return <p>Streaming</p>;
    }
  
    if (cookie && Cookies.get(cookie)) {
      router.push("streaming");
    }
  */
  // After form is submitted, maybe push the url and show streaming page
  if (formSubmitted) {
    return (
      <div>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h3">Form Submitted Successfully</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleNewForm}>
              Start New Form
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
  return (
    <Grid container spacing={2} direction="column" >
      <DefaultTemplate eventDetails={eventTemplate} />

      {
        alert.length ?
          <Grid item>
            <Alert severity="error">
              {alert}
            </Alert>
          </Grid>
          :
          <></>
      }
    </Grid>
  )
};

export default EventPage;


