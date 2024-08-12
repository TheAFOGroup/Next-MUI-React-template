export const runtime = 'edge';
export interface Env {
  DB: D1Database;
}
//import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from 'next/server';

export const GET = async () => {
  //const db = getRequestContext().env.DB
  const stmt = context.env.DB.prepare('SELECT * FROM form_fields').all()

  return NextResponse.json(JSON.stringify(stmt));
};