import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField';
import { z } from 'zod'
interface ValidateTextFieldProps {
  restrictions: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement> & { error: boolean }) => void;
}

const ValidateTextField: React.FC<ValidateTextFieldProps & TextFieldProps> = ({ restrictions, onChange, ...textFieldProps }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const createSchema = (patterns: string[]) => {
    const regexPatterns = patterns.map(pattern => `^[a-zA-Z0-9._%+-]+@${pattern}$`);
    console.log(regexPatterns)
    return z.string().refine((val) => {
      return regexPatterns.some((regexPattern) => new RegExp(regexPattern).test(val));
    }, {
      message: 'Invalid input: This must match one of the email:' + patterns
    });
  };

  const schema = createSchema(restrictions);

  const invalidInputText = 'Invalid input: This have to contain ' + restrictions

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    let isValid = true;
    try {
      schema.parse(newValue);
      setError(false);
      setHelperText('');
    } catch (e) {
      isValid = false;
      setError(true);
      setHelperText((e as any).errors[0].message);
    }
    console.log(error)
    const extendedEvent = Object.assign(event, { error: !isValid });
    onChange(extendedEvent); // Call the onChange handler passed as a prop
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      error={error}
      helperText={helperText}
      {...textFieldProps}
    />
  );
};

export default ValidateTextField;