export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'

import { GetUser } from '@/app/api/auth/GetUser';
export interface Env {
  DB: D1Database;
}

import { NextResponse } from 'next/server';

import { CheckAPIkey } from '@/app/api/_lib/CheckAPIkey';
import { getD1Database } from '@/app/api/_lib/DBService/index';
import { Signup } from '@/app/api/auth/signup/signup';
import { SignUpData } from '@/app/api/auth/signup/type';

export async function POST(req: Request) {
  if (!(await CheckAPIkey(req))) {
    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
  }

  const db = getD1Database()


  const data: SignUpData = (await req.json()) as SignUpData;
  console.log('Received data:', data);


  try {
    if (await GetUser(db, data.email)) {
      console.error("User already exist");
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    await Signup(db, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing GET request:', error);
    return NextResponse.json({ success: false });
  }
}