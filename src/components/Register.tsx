'use client';
import { Box, Button, Checkbox, TextField, Grid } from '@mui/material';
//import Container from '@mui/material';
//import { FormControl } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Field {

  field_name: string;
  field_type: string;
}

const Register: React.FC = () => {
  const [fields, setFields] = useState<Field[]>();;

  const [formValues, setFormValues] = useState<Map<string, string>>(new Map());
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    // Fetch API result and update fields state
    axios.get(process.env.NEXT_PUBLIC_HOST + '/api/form/getform', {
      headers: {
        'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
      }
    })
      .then((response) => {
        setFields(response.data as Field[]);
      })
      .catch((error) => {
        console.error('Error fetching form:', error);
      });
  }, []);


  const handleInputChange = (label: string, value: string) => {
    setFormValues((prevValues: Map<string, string>) => {
      prevValues.set(label, value);
      return prevValues;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const entriesArray = Array.from(formValues.entries()).map(([key, value]) => ({ Field: key, Value: value }));
    console.log('Submitting form:', formValues);
    try {
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entriesArray)
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <Box component='form' onSubmit={handleSubmit} noValidate alignItems='center'>
        {fields?.map((field, index) => (
          <Grid item xs key={index}>
            <TextField
              key={index}
              label={field.field_name}
              type={field.field_type}
              fullWidth
              margin='normal'
              onChange={(e) => handleInputChange(field.field_name, e.target.value)}
            />
          </Grid>
        ))}
        <Grid item xs>
          <Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        </Grid>
        <Grid item xs>
          <Button variant='contained' color='primary' type='submit'>
            Register
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Register;
