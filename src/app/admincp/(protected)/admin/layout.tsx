export const runtime = 'edge'
import { Container, Typography } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import * as React from 'react';

import ResponsiveAppBar from '@/components/ResponsiveAppBar';

import { IsAdmin } from '@/app/api/auth/IsAdmin';
import { GLOBAL_STYLES } from '@/styles';

import { auth } from '../../../auth';
import { getD1Database } from '@/app/api/_lib/DBService/index';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const db = getD1Database();
  const admin = await IsAdmin(db, session?.user?.id ?? "");

  return (
    <html lang='en'>
      <body>
        <GlobalStyles styles={GLOBAL_STYLES} />

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
