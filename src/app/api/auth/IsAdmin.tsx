export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'

export interface Env {
  DB: D1Database;
}

interface isAdmin {
  admin: boolean
}

export async function IsAdmin(myDb: D1Database, userId: string): Promise<boolean> {
  const stmt = `SELECT admin FROM authorize WHERE id = '${userId}'`;
  try {
    // Prepare and execute the query
    const res = await myDb.prepare(stmt).first<isAdmin>()
    console.log(res) // Send a response back to the client
    if (res === null) {
      return false;
    }

    return !!res.admin;
  } catch (error) {
    console.error('Error processing GET request:', error);
    return false;
  }
}

// hasAdmin Check if there is any admin in the database
export async function HasAdmin(myDb: D1Database): Promise<boolean> {
  const stmt = `SELECT EXISTS (
  SELECT 1
  FROM authorize
  WHERE admin = true
) as admin;`;
  try {
    // Prepare and execute the query
    const res = await myDb.prepare(stmt).first<isAdmin>()
    console.log(res) // Send a response back to the client
    if (res === null) {
      return false;
    }

    return !!res.admin;
  } catch (error) {
    console.error('Error processing GET request:', error);
    return false;
  }
}