
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import { Speaker } from '@/components/events/MeidaCard/types';
import Biobutton from '@/components/events/BioButton';

interface MediaCardProps {
  speaker: Speaker;
}

const MediaCard: React.FC<MediaCardProps> = ({ speaker }) => {
  return (
    <Card sx={{ minWidth: "250px", minHeight: "250px" }}>
      <CardMedia
        component="img"
        sx={{ height: 250, width: 250 }}
        src={speaker.events_speaker_image_url}
        title={speaker.events_speaker_name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {speaker.events_speaker_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {speaker.events_speaker_title}
        </Typography>
      </CardContent>
      <CardActions>
        <Biobutton payload={speaker.events_speaker_bio} />
      </CardActions>
    </Card>
  );
}




export default MediaCard;