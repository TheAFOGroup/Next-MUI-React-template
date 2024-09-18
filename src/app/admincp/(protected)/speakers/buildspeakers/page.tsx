"use client"
import React, { useState } from 'react';
import { TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import Textarea from '@/components/utils/StyledComponent/Textarea';
import MediaCard from '@/components/events/MeidaCard/MediaCard';
import { Speaker } from '@/components/events/MeidaCard/types';

const Page = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('');
  const [open, setOpen] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState('');

  const handleSubmit = () => {
    // Handle form submission logic here

    setOpen(true);
  };

  const handleNewSpeaker = () => {
    // Handle starting a new speaker logic here
    setOpen(false);
    setName('');
    setTitle('');
    setBio('');
    setPhoto('');
    setPreviewPhoto('');
  };


  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result as string;
        setPhoto(fileData);
        setPreviewPhoto(fileData);
      };
      reader.readAsDataURL(file);
    }
  };

  const mediaCardProps = () => {
    const speaker: Speaker = {
      event_speaker_id: 1,
      name: name,
      title: title,
      bio: bio,
      image_url: photo
    }
    return speaker
  }

  if (open) {
    return (
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h6">Form Submission Successful</Typography>
        </Grid>
        <Grid item>
          <Typography>Speaker details submitted successfully!</Typography>
        </Grid>
        <Grid item>
          <Button onClick={handleNewSpeaker}>Start New Speaker</Button>
        </Grid>
      </Grid>
    )
  }

  return (
    <div>
      <Grid container direction="row" spacing={2}>

        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant='h3'>Register Speakers</Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Textarea
                placeholder="Description"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                cols={30}
              />
            </Grid>
            <Grid item>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              {previewPhoto && (
                <Grid item
                  sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                  }}>
                  <img
                    src={previewPhoto}
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </Grid>
              )}
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h3">Preview</Typography>
            </Grid>
            <Grid item>
              <MediaCard speaker={mediaCardProps()} />
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </div>
  );
};

export default Page;