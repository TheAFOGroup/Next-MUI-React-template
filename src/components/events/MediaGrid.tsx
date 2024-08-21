'use client';

import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Speaker } from '@/app/api/events/getSpeakers/types';

import MediaCard from './MediaCard';

interface MediaGridProp {
  eventId: string
}

const MediaGrid: React.FC<MediaGridProp> = ({ eventId }) => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    fetch('/api/getSpeakers')
      .then(response => response.json())
      .then((data) => setSpeakers(data as Speaker[]))
      .catch(error => console.error(error));
  }, []);

  return (
    <Grid container spacing={3} className="media-grid">
      {speakers?.map((speaker: Speaker) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={speaker.event_speaker_id}>
          <MediaCard
            key={speaker.event_speaker_id}
            speaker={speaker}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaGrid;