import React from 'react';
import { GetFormIndex } from '@/app/api/forms/getformindex/getformindex';
import { auth } from '../../../../auth';
import { getD1Database } from '@/app/api/_lib/DBService/index';
import { Form } from '@/app/api/forms/getformindex/types';
import { CardContent, Typography, Grid, Card } from '@mui/material';
import Link from 'next/link';


const Page: React.FC = async () => {
  const session = await auth();
  const db = getD1Database();
  const formIndex: Form[] = await GetFormIndex(db, session?.user?.email || '') as Form[];

  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography variant="h4" component="h1">
            You can view form result here
          </Typography>
        </Grid>
        {/* Your content goes here */}
        {formIndex.map((form) => (
          <Grid item key={form.form_id} xs={12} sm={6} md={4} lg={3}>
            <Link href={`viewform/${form.form_UUID}`} passHref style={{ textDecoration: 'none' }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {form.form_name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {form.form_description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Updated at: {form.updated_at.toString()}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div >
  );
};

export default Page;