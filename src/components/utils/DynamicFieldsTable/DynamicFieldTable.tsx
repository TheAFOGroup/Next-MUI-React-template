'use client';
import { Box, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { memo, useEffect, useState } from 'react';

import { SubmmitField, FormField } from './types';

interface DynamicFieldsTableProps {
  fields: FormField[];
  onChange: (submitFields: SubmmitField[]) => void;
}

/**
 * Represents a dynamic fields table component.
 * @param fields  the field name, field types and order 
 * @param onChange when the field that is being input
 * @component
 * @example
 * ```tsx
 * <DynamicFieldsTable
 *   fields={formFields}
 *   onChange={handleFormFieldsChange}
 * />
 * ```
 */
const DynamicFieldsTable: React.FC<DynamicFieldsTableProps> = ({ fields, onChange }) => {
  const [formValues, setFormValues] = useState<SubmmitField[]>([]);

  // Update formValues when fields prop changes
  useEffect(() => {
    if (fields && fields.length > 0) {
      const initialFormValues: SubmmitField[] = fields.map((field) => ({
        form_field_id: field.form_field_id,
        response: '',
      }));
      setFormValues(initialFormValues);
    }
  }, [fields]);

  const handleInputChange = (form_field_id: number, response: string) => {
    const updatedFormValues = formValues.map((field) => {
      if (field.form_field_id === form_field_id) {
        return {
          form_field_id: form_field_id,
          response: response,
        };
      }
      return field;
    });
    setFormValues(updatedFormValues);
  };

  useEffect(() => {
    onChange(formValues);
  }, [formValues, onChange]);

  return (
    <Grid container direction="column">
      {fields?.map((field, index) => (
        <Grid item key={index}>
          <TextField
            key={index}
            label={field.field_name}
            type={field.field_type}
            fullWidth
            margin="normal"
            onChange={(e) => handleInputChange(field.form_field_id, e.target.value)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(DynamicFieldsTable);