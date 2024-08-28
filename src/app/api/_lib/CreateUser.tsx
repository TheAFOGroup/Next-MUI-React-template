export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
import { GetUser } from '@/app/api/_lib/GetUser';
export interface Env {
  DB: D1Database;
}
import { getRequestContext } from '@cloudflare/next-on-pages'



export async function CreateUser(email: string, password: string): Promise<boolean> {
  const { env } = getRequestContext()
  const myDb = env.DB;

  if (await GetUser(email)) {
    console.error("User already exist");
    return false
  }

  const userId = crypto.randomUUID()

  const stmt = `INSERT INTO users (id, email, password) VALUES ('${userId}','${email}', '${password}';
  INSERT INTO account (userId, type,provider,providerAccountId) VALUES ('${userId}','credentials','credentials','${userId}')`;


  try {
    // Prepare and execute the query
    const res = await myDb.prepare(stmt).run()
    // Send a response back to the client
    return (res.success)
  } catch (error) {
    console.error('Error processing GET request:', error);
    return false
  }



}