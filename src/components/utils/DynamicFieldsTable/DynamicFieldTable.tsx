'use client';
import { Checkbox, Grid, TextField, Typography, FormControlLabel } from '@mui/material';
import React, { memo, useEffect, useState } from 'react';
import Textarea from '@/components/utils/StyledComponent/Textarea';
import { FormField, SubmmitField } from './types';

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
    } else if (field.field_type === 'textarea') {

      return <Textarea
        maxRows={4}
        aria-label={field.field_name}
        placeholder={field.field_name}
        defaultValue=""
        onChange={(e) => handleInputChange(field.form_field_id, e.target.value)}
      />
        ;

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