'use client';

import { Grid } from '@mui/material';
import React from 'react';

import { Speaker } from '@/components/events/MeidaCard/types';
import MediaCard from './MediaCard';


interface MediaGridProp {
  speakers: Speaker[]
}

const MediaGrid: React.FC<MediaGridProp> = ({ speakers }) => {
  return (
    <Grid container spacing={3} className="media-grid">
      {speakers?.map((speaker: Speaker) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={speaker.events_speaker_id}>
          <MediaCard
            key={speaker.events_speaker_id}
            speaker={speaker}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaGrid;