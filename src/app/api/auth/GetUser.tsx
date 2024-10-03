export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'

export interface Env {
  DB: D1Database;
}

export interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
}

export async function GetUser(myDb: D1Database, email: string): Promise<User | null> {
  const stmt = `SELECT * FROM users WHERE email = '${email}'`;
  try {
    // Prepare and execute the query
    const res = await myDb.prepare(stmt).first<User>()
    console.log(res) // Send a response back to the client
    if (res === null) {
      return null;
    }

    return res;
  } catch (error) {
    console.error('Error processing GET request:', error);
    return null;
  }
}

