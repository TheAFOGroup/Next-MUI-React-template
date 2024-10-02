export const runtime = 'edge'
import { Container, Typography } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import * as React from 'react';

import { SignIn } from '@/components/auth/signinButton';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { GLOBAL_STYLES } from '@/styles';

import { auth } from '../../auth';
import { SessionProvider } from 'next-auth/react';

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
            <SessionProvider session={session}>
              <Container sx={{ pl: 0, pr: 0 }}>{children}</Container>
            </SessionProvider>

          </>
        ) : (
          <>
            <Typography>You must sign in to continue</Typography>
            <SignIn />
          </>
        )}
      </body>
    </html>
  );
}
