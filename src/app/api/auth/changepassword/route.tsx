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
import { ChangePasswordData } from '@/app/api/auth/changepassword/type';

export async function PUT(req: Request) {
  if (!(await CheckAPIkey(req))) {
    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
  }

  const { env } = getRequestContext()
  const myDb = env.DB;

  const data: ChangePasswordData = (await req.json()) as ChangePasswordData;
  console.log('Received data:', data);

  const user = await GetUser(data.email);

  if (!user) {
    console.error("User does not exist");
    return NextResponse.json({ message: 'User does not exist' }, { status: 400 });
  }

  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const saltedpassword = await bcrypt.hash(data.password, salt)

  try {
    const res = await myDb.prepare(`UPDATE users SET password = ? WHERE id = ?;`).bind(saltedpassword, user.id).run();
    return NextResponse.json(res);
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json({ success: false });
  }
}