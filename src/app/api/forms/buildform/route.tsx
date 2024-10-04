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
import { BuildFormType, BuildFormResponse } from '@/app/api/forms/buildform/type';
import { getD1Database } from '@/app/api/_lib/DBService/index';
import { BuildForm } from '@/app/api/forms/buildform/Buildform';

export async function POST(req: NextRequest) {
  if (!(await CheckAPIkey(req))) {
    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
  }

  const data: BuildFormType = (await req.json()) as BuildFormType;
  console.log('Received data:', data);

  // TODO: Implenmnet rollback in case of fail transaction
  try {
    const db = getD1Database()
    const respond = await BuildForm(db, data);

    return NextResponse.json(respond)
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred while processing the request ' + error }, { status: 500 });
  }
}