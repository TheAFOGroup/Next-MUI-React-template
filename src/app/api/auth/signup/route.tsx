export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'

import { GetUser } from '@/app/api/auth/GetUser';
export interface Env {
  DB: D1Database;
}
import { getRequestContext } from '@cloudflare/next-on-pages'
import bcrypt from "bcryptjs";
import { NextResponse } from 'next/server';

import { CheckAPIkey } from '@/app/api/_lib/CheckAPIkey';
import { SignUpData } from '@/app/api/auth/signup/type';

export async function POST(req: Request) {
  if (!(await CheckAPIkey(req))) {
    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
  }

  const { env } = getRequestContext()
  const myDb = env.DB;

  const data: SignUpData = (await req.json()) as SignUpData;
  console.log('Received data:', data);

  if (await GetUser(data.email)) {
    console.error("User already exist");
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  const userId = crypto.randomUUID()

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

  try {
    await myDb.batch(batchStatements);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing GET request:', error);
    return NextResponse.json({ success: false });
  }
}