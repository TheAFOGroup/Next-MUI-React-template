"use client"
import { Grid, Typography, Button } from "@mui/material";
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

import DynamicFieldsTable from "@/components/utils/DynamicFieldsTable/DynamicFieldTable";

import { Form } from '@/app/api/getform/types';

import { SubmitForm, SubmmitField } from '@/app/api/submitform/types';

const EventPage = ({ params }: { params: { slug: string } }) => {
  const eventUUID = params.slug
  const [form, setForm] = useState<Form>();
  const [field, setField] = useState<SubmmitField[]>([]);


  const header = {
    'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
  }
  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_HOST + '/api/getform', {
      params: {
        form_uuid: eventUUID
      },
      headers: header
    })
      .then(response => {
        console.log(response.data)
        const data = response.data;
        setForm(data as Form);
      })
      .catch(error => console.error(error));
  }, []);

  const handleChange = useCallback((value: SubmmitField[]) => {
    console.log(value);
    setField(value);
  }, []);

  const handleSubmit = () => {
    const submitForm: SubmitForm = {
      form_id: form?.form_id ?? 0,
      form_fields: field
    }
    console.log('Submitting form:', submitForm);
  };

  return (
    <Grid container spacing={2} direction="column" >
      <Typography variant="h1">{form?.form_name}</Typography>
      <Typography variant="body1">{form?.form_description}</Typography>
      <Grid item xs={12} sm={6}>
        <DynamicFieldsTable fields={form?.form_fields ?? []} onChange={handleChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
      </Grid>
    </Grid>
  );
};

export default EventPage;