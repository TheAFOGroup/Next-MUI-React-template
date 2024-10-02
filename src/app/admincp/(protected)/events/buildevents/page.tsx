"use client"
import { Alert, Button, FormControl, Grid, Link, MenuItem, Select, TextField, Typography } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import 'dayjs/locale/en-gb';

import { useEventContext } from '@/hooks/useEventContext/useEventContext';

import DynamicAgendaList from '@/components/buildEventAgenda/DynamicAgendaList';
import { EventAgendaProps } from '@/components/buildEventAgenda/types';
import DynamicSpeakerDropDown from '@/components/DynamicSpeakerDropDown/DynamicSpeakerDropDown';
import { SpeakerDropDownOption } from '@/components/DynamicSpeakerDropDown/types';

import { BuildEventType } from '@/app/api/events/buildevent/types';
import { FormIndexRespond } from '@/app/api/forms/getformindex/types';
import { GetSpeakersRespond } from '@/app/api/speaker/getspeakers/types';

const Page = () => {
  const session = useSession().data
  const router = useRouter();

  const [eventSpeakersList, setEventSpeakersList] = useState<GetSpeakersRespond[]>([]);
  const [formList, setFormList] = useState<FormIndexRespond[]>([]);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [alert, setAlert] = useState<string>('');
  const [URL, setURL] = useState<string>('');

  const {
    eventName, setEventName,
    eventDescription, setEventDescription,
    eventDate, setEventDate,
    eventTime, setEventTime,
    eventLocation, setEventLocation,
    eventAgenda, setEventAgenda,
    eventSpeakers, setEventSpeakers,
    selectedFormUUID, setSelectedFormUUID,
    htmlContent, setHtmlContent,
    template, setTemplate,
    eventURL, setEventURL
  } = useEventContext();

  const templateOptions = ["Default", "Template 1", "Template 2", "Template 3"];

  // Fetch API result and update fields state
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/speaker/getspeakers?owner=' + session?.user?.email, {
          headers: {
            'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
          }
        });
        setEventSpeakersList(response.data as GetSpeakersRespond[]);
      } catch (error) {
        console.error('Error fetching speakers:', error);
      }
    };

    const fetchForms = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/forms/getformindex?owner=' + session?.user?.email, {
          headers: {
            'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
          }
        });
        setFormList(response.data as FormIndexRespond[]);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    const fetchData = async () => {
      await fetchSpeakers();
      await fetchForms();
    };

    fetchData();
  }, [session]);

  const transformSpeakersToDropDownOptions = (speakers: GetSpeakersRespond[]): SpeakerDropDownOption[] => {
    return speakers.map(speaker => ({
      events_speaker_id: speaker.events_speaker_id.toString(),
      events_speaker_name: speaker.events_speaker_name
    }));
  };

  // Transform speakers to value to presist the state of the dropdown
  const transformSpeakersToValue = (speakers: GetSpeakersRespond[]): string[] => {
    return speakers.map(speaker => (
      speaker.events_speaker_id.toString()
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check all the necessary fields are filled
    if (eventName === '') {
      setAlert('Event Name is required');
      return;
    }

    // Transform the props into BuildEventType
    const data: BuildEventType = {
      event_name: eventName,
      event_description: eventDescription,
      event_date: eventDate || undefined,
      event_time: eventTime || undefined,
      event_location: eventLocation,
      eventSpeaker: eventSpeakers.map(speaker => speaker.events_speaker_id),
      eventAgenda: eventAgenda.map(agenda => ({
        events_agenda_title: agenda.events_agenda_title,
        events_agenda_description: agenda.events_agenda_description,
        events_agenda_start_time: agenda.events_agenda_start_time,
        events_agenda_end_time: agenda.events_agenda_end_time
      })),
      event_HTMLContent: [htmlContent],
      event_template: template,
      event_form_id: formList.find(form => form.form_UUID == selectedFormUUID)?.form_id,
      event_owner: session?.user?.email || '',
      eventURL: eventURL
    };

    axios({
      method: 'post',
      url: process.env.NEXT_PUBLIC_HOST + '/api/events/buildevent',
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
      }
    }).then((res) => {
      console.log(res.data)
      setURL(res.data.respond.URL);
      setFormSubmitted(true);
    })
      .catch((error) => {
        setAlert(error.message || 'An error occurred');
      }).finally(() => {
        setAlert('An error occurred');
      })
  };

  const handleEventAgenda = useCallback((agenda: EventAgendaProps[]) => {
    // Don't set the event agenda if the agenda is empty
    if (JSON.stringify(agenda) !== JSON.stringify(eventAgenda)) {
      setEventAgenda(agenda)
    }
    console.log('Event Agenda:', agenda);
  }, [setEventAgenda, eventAgenda]);

  const handleEventSpeakers = useCallback((speakers: string[]) => {
    // find the entry in the list that that have the same speakers id

    const filteredSpeakers = eventSpeakersList.filter(speaker => speakers.includes(speaker.events_speaker_id.toString()));
    if (JSON.stringify(filteredSpeakers) !== JSON.stringify(eventSpeakers)) {
      setEventSpeakers(filteredSpeakers);
    }
    console.log('Selected Speakers:', eventSpeakers);
  }, [eventSpeakers, eventSpeakersList, setEventSpeakers]);

  const handleEventForm = async (e) => {
    setSelectedFormUUID(e.target.value as string)
    //console.log('Selected Form:', eventFormId);
  }

  const handleNewSpeaker = () => {
    // Handle starting a new speaker logic here
    setFormSubmitted(false);
    setEventName('');
    setEventDescription('');
    setEventDate(null);
    setEventTime(null);
    setEventLocation('');
    setEventAgenda([]);
    setEventSpeakers([]);
    setSelectedFormUUID('');
    setHtmlContent('');
    setTemplate('Default');
    setAlert('');
    setURL('');
  };

  if (formSubmitted) {
    return (
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h6">Form Submission Successful</Typography>
        </Grid>
        <Grid item>
          <Typography>Event page submitted successfully!</Typography>
        </Grid>
        <Grid item>
          <Link href={`${process.env.NEXT_PUBLIC_HOST}/eventPage/${URL}`} target="_blank" rel="noopener noreferrer">
            {`${process.env.NEXT_PUBLIC_HOST}/eventPage/${URL}`}
          </Link>
        </Grid>
        <Grid item>
          <Button onClick={handleNewSpeaker}>Start New Event</Button>
        </Grid>
      </Grid>
    )
  }

  // Location: Maybe use Google Maps API?
  // https://blog.openreplay.com/global-location-search-for-your-nextjs-app/
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <Typography variant='h3'>You can build your event here</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={11}>
                <TextField
                  label="Event Name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  fullWidth
                  margin="normal"
                  multiline
                  required={true}
                />
              </Grid>
              <Grid item xs={11}>
                <Alert severity="info">
                  <Typography variant='body1'>If no event URL is provided, the event page will be a random UUID url</Typography>
                </Alert>
                <TextField
                  label="Event URL"
                  value={eventURL}
                  onChange={(e) => setEventURL(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="Event Description (Optional)"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  fullWidth
                  margin="normal"
                  multiline
                  maxRows={4}
                  rows={4}
                />
              </Grid>
              <Grid item xs={3}>
                <DatePicker label="Event Date" value={eventDate} onChange={(e: Dayjs | null) => setEventDate(e)} />
              </Grid>
              <Grid item xs={3}>
                <TimePicker label="Event Time" value={eventTime} onChange={(e: Dayjs | null) => setEventTime(e)} />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="Event Location"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  fullWidth
                  margin="normal"
                  multiline
                  maxRows={4}
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h4'>Event Agenda</Typography>
                <DynamicAgendaList values={eventAgenda} onChange={handleEventAgenda} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h4'>Event Speakers</Typography>
              </Grid>
              <Grid item xs={12}>
                <Link href="/admincp/speakers/buildspeakers" variant="body1">
                  Cannot find your speaker? Create a new speaker here
                </Link>
              </Grid>
              <Grid item xs={12}>
                <DynamicSpeakerDropDown onChange={handleEventSpeakers} values={transformSpeakersToValue(eventSpeakers)} dropDownOptions={transformSpeakersToDropDownOptions(eventSpeakersList)} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h4'>Event Form</Typography>
              </Grid>
              <Grid item xs={11}>
                <Link href="/admincp/forms/buildform" variant="body1">
                  Cannot find your form? Create a new form here
                </Link>
              </Grid>
              <Grid item xs={11}>
                <FormControl fullWidth>
                  <Select
                    labelId="Form"
                    value={selectedFormUUID}
                    onChange={handleEventForm}
                  >
                    {formList.map((option) => (
                      <MenuItem key={option.form_UUID} value={option.form_UUID}>
                        {option.form_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h4'>HTML Element</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body1' style={{ color: 'red' }}>Dangerous: We are not liable for any problems caused by this field</Typography>
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="HTML Content"
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  fullWidth
                  margin="normal"
                  multiline
                  maxRows={4}
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} direction="column">
                  <Grid item xs={11}>
                    <Typography variant='h4'>Select Template</Typography>
                  </Grid>
                  <Grid item xs={11}>
                    <FormControl fullWidth>
                      <Select
                        labelId="Template"
                        value={template}
                        onChange={(e) => setTemplate(e.target.value as string)}
                      >
                        {templateOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={() => { router.push('/admincp/events/buildevents/preview'); }}>
                    Preview
                  </Button>
                </Grid>

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

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider >
  );
};

export default Page;