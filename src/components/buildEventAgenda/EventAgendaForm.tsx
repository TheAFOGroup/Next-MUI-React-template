"use client"
import { Grid, TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import React, { memo, useEffect, useState } from 'react';

import { EventAgendaProps } from '@/components/buildEventAgenda/types';

interface EventAgendaFormProps {
  onChange: (data: EventAgendaProps) => void;
  value: EventAgendaProps; // the selected values that presist the state
}


const EventAgendaForm: React.FC<EventAgendaFormProps> = ({ onChange, value }) => {
  const [formData, setFormData] = useState<EventAgendaProps>(value);



  const setTitle = (title: string) => {
    setFormData((prevData) => ({
      ...prevData,
      events_agenda_title: title
    }));
  };

  const setDescription = (description: string) => {
    setFormData((prevData) => ({
      ...prevData,
      events_agenda_description: description
    }));
  };

  const setStartTime = (startTime: Dayjs | null) => {
    if (startTime) {
      setFormData((prevData) => ({
        ...prevData,
        events_agenda_start_time: startTime
      }));
    }
  };

  const setEndTime = (endTime: Dayjs | null) => {
    if (endTime) {
      setFormData((prevData) => ({
        ...prevData,
        events_agenda_end_time: endTime
      }));
    }
  };

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  return (
    <div>
      <Grid container direction="row" spacing="2" alignItems="center">
        <Grid item xs={6}>
          <TextField
            label="Title"
            value={formData.events_agenda_title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            maxRows={3}
            rows={3}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Description (Optional)"
            value={formData.events_agenda_description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            maxRows={3}
            rows={3}
          />
        </Grid>
        <Grid item xs={3}>
          <TimePicker label="Start Time" value={formData.events_agenda_start_time} onChange={(e: Dayjs | null) => setStartTime(e)} />
        </Grid>
        <Grid item xs={3}>
          <TimePicker label="End Time" value={formData.events_agenda_end_time} onChange={(e: Dayjs | null) => setEndTime(e)} />
        </Grid>
      </Grid>
    </div >
  );
};

export default memo(EventAgendaForm);