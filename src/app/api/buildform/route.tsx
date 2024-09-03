export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
import { NextRequest, NextResponse } from 'next/server';
import { SubmitForm } from '@/app/api/submitForm/types';
export interface Env {
  DB: D1Database;
}
import { getRequestContext } from '@cloudflare/next-on-pages'
import { CheckAPIkey } from '@/app/api/_lib/CheckAPIkey';
import { BuildFormType } from '@/app/api/buildform/type';

interface formId {
  form_id: number
}

export async function POST(req: NextRequest) {
  if (!(await CheckAPIkey(req))) {
    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
  }

  const { env } = getRequestContext()
  const myDb = env.DB;

  const uuid = crypto.randomUUID()

  try {
    // Get JSON data from the POST request body
    const data: BuildFormType = (await req.json()) as BuildFormType;
    console.log('Received data:', data);

    const stmt = `INSERT INTO forms (form_name, form_UUID, form_owner, form_description)
              VALUES 
                (?,?, ?, ?)
              returning form_id;`;

    console.log('Executing SQL statement:', stmt);
    const formIdRes = await myDb.prepare(stmt)
      .bind(data.form_name, uuid, data.form_owner, data.form_description)
      .first<formId>();

    const formId = formIdRes?.form_id;

    // Dynamically construct the SQL statement for form fields
    const fieldValues = data.form_fields.map((field, index) => `(${formId}, ?, ?, ?)`).join(', ');
    const stmt2 = `INSERT INTO form_fields (form_id, field_name, field_type, field_order) VALUES ${fieldValues};`;

    const fieldParams = data.form_fields.flatMap((field, index) => [field.field_name, field.field_type, field.field_order]);

    console.log('Executing SQL statement for form fields:', stmt2);
    const res = await myDb.prepare(stmt2).bind(...fieldParams).run();

    // Send a response back to the client
    return NextResponse.json({ message: 'Data received successfully', data, res });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}