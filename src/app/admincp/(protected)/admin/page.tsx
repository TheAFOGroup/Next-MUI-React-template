import { Grid, Link, Typography } from '@mui/material';
import React from 'react';

const Page: React.FC = () => {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h1">Admin Page</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Link href="/admincp/admin/auth/adduser" variant="body1">Add User</Link>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Link href="/admincp/admin/auth/deleteaccount" variant="body1">Delete Account</Link>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Link href="/admincp/admin/auth/changepassword" variant="body1">Change Password</Link>
      </Grid>
    </Grid>
  );
};

export default Page;
