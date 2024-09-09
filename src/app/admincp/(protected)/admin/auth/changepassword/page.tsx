"use client"
import { Alert, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

import { ChangePasswordData } from '@/app/api/auth/changepassword/type';

const ChangePasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [userCreated, setUserCreated] = useState(false);
  const [alert, setAlert] = useState('')


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleAddAnotherUser = () => {
    setUserCreated(false);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setConfirmPasswordError('');
    setAlert('')
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add your logic to create a new user here
    const userData: ChangePasswordData = {
      "email": email,
      "password": password
    };
    createUser(userData)
    console.log(JSON.stringify(userData));
  };


  const createUser = (userData: ChangePasswordData) => {
    axios({
      method: 'put',
      url: process.env.NEXT_PUBLIC_HOST + '/api/auth/changepassword',
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
        <h2>Changed password successfully</h2>
        <p>Email: {email}</p>
        <Button variant="contained" color="primary" onClick={handleAddAnotherUser}>
          Change another User's password
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Typography variant="h4">Change password</Typography>
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
          <TextField
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            type="password"
            fullWidth
            required
          />
        </Grid>
        <Grid item>
          <TextField
            label="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            type="password"
            fullWidth
            required
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Change Password
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

export default ChangePasswordPage;