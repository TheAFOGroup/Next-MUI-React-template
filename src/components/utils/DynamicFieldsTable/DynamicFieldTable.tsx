'use client';
import { Grid, TextField, Checkbox, Typography } from '@mui/material';
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

  const renderFieldType = (field: FormField, index: number) => {
    if (field.field_type === 'text') {
      return (
        <div>
          <TextField
            key={index}
            label={field.field_name}
            type={field.field_type}
            fullWidth
            margin="normal"
            onChange={(e) => handleInputChange(field.form_field_id, e.target.value)}
          />
        </div>
      );
    } else if (field.field_type === 'checkbox') {
      const check = formValues.find((formValues) => formValues.form_field_id === field.form_field_id)?.response;
      let isChecked = false
      if (check == "true") {
        isChecked = true
      }
      return (
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "flex-start",
            alignItems: "baseline",
          }}
          key={index}
        >
          <Grid item>
            <Checkbox
              checked={isChecked}
              onChange={(e) => handleInputChange(field.form_field_id, e.target.checked.toString())}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Grid>
          <Grid item>
            <Typography variant="body1">{field.field_name}</Typography>
          </Grid>
        </Grid>
      );
    } else if (field.field_type === 'date') {
      return <div><input type="date" /></div>;
    } else if (field.field_type === 'select') {
      return (
        <div>
          <select>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>
      );
    } else {
      return <div><input type="text" /></div>;
    }
  };

  return (
    <Grid container direction="column">
      {fields?.map((field, index) => (
        <Grid item key={index}>
          {renderFieldType(field, index)}
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(DynamicFieldsTable);