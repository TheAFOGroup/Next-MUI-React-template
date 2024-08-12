export const runtime = 'edge';
export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "DB" with the variable name you defined.
  DB: D1Database;
}
import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from 'next/server';

export const GET = async () => {
  const db = getRequestContext().env.DB
  const stmt = db.prepare('SELECT * FROM form_fields').all()

  return NextResponse.json(JSON.stringify(stmt));
};