'use client';
import { Button, Checkbox, TextField } from '@mui/material';
//import Container from '@mui/material';
//import { FormControl } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
interface Field {
  field_name: string;
  field_type: string;
}

const Register: React.FC = () => {
  const [fields, setFields] = useState<Field[]>();

  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    // Fetch API result and update fields state
    fetch('/api/getform')
      .then((response) => response.json())
      .then((data) => setFields(data as Field[]));
  }, []);

  const handleInputChange = (label: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [label]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(JSON.stringify({ ...formValues, agree }));
  };

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
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
      <Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />
      <Button variant='contained' color='primary' type='submit'>
        Register
      </Button>
    </Grid>
  );
};

export default Register;
