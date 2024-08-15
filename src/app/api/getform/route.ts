export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
import { NextResponse } from 'next/server';

export interface Env {
  DB: D1Database;
}
import { getRequestContext } from '@cloudflare/next-on-pages'


export async function GET() {
  const { env } = getRequestContext()
  const myDb = env.DB;
  const data: any = await myDb.prepare('SELECT * FROM form_fields').all();

  return NextResponse.json(data.results);
}