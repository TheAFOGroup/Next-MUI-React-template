"use client"
import { Alert, Button, Grid, Typography } from "@mui/material";
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

import DynamicFieldsTable from "@/components/utils/DynamicFieldsTable/DynamicFieldTable";

import { Form } from '@/app/api/forms/getform/types';
import { SubmitForm, SubmmitField } from '@/app/api/submitform/types';

const EventPage = ({ params }: { params: { slug: string } }) => {
  const eventUUID = params.slug
  const [form, setForm] = useState<Form>();
  const [field, setField] = useState<SubmmitField[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [alert, setAlert] = useState("")

  const header = {
    'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
  }

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_HOST + '/api/form/getform', {
      params: {
        form_uuid: eventUUID
      },
      headers: header
    })
      .then(response => {
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
    const data: SubmitForm = {
      form_id: form?.form_id ?? 0,
      form_fields: field
    }

    axios({
      method: 'post',
      url: process.env.NEXT_PUBLIC_HOST + '/api/submitform',
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
      }
    }).then((res) => {
      console.log(res.data)
      setFormSubmitted(true);
    })
      .catch((error) => {
        setAlert(error.message || 'An error occurred');
      }).finally(() => {
        setAlert('An error occurred');
      })
  };

  const handleNewForm = () => {
    setField([]);
    setFormSubmitted(false);
    setAlert("");
  };

  if (formSubmitted) {
    return (
      <div>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h3">Form Submitted Successfully</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleNewForm}>
              Start New Form
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

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
      {
        alert.length ?
          <Grid item>
            <Alert severity="error">
              {alert}
            </Alert>
          </Grid>
          :
          <></>
      }
    </Grid>
  );
};

export default EventPage;