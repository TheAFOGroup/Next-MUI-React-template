
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
        sx={{ height: 140 }}
        src={speaker.image_url}
        title={speaker.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {speaker.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {speaker.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Biobutton payload={speaker.bio} />
      </CardActions>
    </Card>
  );
}




export default MediaCard;