"use client"
import CheckIcon from '@mui/icons-material/Check';
import { Alert, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

import { SignUpData } from '@/app/api/signup/type';

const AddUserPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
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


  const handleAdminChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.target.checked);
  };

  const handleAddAnotherUser = () => {
    setUserCreated(false);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsAdmin(false);
    setConfirmPasswordError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add your logic to create a new user here
    const userData: SignUpData = {
      "email": email,
      "password": password,
      "authorize": {
        admin: isAdmin
      }
    };
    createUser(userData)
    console.log(JSON.stringify(userData));
  };


  const createUser = (userData: SignUpData) => {
    axios({
      method: 'post',
      url: process.env.NEXT_PUBLIC_HOST + '/api/signup',
      data: userData,
      headers: {
        'Content-Type': 'application/json',
        'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
      }
    }).then(() => {
      setUserCreated(true);
    })
      .catch((error) => {
        setAlert(error)
      })
  }


  if (userCreated) {
    return (
      <div>
        <h2>User Created Successfully</h2>
        <p>Email: {email}</p>
        <p>Admin: {isAdmin ? 'Yes' : 'No'}</p>
        <Button variant="contained" color="primary" onClick={handleAddAnotherUser}>
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
          <FormControlLabel
            control={
              <Checkbox
                checked={isAdmin}
                onChange={handleAdminChange}
              />
            }
            label="Admin"
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Create User
          </Button>
        </Grid>
        {
          alert.length ?
            <Grid item>
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
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