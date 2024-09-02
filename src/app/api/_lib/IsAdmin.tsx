export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'

export interface Env {
  DB: D1Database;
}
import { getRequestContext } from '@cloudflare/next-on-pages'

interface isAdmin {
  admin: boolean
}

export async function IsAdmin(userId: string): Promise<boolean> {
  const { env } = getRequestContext()
  const myDb = env.DB;
  const stmt = `SELECT admin FROM authorize WHERE id = '${userId}'`;
  try {
    // Prepare and execute the query
    const res = await myDb.prepare(stmt).first<isAdmin>()
    console.log(res) // Send a response back to the client
    if (res === null) {
      return false;
    }

    return res.admin;
  } catch (error) {
    console.error('Error processing GET request:', error);
    return false;
  }
}

