export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
import { NextResponse } from 'next/server';

import { Event } from './types';
export interface Env {
  DB: D1Database;
}
import { getRequestContext } from '@cloudflare/next-on-pages'


export async function GET(request: Request) {
  const url = new URL(request.url);
  const eventId = url.searchParams.get('event_id'); // Get the 'event_id' parameter

  const { env } = getRequestContext()
  const myDb = env.DB;

  try {
    // Get JSON data from the POST request body
    //const data = await req.json();
    //console.log('Received data:', data);
    // Assuming data is an array of objects with { key, value }

    // Construct the SQL statement

    let stmt = "select * from events ";
    if (eventId != null) {
      stmt += "where event_id =" + eventId + ";"
    }

    // Process the data as needed

    const res = await myDb.prepare(stmt).all<Event[]>();

    // Send a response back to the client
    return NextResponse.json(res.results);
  } catch (error) {
    console.error('Error processing GET request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }


}