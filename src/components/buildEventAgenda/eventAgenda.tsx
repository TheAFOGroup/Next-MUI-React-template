import { TextField, Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';

interface EventAgendaFormProps {
  onChange: (data: EventAgendaProps) => void;
}

interface EventAgendaProps {
  title: string;
  description: string;
  start_time: Dayjs;
  end_time: Dayjs;
}

const EventAgendaForm: React.FC<EventAgendaFormProps> = ({ onChange }) => {
  const [formData, setFormData] = useState<EventAgendaProps>({
    title: '',
    description: '',
    start_time: dayjs(),
    end_time: dayjs()
  });

  return (
    <div>
      <TextField
        label="Title"
        value={formData.title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={formData.description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Typography
        margin="normal">
        Start Time
      </Typography>
      <TimePicker
        label="End Time"
        onChange={(e) => setStartTime(e)}
      />
      <Typography
        margin="normal">
        End Time
      </Typography>
      <TextField
        label="End Time Time"
        fullWidth
        margin="normal"
      />
      <TimePicker
        label="End Time"
        onChange={(e) => setEndTime(e)}

      />
    </div>
  );
};

export default EventAgendaForm;