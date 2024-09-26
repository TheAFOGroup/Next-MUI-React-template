"use client"
import { Button, Grid, Typography, Alert } from '@mui/material';
import React, { useCallback, useState, useEffect } from 'react';

import DynamicFieldsTable from "@/components/utils/DynamicFieldsTable/DynamicFieldTable";

import { FormType } from '@/components/form/types';
import { SubmitForm, SubmmitField } from '@/app/api/forms/submitform/types';
import { BorderStyle } from '@mui/icons-material';

interface FormProps {
  // Define your component props here
  form: FormType;
  onSubmit?: (submitFields: SubmmitField[], error?: boolean) => void;
}

const Form: React.FC<FormProps> = ({ form, onSubmit }) => {
  // Add your component logic here
  const [field, setField] = useState<SubmmitField[]>([]);
  const [error, setError] = useState<boolean>(false)

  const handleChange = useCallback((value: SubmmitField[], error?) => {
    console.log(value, error);
    setField(value);
    setError(error);
  }, []);

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(field);
    }
  }

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        <Typography variant="h4">{form?.form_name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">{form?.form_description}</Typography>
      </Grid>
      <Grid item xs={12}>
        <DynamicFieldsTable fields={form?.form_fields ?? []} onChange={handleChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={error}>Submit</Button>
      </Grid>
    </Grid>
  );
};

export default Form;