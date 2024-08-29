'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';


import { Loading } from '@/components/Loading';

import { EventIframe } from '@/app/api/events/getIframes/types';

import { YouTubeEmbed, XEmbed, FacebookEmbed, InstagramEmbed, PinterestEmbed, TikTokEmbed } from 'react-social-media-embed';

interface EventIframeProps {
  eventId: string
}

const EventIframeGrid: React.FC<EventIframeProps> = ({ eventId }) => {
  const [iframes, setiframe] = useState<EventIframe[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_HOST + '/api/events/getIframes', {
      params: {
        event_id: eventId
      },
      headers: {
        'Api-Secret': process.env.NEXT_PUBLIC_API_SECRET
      }
    })
      .then(response => {
        const data = response.data;
        setiframe(data as EventIframe[]);
        setLoading(false);
        console.log("iframe", iframes)
      })
      .catch(error => console.error(error));
  }, []);

  if (loading) {
    return (
      <Loading />
    )
  }

  if (iframes.length === 0) {
    return <div>No iframes to display</div>;
  }
  return (
    <Grid
      container
      direction="column"
      sx={{
        justifyContent: "space-around",
        alignItems: "flex-start",
      }}
    >
      {iframes?.map((iframe: EventIframe) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={iframe.event_iframe_id}>
          <Typography variant='h3'>{iframe.title}</Typography>
          {(() => {
            if (iframe.url.includes("youtube")) {
              return <YouTubeEmbed url={iframe.url} width={550} height={220} />;
            } else if (iframe.url.includes("twitter")) {
              return <XEmbed url={iframe.url} width={550} />;
            } else if (iframe.url.includes("facebook")) {
              return <FacebookEmbed url={iframe.url} width={550} />
            } else if (iframe.url.includes("instagram")) {
              return <InstagramEmbed url={iframe.url} width={550} />
            } else if (iframe.url.includes("pinterest")) {
              return <PinterestEmbed url={iframe.url} width={550} />
            } else if (iframe.url.includes("Tiktok")) {
              return <PinterestEmbed url={iframe.url} width={550} />
            } else {
              return <iframe src={iframe.url} height="570" width="325" title={iframe.title}></iframe>
            }
          })()}
        </Grid>
      ))}
    </Grid>
  );
}

export default EventIframeGrid;