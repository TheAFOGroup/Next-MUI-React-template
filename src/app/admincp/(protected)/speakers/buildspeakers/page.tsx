"use client"
import { Alert, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import MediaCard from '@/components/events/MeidaCard/MediaCard';
import { Speaker } from '@/components/events/MeidaCard/types';
import Textarea from '@/components/utils/StyledComponent/Textarea';

import { BuildEventSpeaker } from '@/app/api/speaker/buildspeaker/types';
import { UploadImageRespond } from '@/app/api/utils/uploadimage/types';

const BuildSpeakers = () => {
  const session = useSession().data
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState<Blob>(new Blob);
  const [open, setOpen] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState('');
  const [alert, setAlert] = useState("")

  const handleSubmit = async () => {
    const handleError = (error) => {
      setAlert(error.message);
    };

    try {
      // Upload photo to Cloudflare
      const formData = new FormData();
      formData.append('file', photo);
      console.log("formdata", formData.get('file'))

      const myHeaders = new Headers();
      myHeaders.append("API_SECRET", process.env.NEXT_PUBLIC_API_SECRET || '');


      const UploadImageRes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/utils/uploadimage`, {
        method: 'POST',
        headers: myHeaders,
        body: formData // Fetch automatically sets the Content-Type and boundary for FormData
      });

      if (!UploadImageRes.ok) {
        const errorData: { errors: { message: string }[] } = await UploadImageRes.json();
        console.error('Error response data:', errorData);
        throw new Error(errorData?.errors[0].message);
      }

      const result: UploadImageRespond = await UploadImageRes.json()
      console.log("result", result)

      // Handle form submission logic here
      const data: BuildEventSpeaker = {
        events_speaker_name: name,
        events_speaker_title: title,
        events_speaker_bio: bio,
        events_speaker_image_url: result.cloudflareId,
        events_speaker_type: 1,
        events_speaker_owner: session?.user?.email ?? ''
      };

      // Upload data to database
      const databaseResponse = await axios({
        method: 'post',
        url: process.env.NEXT_PUBLIC_HOST + '/api/speaker/buildspeaker',
        data: data,
        headers: {
          'Content-Type': 'application/json',
          'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
        }
      });

      console.log(databaseResponse.data);
      setOpen(true);
    } catch (error) {
      handleError(error);
    } finally {
      setAlert('An error occurred');
    }
  };

  const handleNewSpeaker = () => {
    // Handle starting a new speaker logic here
    setOpen(false);
    setName('');
    setTitle('');
    setBio('');
    setPhoto(new Blob);
    setPreviewPhoto('');
    setAlert('')
  };


  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result as string;
        setPreviewPhoto(fileData);
      };
      reader.readAsDataURL(file);
      setPhoto(file);
    }
  };

  const mediaCardProps = () => {
    const speaker: Speaker = {
      event_speaker_id: 1,
      name: name,
      title: title,
      bio: bio,
      image_url: previewPhoto
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
              {alert && (
                <Alert severity="error">{alert}</Alert>
              )}
            </Grid>
            <Grid item>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                  <Image
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

export default BuildSpeakers;