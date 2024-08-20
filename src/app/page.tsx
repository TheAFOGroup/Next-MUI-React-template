import { Box } from '@mui/material';
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"

import { SignIn } from '@/components/auth/signinButton';
import { SignOut } from '@/components/auth/signoutButton';
import { auth } from "./api/auth/[...nextauth]/route"


const AppHome = async ({ Component, pageProps }: AppProps) => {
  const session = await auth();

  //const { session, ...restPageProps } = pageProps;
  //const slug = searchParams?.slug;
  //const { reactNpmData, nextJsNpmData } = await loadDataFromApi(slug);
  return (
    //<SessionProvider session={pageProps?.session}>
    <Box>
      {JSON.stringify(session)}
      {session ? (<SignOut />) : (<SignIn />)}
    </Box>
    // </SessionProvider>
  );
};

export default AppHome;
