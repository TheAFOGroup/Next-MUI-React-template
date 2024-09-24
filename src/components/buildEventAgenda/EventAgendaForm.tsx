"use client"
import { Grid, TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import React, { memo, useEffect, useState } from 'react';

import { EventAgendaProps } from '@/components/buildEventAgenda/types';

interface EventAgendaFormProps {
  onChange: (data: EventAgendaProps) => void;
}


const EventAgendaForm: React.FC<EventAgendaFormProps> = ({ onChange }) => {
  const [formData, setFormData] = useState<EventAgendaProps>({
    title: '',
    description: '',
    start_time: dayjs(),
    end_time: dayjs()
  });



  const setTitle = (title: string) => {
    setFormData((prevData) => ({
      ...prevData,
      title: title
    }));
  };

  const setDescription = (description: string) => {
    setFormData((prevData) => ({
      ...prevData,
      description: description
    }));
  };

  const setStartTime = (startTime: Dayjs | null) => {
    if (startTime) {
      setFormData((prevData) => ({
        ...prevData,
        start_time: startTime
      }));
    }
  };

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  const setEndTime = (endTime: Dayjs | null) => {
    if (endTime) {
      setFormData((prevData) => ({
        ...prevData,
        end_time: endTime
      }));
    }
  };

  return (
    <div>
      <Grid container direction="row" spacing="2" alignItems="center">
        <Grid item xs={6}>
          <TextField
            label="Title"
            value={formData.title}
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
            value={formData.description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            maxRows={3}
            rows={3}
          />
        </Grid>
        <Grid item xs={3}>
          <TimePicker label="Start Time" onChange={(e: Dayjs | null) => setStartTime(e)} />
        </Grid>
        <Grid item xs={3}>
          <TimePicker label="End Time" onChange={(e: Dayjs | null) => setEndTime(e)} />
        </Grid>
      </Grid>
    </div >
  );
};

export default memo(EventAgendaForm);