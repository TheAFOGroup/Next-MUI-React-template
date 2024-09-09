export const runtime = 'edge'
import { Container, Typography } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import * as React from 'react';

import ResponsiveAppBar from '@/components/ResponsiveAppBar';

import { IsAdmin } from '@/app/api/_lib/IsAdmin';
import { GLOBAL_STYLES } from '@/styles';

import { auth } from '../../../auth';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const admin = await IsAdmin(session?.user?.id ?? "");

  return (
    <html lang='en'>
      <GlobalStyles styles={GLOBAL_STYLES} />
      <body>
        {admin ? (
          <>
            <ResponsiveAppBar session={session}></ResponsiveAppBar>
            <Container sx={{ pl: 0, pr: 0 }}>{children}</Container>
          </>
        ) : (
          <>
            <Typography>You must be an admin to see this pages</Typography>
          </>
        )}
      </body>
    </html>
  );
}
