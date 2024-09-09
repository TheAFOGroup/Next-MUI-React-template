"use client"
import { Alert, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

import { DeleteAccountData } from '@/app/api/auth/deleteaccount/type';

const AddUserPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userCreated, setUserCreated] = useState(false);
  const [alert, setAlert] = useState('')


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleDeleteAnotherUser = () => {
    setUserCreated(false);
    setEmail('');
    setAlert('')
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add your logic to create a new user here
    const userData: DeleteAccountData = {
      "email": email,
    };
    deleteUser(userData)
    console.log(JSON.stringify(userData));
  };


  const deleteUser = (userData: DeleteAccountData) => {
    axios({
      method: 'DELETE',
      url: process.env.NEXT_PUBLIC_HOST + '/api/auth/deleteaccount',
      data: userData,
      headers: {
        'Content-Type': 'application/json',
        'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
      }
    }).then(() => {
      setUserCreated(true);
    })
      .catch((error) => {
        setAlert(error.message || 'An error occurred');
      }).finally(() => {
        setAlert('An error occurred');
      })
  }


  if (userCreated) {
    return (
      <div>
        <h2>User deleted Successfully</h2>
        <p>Email: {email}</p>
        <Button variant="contained" color="primary" onClick={handleDeleteAnotherUser}>
          Add Another User
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Typography variant="h4">Add new user</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Delete User
          </Button>
        </Grid>
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
    </form>
  );
};

export default AddUserPage;