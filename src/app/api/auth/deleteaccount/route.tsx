export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'

import { GetUser } from '@/app/api/_lib/GetUser';
export interface Env {
  DB: D1Database;
}
import { getRequestContext } from '@cloudflare/next-on-pages'
import bcrypt from "bcryptjs";
import { NextResponse } from 'next/server';

import { CheckAPIkey } from '@/app/api/_lib/CheckAPIkey';
import { DeleteAccountData } from '@/app/api/auth/deleteaccount/type';

export async function DELETE(req: Request) {
  if (!(await CheckAPIkey(req))) {
    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
  }

  const { env } = getRequestContext()
  const myDb = env.DB;

  const data: DeleteAccountData = (await req.json()) as DeleteAccountData;
  console.log('Received data:', data);

  const user = await GetUser(data.email);

  if (!user) {
    console.error("User does not exist");
    return NextResponse.json({ message: 'User does not exist' }, { status: 400 });
  }

  const statements = [
    `DELETE FROM users WHERE id = ?;`,
    `DELETE FROM accounts WHERE userId = ?;`,
    `DELETE FROM authorize WHERE id = ?;`
  ];

  const batchStatements = [
    myDb.prepare(statements[0]).bind(user.id),
    myDb.prepare(statements[1]).bind(user.id),
    myDb.prepare(statements[2]).bind(user.id)
  ];

  try {
    await myDb.batch(batchStatements);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing GET request:', error);
    return NextResponse.json({ success: false });
  }
}