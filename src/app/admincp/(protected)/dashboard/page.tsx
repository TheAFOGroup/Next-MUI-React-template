//import { useSession } from "next-auth/react";
import { Grid, Button } from '@mui/material';

const Dashboard = async () => {

  return (
    <Grid container spacing={2}>
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

