'use client';
import { Box, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { memo, useEffect, useState } from 'react';

import { FormField } from '@/app/api/getform/types';
import { SubmmitField } from '@/app/api/submitform/types';

interface DynamicFieldsTableProps {
  fields: FormField[];
  onChange: (submitFields: SubmmitField[]) => void;
}

const DynamicFieldsTable: React.FC<DynamicFieldsTableProps> = ({ fields, onChange }) => {
  const initialFormValues: SubmmitField[] = fields.map((field) => ({
    form_field_id: field.form_field_id,
    response: ''
  }));

  const [formValues, setFormValues] = useState<SubmmitField[]>(initialFormValues);

  const handleInputChange = (form_field_id: number, response: string) => {
    console.log(formValues)
    const updatedFormValues = formValues.map((field) => {
      if (field.form_field_id === form_field_id) {
        return {
          form_field_id: form_field_id,
          response: response
        };
      }
      return field;
    });
    setFormValues(updatedFormValues);
    console.log(formValues)
  };

  useEffect(() => {
    onChange(formValues);
  }, [formValues, onChange]);
  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <Box component='form' noValidate alignItems='center' >
        {fields?.map((field, index) => (
          <Grid item key={index} >
            <TextField
              key={index}
              label={field.field_name}
              type={field.field_type}
              fullWidth
              margin='normal'
              onChange={(e) => handleInputChange(field.form_field_id, e.target.value)}
            />
          </Grid>
        ))}
      </Box>
    </Grid>
  );
};

export default memo(DynamicFieldsTable);
