export const runtime = 'edge'
import { Container } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import { redirect } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import * as React from 'react';

import ResponsiveAppBar from '@/components/ResponsiveAppBar';

import { GLOBAL_STYLES } from '@/styles';

import { auth } from '../../auth';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect(process.env.NEXT_PUBLIC_HOST + '/admincp/signIn');
    return null; // Return null to prevent further rendering  }
  }
  return (
    <html lang='en'>
      <body>
        <GlobalStyles styles={GLOBAL_STYLES} />
        {session ? (
          <>
            <SessionProvider session={session}>
              <ResponsiveAppBar session={session}></ResponsiveAppBar>
              <Container sx={{ pl: 0, pr: 0 }}>{children}</Container>
            </SessionProvider>
          </>
        ) : (
          <></>
        )}
      </body>
    </html>
  );
}
