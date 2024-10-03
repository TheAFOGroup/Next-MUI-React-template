export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
export interface Env {
  DB: D1Database;
}

import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

import { SignUpData } from '@/app/api/auth/signup/type';
/**
 * Signup create a new user
 * @param myDb 
 * @param data 
 * @returns userId
 */
export async function Signup(myDb: D1Database, data: SignUpData) {

  const userId = uuidv4();

  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const saltedpassword = await bcrypt.hash(data.password, salt)

  const statements = [
    `INSERT INTO users (id, email, password) VALUES (?, ?, ?);`,
    `INSERT INTO accounts (id, userId, type, provider, providerAccountId) VALUES (?,?, ?, ?, ?);`,
    `INSERT INTO authorize (id, admin) VALUES (?, ?);`
  ];

  const batchStatements = [
    myDb.prepare(statements[0]).bind(userId, data.email, saltedpassword),
    myDb.prepare(statements[1]).bind(userId, userId, 'credentials', 'credentials', userId),
    myDb.prepare(statements[2]).bind(userId, data.authorize.admin)
  ];

  await myDb.batch(batchStatements);
  return userId
}
