"use client"
import { Alert, Button, Grid, Typography } from "@mui/material";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Form from "@/components/form/form";
import { FormType } from "@/components/form/types";

import { SubmitFormType, SubmmitField } from '@/app/api/forms/submitform/types';
const EventPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();

  const eventUUID = params.slug
  const [form, setForm] = useState<FormType>(
    {
      form_id: 0,
      form_name: "",
      form_description: "",
      form_fields: []
    }
  );
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [alert, setAlert] = useState("")
  const [notfound, setNotFound] = useState(false)

  const header = {
    'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
  }

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_HOST + '/api/forms/getform', {
      params: {
        form_uuid: eventUUID
      },
      headers: header
    })
      .then(response => {
        const data = response.data;
        setForm(data as FormType);
      })
      .catch(error => {
        console.error(error)
        setNotFound(true);
      });
  }, []);

  if (notfound) {
    router.push('/404');
    return <></>;
  }

  const handleSubmit = (fields: SubmmitField[]) => {
    const data: SubmitFormType = {
      form_id: form?.form_id ?? 0,
      form_fields: fields
    }

    axios({
      method: 'post',
      url: process.env.NEXT_PUBLIC_HOST + '/api/forms/submitform',
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
      <Form form={form} onSubmit={handleSubmit} />

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