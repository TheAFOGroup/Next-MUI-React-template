export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
import { NextRequest, NextResponse } from 'next/server';
import { SubmitForm } from '@/app/api/submitForm/types';
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
    console.log('Received data:', data);
    // Assuming data is an array of objects with { key, value }
    const entriesArray = (data as SubmitForm[]).map(({ Field, Value }) => `${Value}`);
    console.log(entriesArray);

    // Construct the SQL statement
    let stmt = "INSERT INTO responses (response) VALUES ";
    const values = entriesArray.map(value => `('${value}')`).join(", ");
    stmt += values + ";";

    // Process the data as needed
    console.log('Executing SQL statement:', stmt);
    const res = await myDb.prepare(stmt).run();

    // Send a response back to the client
    return NextResponse.json({ message: 'Data received successfully', data, res });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }


}