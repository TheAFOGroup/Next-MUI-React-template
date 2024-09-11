import { D1Database } from '@cloudflare/workers-types';

class DBService {
  private static instance: DBService;
  private myDb: D1Database;

  private constructor(db: D1Database) {
    this.myDb = db;
  }

  public static getInstance(db?: D1Database): DBService {
    if (!DBService.instance) {
      if (!db) {
        throw new Error('Database instance is not initialized.');
      }
      DBService.instance = new DBService(db);
    }
    return DBService.instance;
  }

  public static getDB(): D1Database {
    if (!DBService.instance) {
      throw new Error('Database instance is not initialized.');
    }
    return DBService.instance.myDb;
  }
}

export default DBService;