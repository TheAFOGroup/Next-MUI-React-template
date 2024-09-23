'use client';
import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import React, { memo, useEffect, useState } from 'react';

import EmailTextField from '@/components/utils/EmailTextField/EmailTextField';

import { FormField, SubmmitField } from './types';
interface DynamicFieldsTableProps {
  fields: FormField[];
  onChange: (submitFields: SubmmitField[], error?: boolean) => void;
}

interface ErrorObj {
  form_field_id: number;
  error: boolean;
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
  const [error, setError] = useState<boolean>(false);
  const [errorArray, setErrorArray] = useState<ErrorObj[]>([]);

  // Update formValues when fields prop changes
  useEffect(() => {
    if (fields && fields.length > 0) {
      const initialFormValues: SubmmitField[] = fields.map((field) => ({
        form_field_id: field.form_field_id,
        response: '',
      }));
      setFormValues(initialFormValues);

      const initErrorArray = fields.map((field) => ({
        form_field_id: field.form_field_id,
        error: false,
      }));
      setErrorArray(initErrorArray)
    }
  }, [fields]);

  const handleInputChange = (form_field_id: number, response: string, error?: boolean) => {
    console.log("handleInputChange", error)
    if (error !== undefined) {
      // If all the error fields in the errorArray are false, set setError to false. 
      // Otherwise, if there is one or more error field that is true, set setError to true.
      const updatedErrorArray = errorArray.map((field) => {
        if (field.form_field_id === form_field_id) {
          return {
            form_field_id: form_field_id,
            error: error,
          };
        }
        return field;
      });
      setErrorArray(updatedErrorArray);

      const hasError = updatedErrorArray.some((field) => field.error);
      setError(hasError);
    }
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
    onChange(formValues, error);
  }, [formValues, error, onChange]);

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
    } else if (field.field_type === 'textarea') {

      return <TextField
        label={field.field_name}
        value={formValues.find((formValues) => formValues.form_field_id === field.form_field_id)?.response}
        onChange={(e) => handleInputChange(field.form_field_id, e.target.value)}
        aria-label={field.field_name}
        placeholder={field.field_name}
        margin="normal"
        multiline
        fullWidth
        maxRows={4}
        rows={4}
      />;

    } else if (field.field_type === 'checkbox') {
      const check = formValues.find((formValues) => formValues.form_field_id === field.form_field_id)?.response;
      let isChecked = false
      if (check == "true") {
        isChecked = true
      }
      return (
        <FormControlLabel
          control={<Checkbox value='remember' color='primary' />}
          label={field.field_name}
          onChange={(e) => handleInputChange(field.form_field_id, (e.target as HTMLInputElement).checked.toString())}
        />
      );
    } else if (field.field_type === 'email') {
      return (
        <div>
          <EmailTextField
            restrictions={field.field_info}
            key={index}
            label={field.field_name}
            type={field.field_type}
            fullWidth
            margin="normal"
            onChange={(event: React.ChangeEvent<HTMLInputElement> & { error: boolean }) => {
              handleInputChange(field.form_field_id, event.target.value, event.error);
            }}
          />
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