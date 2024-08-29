export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
import { NextResponse } from 'next/server';

export interface Env {
  DB: D1Database;
}
import { getRequestContext } from '@cloudflare/next-on-pages'
import { CheckAPIkey } from '@/app/api/_lib/CheckAPIkey';


export async function SearchParamDb(request: Request, table: string) {
  if (!(await CheckAPIkey(request))) {
    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
  }

  const { env } = getRequestContext()
  const myDb = env.DB;

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  // Start with the base SQL query
  let stmt = "SELECT * FROM " + table
  if (searchParams.size != 0) {
    stmt += " WHERE "
  }
  searchParams.forEach((value: string, key: string) => {
    stmt += key + "= '" + value + "' AND "
  })
  const lastAndIndex = stmt.lastIndexOf(" AND ");
  if (lastAndIndex !== -1) {
    stmt = stmt.slice(0, lastAndIndex);
  }
  console.log(stmt)
  try {
    // Prepare and execute the query
    const res = await myDb.prepare(stmt).all();
    // Send a response back to the client
    return NextResponse.json(res.results);
  } catch (error) {
    console.error('Error processing GET request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }


}