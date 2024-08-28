
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Speaker } from '@/app/api/events/getSpeakers/types';
import Biobutton from '@/components/events/BioButton';
interface MediaCardProps {
  speaker: Speaker;
}

const MediaCard: React.FC<MediaCardProps> = ({ speaker }) => {

  return (
    <Card sx={{
      maxWidth: 345,
      margin: '0 10px',
      width: '200px',
      userSelect: 'none',
      overflow: 'hidden',
      height: '100%',
    }}

    >
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
        <Typography gutterBottom variant="body2" color="text.secondary" >
          {speaker.bio}
        </Typography>
      </CardContent>
      <CardActions>
        <Biobutton payload={speaker.bio} />
      </CardActions>
    </Card >
  );
}

export default MediaCard;