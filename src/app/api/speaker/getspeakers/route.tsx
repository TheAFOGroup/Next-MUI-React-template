/**
 * Handles the POST request for building a form.
 * 
 * @param req - The NextRequest object representing the incoming request that include formId.
 * Body:
 * export interface BuildFormType {
  form_name: string;
  form_owner: string;
  form_description: string;
  form_fields: FormField[];
  }

interface FormField {
  field_name: string;
  field_type: string;
  field_order: number;
}
 * @returns A NextResponse object representing the response to be sent back to the client.
 */
export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
import { NextRequest, NextResponse } from 'next/server';
export interface Env {
  DB: D1Database;
}
import { CheckAPIkey } from '@/app/api/_lib/CheckAPIkey';
import { getD1Database } from '@/app/api/_lib/DBService/index';
import { GetSpeakers } from '@/app/api/speaker/getspeakers/getspeakers';
export async function GET(req: NextRequest) {
  if (!(await CheckAPIkey(req))) {
    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get('owner');
  const speakerIds = searchParams.getAll('events_speaker_id');

  // TODO: Implement rollback in case of fail transaction
  try {
    const db = getD1Database();
    const respond = await GetSpeakers(db, owner, speakerIds);
    return NextResponse.json(respond)
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred while processing the request', error }, { status: 500 });
  }
}