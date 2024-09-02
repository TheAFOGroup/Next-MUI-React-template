export const runtime = 'edge'
import { Container, Typography } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import * as React from 'react';

import { SignOut } from '@/components/auth/signoutButton';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { GLOBAL_STYLES } from '@/styles';
import axios from 'axios';

import { auth } from '../../../auth';
import { IsAdmin } from '@/app/api/_lib/IsAdmin';

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
