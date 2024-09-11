import DBService from './DBService';
import { getRequestContext } from '@cloudflare/next-on-pages';

export interface Env {
  DB: D1Database;
}

export const runtime = 'edge';

function initializeDBService(): void {
  const { env } = getRequestContext();
  const myDb = env.DB;

  DBService.getInstance(myDb); // Initialize the singleton instance
}

export function getD1Database(): D1Database {
  try {
    return DBService.getDB(); // Attempt to get the database instance
  } catch (error) {
    initializeDBService(); // Initialize if not already done
    return DBService.getDB(); // Return the initialized instance
  }
}