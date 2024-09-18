"use client"
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useState } from 'react';

import FieldTypeTable from '@/components/utils/FieldTypeTable/FieldTypeTable'; // Adjust the import path as needed

import { BuildFormType } from '@/app/api/forms/buildform/type';

import DynamicFieldTable from '@/components/utils/DynamicFieldsTable/DynamicFieldTable';
import { FormField } from '@/components/utils/DynamicFieldsTable/types';
import { DynamicField } from '@/components/utils/FieldTypeTable/types';
import { useSession } from 'next-auth/react';

const BuildFormPage = () => {
  const session = useSession().data
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  const [fields, setFields] = useState<DynamicField[]>(
    [
      {
        field_order: 1,
        field_name: 'email',
        field_type: 'text',
        field_info: [""]
      }
    ]
  );
  const [alert, setAlert] = useState("")
  const [uuid, setUUID] = useState("")

  const dropdownTypes = [
    {
      "dropdown_type": "text",
      "child_table": {
        "enabled": false,
        "hints": ""
      }
    },
    {
      "dropdown_type": "textarea",
      "child_table": {
        "enabled": false,
        "hints": ""
      }
    },
    {
      "dropdown_type": "email",
      "child_table": {
        "enabled": true,
        "hints": `Input the allowed email domain eg. gmail.com.
         If you allow all email domain please leave it blank`
      }
    },
    {
      "dropdown_type": "checkbox",
      "child_table": {
        "enabled": false,
        "hints": ""
      }
    },
    {
      "dropdown_type": "drop down",
      "child_table": {
        "enabled": true,
        "hints": "Input the drop down entries(Not implenmented)"
      }
    },
  ]

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleFieldsSubmit = useCallback((updatedFields: DynamicField[]) => {
    setFields(updatedFields);
    console.log('Updated Fields:', updatedFields);
  }, []);

  const handleSubmit = () => {
    // Add field_order to each field based on their order
    const data: BuildFormType = {
      form_name: name,
      form_description: description,
      form_owner: session?.user?.email || '',
      form_fields: fields
    }

    axios({
      method: 'post',
      url: process.env.NEXT_PUBLIC_HOST + '/api/forms/buildform',
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
      }
    }).then((res) => {
      console.log(res.data)
      setUUID(res.data.respond.UUID);
      setFormSubmitted(true);
    })
      .catch((error) => {
        setAlert(error.message || 'An error occurred');
      }).finally(() => {
        setAlert('An error occurred');
      })
  };

  const handleNewForm = () => {
    setName('');
    setDescription('');
    setFormSubmitted(false);
    setFields([]);
    setAlert("");
    setUUID("");
  };

  const changeshape = (fields: DynamicField[]): FormField[] => {
    const updatedFields: FormField[] = fields.map((field, index) => {
      return {
        ...field,
        form_id: 1,
        form_field_id: index + 1
      };
    });
    console.log(updatedFields);
    return updatedFields;
  };

  const fieldPreviewOnChange = (response: any, error: any) => {
    const res = response;
    const err = error;
  };


  if (formSubmitted) {
    return (
      <div>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h3">Form Submitted Successfully</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">Click the link below:</Typography>
          </Grid>
          <Grid item>
            <Link href={`${process.env.NEXT_PUBLIC_HOST}/forms/${uuid}`} target="_blank" rel="noopener noreferrer">
              {`${process.env.NEXT_PUBLIC_HOST}/forms/${uuid}`}
            </Link>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleNewForm}>
              Start New Form
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6}>
          <h1>Create Forms</h1>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Table name"
                value={name}
                onChange={handleNameChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Description (Optional)"
                value={description}
                onChange={handleDescriptionChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FieldTypeTable dropdownTypes={dropdownTypes} onChange={handleFieldsSubmit} />
            </Grid>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            {
              alert.length ?
                <Grid item>
                  <Alert severity="error">
                    {alert}
                  </Alert>
                </Grid>
                :
                <></>
            }
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column">

            <Grid item xs={6}>
              <Typography variant='h2'>Preview</Typography>
            </Grid>
            <Grid item xs={6}>
              <DynamicFieldTable fields={changeshape(fields)} onChange={fieldPreviewOnChange} />
            </Grid>

            <Grid />

          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default BuildFormPage;

/**
 * 
 *           <DynamicFieldTable fields={changeshape(fields)} onChange={fieldPreviewOnChange} />
 */