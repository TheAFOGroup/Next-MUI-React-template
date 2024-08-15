import { Box } from '@mui/material';

import Register from '@/components/Register';
import SignIn from '@/components/Signin';
import MediaGrid from '@/components/events/MediaGrid';

//import { PageParams } from '@/types';
/*
const loadDataFromApi = async (slug?: string) => {
  if (slug === 'testError500') {
    throw new Error('This is mock a ssr 500 test error');
  }

  // Fetch & cache data from 2 remote APIs test
  const [reactNpmData, nextJsNpmData] = await Promise.all([
    getApiResponse<NpmData>({
      apiEndpoint: 'https://registry.npmjs.org/react/latest',
      revalidate: 60 * 60 * 24, // 24 hours cache
      timeout: 5000, // 5 seconds
    }),
    getApiResponse<NpmData>({
      apiEndpoint: 'https://registry.npmjs.org/next/latest',
      revalidate: 0, // no cache
      timeout: 5000, // 5 seconds
    }),
  ]);

  return {
    reactNpmData,
    nextJsNpmData,
  };
};
*/
//const AppHome = async ({ searchParams }: PageParams) => {

const AppHome = async () => {
  //const slug = searchParams?.slug;
  //const { reactNpmData, nextJsNpmData } = await loadDataFromApi(slug);

  return (
    <Box>
      <MediaGrid />
    </Box>
  );
};

export default AppHome;
