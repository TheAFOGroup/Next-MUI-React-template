"use client"
import { Button, FormControl, Grid, Link, MenuItem, Select, TextField, Typography } from '@mui/material';
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

import { FormIndexRespond } from '@/app/api/forms/getformindex/types';
import { GetSpeakersRespond } from '@/app/api/speaker/getspeakers/types';


const Page = () => {
  const session = useSession().data
  const router = useRouter();

  const [eventSpeakersList, setEventSpeakersList] = useState<GetSpeakersRespond[]>([]);
  const [formList, setFormList] = useState<FormIndexRespond[]>([]);

  const {
    eventName, setEventName,
    eventDescription, setEventDescription,
    eventDate, setEventDate,
    eventTime, setEventTime,
    eventLocation, setEventLocation,
    eventAgenda, setEventAgenda,
    eventSpeakers, setEventSpeakers,
    selectedForm, setSelectedForm,
    htmlContent, setHtmlContent,
    template, setTemplate
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted!');
    console.log('Event Name:', eventName);
    console.log('Event Description:', eventDescription);
    console.log('Event Date:', eventDate);
    console.log('Event Location:', eventLocation);
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
              <Grid item xs={12}>
                <TextField
                  label="Event Name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  fullWidth
                  margin="normal"
                  multiline
                  maxRows={4}
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <DatePicker label="Event Date" value={eventDate} onChange={(e: Dayjs | null) => setEventDate(e)} />
              </Grid>
              <Grid item xs={12}>
                <TimePicker label="Event Time" value={eventTime} onChange={(e: Dayjs | null) => setEventTime(e)} />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <Link href="/admincp/forms/buildform" variant="body1">
                  Cannot find your form? Create a new form here
                </Link>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Select
                    labelId="Form"
                    value={selectedForm}
                    onChange={(e) => setSelectedForm(e.target.value as number)}
                  >
                    {formList.map((option) => (
                      <MenuItem key={option.form_id} value={option.form_id}>
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
              <Grid item xs={12}>
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
                  <Grid item xs={12}>
                    <Typography variant='h4'>Select Template</Typography>
                  </Grid>
                  <Grid item xs={12}>
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