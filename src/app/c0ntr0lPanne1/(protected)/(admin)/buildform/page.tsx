"use client"
import React, { useState } from 'react';
import DynamicTable from '@/components/utils/DynamicTable/DynamicField'; // Adjust the import path as needed
import axios from 'axios';
import { TextField, Button, Grid } from '@mui/material';
import { BuildFormType } from '@/app/api/buildform/type';
import { DynamicField } from '@/components/utils/DynamicTable/types';
import { useSession } from 'next-auth/react';

const BuildFormPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (fields: DynamicField[]) => {
    // Add field_order to each field based on their order
    const data: BuildFormType = {
      form_name: name,
      form_description: description,
      form_owner: "admin",
      form_fields: fields
    }

    axios.post(process.env.NEXT_PUBLIC_HOST + '/api/buildform', {
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
      }
    }).then((res) => {
      setFormSubmitted(true)
    }).catch((err) => {
      console.log('Fields submitted unsuccessful:', err);
    })
  };


  const handleNewForm = () => {
    setName('');
    setDescription('');
    setFormSubmitted(false);
  };

  if (formSubmitted) {
    return (
      <div>
        <h1>Form Submitted Successfully</h1>
        <Button variant="contained" color="primary" onClick={handleNewForm}>
          Start New Form
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1>Create Forms</h1>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Name"
            value={name}
            onChange={handleNameChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <DynamicTable onSubmit={handleSubmit} />
        </Grid>
      </Grid>
    </div>
  );
};

export default BuildFormPage;