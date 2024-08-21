import { Box } from '@mui/material';
import { SignIn } from '@/components/auth/signinButton';
import { SignOut } from '@/components/auth/signoutButton';
import { SessionProvider } from "next-auth/react";
import { auth } from '../../auth';

const AppHome = async () => {
  const session = await auth();

  return (
    <SessionProvider>
      <Box>
        session={JSON.stringify(session)}
        {session ? <SignOut /> : <SignIn />}
        db={JSON.stringify(process.env.DB)}
      </Box>
    </SessionProvider>

  );
};

export default AppHome;