export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { CheckAPIkey } from '@/app/api/_lib/CheckAPIkey';
import { IsAdmin } from '@/app/api/_lib/IsAdmin';
import { UserId } from '@/app/api/auth/IsAdmin/type';

export async function GET(req: NextRequest) {
  if (!(await CheckAPIkey(req))) {
    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
  }

  const data: UserId = (await req.json()) as UserId;
  console.log('Received data:', data);
  return NextResponse.json(await IsAdmin(data.userId))
}