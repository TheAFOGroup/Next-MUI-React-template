export const runtime = 'edge';
//import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from 'next/server';

export const GET = async () => {
  //const db = getRequestContext().env.DB
  const stmt = (process.env.DB as any)?.prepare('SELECT * FROM form_fields').all()

  return NextResponse.json(JSON.stringify(stmt));
};