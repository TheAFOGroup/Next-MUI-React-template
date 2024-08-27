export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'

export interface Env {
  DB: D1Database;
}
import { getRequestContext } from '@cloudflare/next-on-pages'


export async function GetUser(email: string, password: string): Promise<boolean> {
  const { env } = getRequestContext()
  const myDb = env.DB;
  const stmt = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
  try {
    // Prepare and execute the query
    const res = await myDb.prepare(stmt).all()
    // Send a response back to the client
    return (res.results.length !== 0)
  } catch (error) {
    console.error('Error processing GET request:', error);
    return false
  }
}