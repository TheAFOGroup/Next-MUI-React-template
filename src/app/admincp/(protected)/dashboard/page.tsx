//import { useSession } from "next-auth/react";
import { auth } from '../../../auth';
import { Box, Button } from '@mui/material';

const Dashboard = async () => {

  return (
    <Box>
      <Button variant="contained" href='/admincp/forms/buildform'>
        Build Form
      </Button>

      <Button variant="contained" href='/admincp/forms/viewform'>
        View Form
      </Button>
    </Box>
  );
}

export default Dashboard;

