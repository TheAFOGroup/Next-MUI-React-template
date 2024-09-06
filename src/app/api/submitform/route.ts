export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
import { NextRequest, NextResponse } from 'next/server';
import { CheckAPIkey } from '@/app/api/_lib/CheckAPIkey';
import { SubmitForm } from '@/app/api/submitform/types';
export interface Env {
  DB: D1Database;
}
import { getRequestContext } from '@cloudflare/next-on-pages'

interface responseId {
  response_id: number
}

/**
 * Handles the POST request for submitting a form.
 * 
 * @param req - The NextRequest object representing the incoming request.
 * @returns A NextResponse object representing the response to be sent back to the client.
 */
export async function POST(req: NextRequest) {
  if (!(await CheckAPIkey(req))) {
    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
  }

  const { env } = getRequestContext()
  const myDb = env.DB;

  try {
    // Get JSON data from the POST request body
    const data: SubmitForm = (await req.json()) as SubmitForm;

    const stmt = `INSERT INTO user_responses (form_id)
VALUES 
(?)
returning response_id;
`;

    console.log('Executing SQL statement:', stmt);
    const formResult = await myDb.prepare(stmt)
      .bind(data.form_id)
      .first<responseId>();

    if (!formResult) {
      return NextResponse.json({ message: 'Table not found' }, { status: 404 });;
    }

    const response_id = formResult?.response_id;

    // Dynamically construct the SQL statement for form fields

    const responseValues = data.form_fields.map(() => `(${response_id},?, ?)`).join(', ');
    const stmt2 = `INSERT INTO response_entries (response_id, form_field_id, response) VALUES ${responseValues};`;

    const responseParams: (number | string)[] = [];
    data.form_fields.forEach((field) => {
      responseParams.push(field.form_field_id, field.response);
    });
    console.log(responseParams)
    const res = await myDb.prepare(stmt2).bind(...responseParams).run();

    return NextResponse.json(res);
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}