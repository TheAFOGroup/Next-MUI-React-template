/*

// services/UserService.ts
export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'

class DBService {
  private static instance: DBService;
  private myDb: D1Database;

  constructor(db: D1Database) {
    this.myDb = db
  }

  public static getInstance(db?: any): DBService {
    if (!DBService.instance) {
      DBService.instance = new DBService(db);
    }
    return DBService.instance;
  }

  public getDB(): D1Database {
    return this.myDb;
  }
}

export default DBService;

////////////////////////////////////////////////////
// services/index.ts
import DBService from './DBService'; // Corrected import statement

const { env } = getRequestContext();
const myDb = env.DB;

const userService = DBService.getInstance(myDb); // Use getInstance to get the singleton instance

export { userService };

/////////////////////////////////////////////////////

export async function setUser(user: User): Promise<void> {
  const db = userService.getDB(); // Get the database instance from the singleton
  const stmt = `INSERT INTO users (id, name, email, emailVerified, image, password) VALUES (?, ?, ?, ?, ?, ?)`;
  try {
    await db.prepare(stmt).run(user.id, user.name, user.email, user.emailVerified, user.image, user.password);
    console.log('User set successfully');
  } catch (error) {
    console.error('Error processing SET request:', error);
  }
}

/////////////////////////////////////////////////////////

import { GetUser } from './path/to/GetUser';
import { Log, LogLevel, Miniflare } from "miniflare";

async function testGetUser() {
  const nullScript =
    "export default {fetch: () => new Response(null, {status:404})};";
  const mf = new Miniflare({
    modules: true,
    script: nullScript,
    d1Databases: { DB: "xxx-xxx" },
  });

  const db = await mf.getD1Database("DB");

  const user = await GetUser(db, 'test@example.com');
  console.log(user);
}

testGetUser();

/////////////////////////////////////////////////////////////////////

/*
import avaTest, { TestFn, ExecutionContext } from 'ava'
import { Miniflare } from 'd1testflare'

export interface Context {
  mf: Miniflare
}

const test = avaTest as TestFn<Context>

test.beforeEach(async (t: ExecutionContext<Context>) => {
  // Create a new Miniflare environment for each test
  const mf = new Miniflare({
    envPath: true,
    packagePath: true,
    wranglerConfigPath: true,
    buildCommand: undefined,
    modules: true,
    d1Databases: ['TEST_DB'],
  })
  t.context = { mf }
  // prep the db
  const db = await mf.getD1Database('TEST_DB')
  db.exec('CREATE TABLE IF NOT EXISTS Customers (CustomerID INT PRIMARY KEY, CompanyName TEXT, ContactName TEXT);')
  const stmt = db.prepare('INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (?, ?, ?)')
  await db.batch([
    stmt.bind(1, 'Alfreds Futterkiste', 'Maria Anders'),
    stmt.bind(11, 'Bs Beverages', 'Victoria Ashworth'),
    stmt.bind(13, 'Bs Beverages', 'Random Name'),
  ]).catch(err => console.error(err))
})

test('d1: ...', async (t: ExecutionContext<Context>) => {
  ...
})
*/
