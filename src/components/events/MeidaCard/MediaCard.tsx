
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import React from 'react';


import { Speaker } from '@/components/events/MeidaCard/types';
import Biobutton from '@/components/events/BioButton';

interface MediaCardProps {
  speaker: Speaker;
}


const MediaCard: React.FC<MediaCardProps> = ({ speaker }) => {
  const imageUrl = `${process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_DELIVERY_URL}/${speaker.events_speaker_image_url}/250x250`;
  console.log("imageUrl", imageUrl)
  return (
    <Card sx={{ minWidth: "250px", minHeight: "250px" }}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "fixed",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",  // Ensures any overflow image is hidden
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",  // Ensures image covers the box without distortion
            objectPosition: "center center",  // Centers the image within the box
          }}
          src={imageUrl}
          title={speaker.events_speaker_name}
        />
      </Box>
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