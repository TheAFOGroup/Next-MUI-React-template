import React from 'react'; // Import the 'React' module

import { Box, Button } from '@mui/material';
import { auth } from '../auth';
import { SignIn } from '@/components/auth/signinButton';

const Admincp = async () => {
  const session = await auth();

  if (!session) {
    return (
      <SignIn />
    )
  }
  return (
    <Box>
      <Button variant="contained" href='/admincp/forms/buildForm'>
        Build Form
      </Button>
    </Box>
  );
};

export default Admincp;