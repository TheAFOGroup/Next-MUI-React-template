export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
import { NextRequest, NextResponse } from 'next/server';

export interface Env {
  DB: D1Database;
}
import { getRequestContext } from '@cloudflare/next-on-pages'


export async function POST(req: NextRequest) {

  const { env } = getRequestContext()
  const myDb = env.DB;


  try {
    // Get JSON data from the POST request body
    const data = await req.json();
    console.log('Data received:', data);
    // Process the data as needed
    const res = await myDb.prepare('INSERT INTO responses (response) VALUES (?);')
      .bind((data as any).response).run();

    // Send a response back to the client
    return NextResponse.json({ message: 'Data received successfully', data, res });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }


}