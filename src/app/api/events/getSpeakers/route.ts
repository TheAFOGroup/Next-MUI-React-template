export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
import { NextRequest, NextResponse } from 'next/server';
import { SubmitForm } from '@/app/api/submitForm/types';
import { Speaker } from './types';
export interface Env {
  DB: D1Database;
}
import { getRequestContext } from '@cloudflare/next-on-pages'


export async function GET(req: NextRequest) {

  const { env } = getRequestContext()
  const myDb = env.DB;

  try {
    // Get JSON data from the POST request body
    //const data = await req.json();
    //console.log('Received data:', data);
    // Assuming data is an array of objects with { key, value }

    // Construct the SQL statement
    const stmt = "select * from events_speaker; ";

    // Process the data as needed
    const res = await myDb.prepare(stmt).all<Speaker[]>();

    // Send a response back to the client
    return NextResponse.json(res.results);
  } catch (error) {
    console.error('Error processing GET request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }


}