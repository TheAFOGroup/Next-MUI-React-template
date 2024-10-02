export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
import { NextRequest, NextResponse } from 'next/server';
export interface Env {
  DB: D1Database;
}
import { CheckAPIkey } from '@/app/api/_lib/CheckAPIkey';
import { getD1Database } from '@/app/api/_lib/DBService/index';
import { BuildEvent } from './BuildEvent';
import { BuildEventType } from '@/app/api/events/buildevent/types';
export async function POST(req: NextRequest) {
  if (!(await CheckAPIkey(req))) {
    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
  }

  const data: BuildEventType = (await req.json()) as BuildEventType;
  console.log('Received data:', data);

  // TODO: Implenmnet rollback in case of fail transaction
  try {
    const db = getD1Database()
    const respond = await BuildEvent(db, data);

    return NextResponse.json(respond)
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred while processing the request', error }, { status: 500 });
  }
}