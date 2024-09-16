import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField';
import { z } from 'zod'
interface EmailTextFieldProps {
  restrictions: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement> & { error: boolean }) => void;
}

/**
 * ValidateTextField component.
 * 
 * @component
 * @example
 * ```tsx
 * <ValidateTextField
 *   restrictions={['example.com']}
 *   onChange={handleChange}
 *   label="Email"
 * />
 * ```
 * @param {Object} props - The component props.
 * @param {string[]} props.restrictions - The email domain restrictions.
 * @param {Function} props.onChange - The change event handler.
 * @param {TextFieldProps} props.textFieldProps - The TextField component props.
 * @returns {JSX.Element} The rendered ValidateTextField component.
 */
const EmailTextField: React.FC<EmailTextFieldProps & TextFieldProps> = ({ restrictions, onChange, ...textFieldProps }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(true);
  const [helperText, setHelperText] = useState('');

  const createSchema = (patterns: string[]) => {
    if (patterns.length === 1 && patterns[0] === "") {
      return z.string().email()
    }
    const regexPatterns = patterns.map(pattern => `^[a-zA-Z0-9._%+-]+@${pattern}$`);
    console.log(regexPatterns)
    return z.string().email().refine((val) => {
      return regexPatterns.some((regexPattern) => new RegExp(regexPattern).test(val));
    }, {
      message: 'Invalid input'
    });
  };

  const schema = createSchema(restrictions);

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
      required
    />
  );
};

export default EmailTextField;