'use client';

import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Loading } from '@/components/Loading';

import { Speaker } from '@/app/api/events/getSpeakers/types';

import MediaCard from './MediaCard';


interface MediaGridProp {
  eventId: string
}

const MediaGrid: React.FC<MediaGridProp> = ({ eventId }) => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_HOST + '/api/events/getSpeakers', {
      params: {
        event_id: eventId
      },
      headers: {
        'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
      }
    })
      .then(response => {
        const data = response.data;
        setSpeakers(data as Speaker[]);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);


  if (loading) {
    return (
      <Loading />
    )
  }

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