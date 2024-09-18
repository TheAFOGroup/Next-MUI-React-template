import { Box, Button } from '@mui/material';
import { redirect } from 'next/navigation';
import { auth } from '../auth';

const Admincp = async () => {
  const session = await auth();

  if (!session) {
    return (
      <></>
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