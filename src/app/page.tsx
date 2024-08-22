import { Box } from '@mui/material';
import { SignIn } from '@/components/auth/signinButton';
import { SignOut } from '@/components/auth/signoutButton';
import { SessionProvider } from "next-auth/react";
import { auth } from '../../auth';
import Register from '@/components/Register';
import { SignUp } from '@/components/auth/signUpButton';

const AppHome = async () => {
  const session = await auth();
  console.log("DB=", process.env.DB)
  const dbExist = process.env.DB.prepare("select 1 from users").all()
  console.log(dbExist)
  return (
    <SessionProvider>
      <Box>
        session={JSON.stringify(session)}
        {session ? <SignOut /> : <div><SignIn /><SignUp /></div>}
        <Register></Register>
      </Box>
    </SessionProvider>

  );
};

export default AppHome;