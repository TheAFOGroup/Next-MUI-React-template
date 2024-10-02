import { Grid, Button } from '@mui/material';
import { auth } from '../../../auth';
import { IsAdmin } from '@/app/api/auth/IsAdmin';
import React from 'react';

const Dashboard = async () => {
  const session = await auth();
  const admin = await IsAdmin(session?.user?.id ?? "");

  return (
    <Grid container spacing={2}>
      {admin ? <Grid item>
        <Button variant="contained" href='/admincp/admin'>
          Admin Page
        </Button>
      </Grid> : <></>}
      <Grid item>
        <Button variant="contained" href='/admincp/forms/buildform'>
          Build Form
        </Button>
      </Grid>

      <Grid item>
        <Button variant="contained" href='/admincp/forms/viewform'>
          View Form
        </Button>
      </Grid>

      <Grid item>
        <Button variant="contained" href='/admincp/speakers/buildspeakers'>
          Build Speakers
        </Button>
      </Grid>

      <Grid item>
        <Button variant="contained" href='/admincp/events/buildevents'>
          Build Events
        </Button>
      </Grid>

    </Grid>
  );
}

export default Dashboard;

