export const runtime = 'edge'
import { Container, Typography } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import * as React from 'react';

import { SignIn } from '@/components/auth/signinButton';
import { SignOut } from '@/components/auth/signoutButton';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { GLOBAL_STYLES } from '@/styles';

import { auth } from '../../auth';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang='en'>
      <GlobalStyles styles={GLOBAL_STYLES} />
      <body>
        <ResponsiveAppBar session={session}></ResponsiveAppBar>
        {session ? (
          <>
            <SignOut />
            <Container sx={{ pl: 0, pr: 0 }}>{children}</Container>
          </>
        ) : (
          <>
            <SignIn />
            <Typography>You must sign in to continue</Typography>
          </>
        )}
      </body>
    </html>
  );
}
