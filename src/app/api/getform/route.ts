export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
import { NextRequest, NextResponse } from 'next/server';
export interface Env {
  DB: D1Database;
}
import { getRequestContext } from '@cloudflare/next-on-pages'

import { CheckAPIkey } from '@/app/api/_lib/CheckAPIkey';
import { Form, FormField } from '@/app/api/getform/types';

/**
 * Retrieves a form based on the provided form UUID.
 * 
 * @param req - The NextRequest object representing the incoming request. 
 * form_uuid: string - The UUID of the form to retrieve.
 * @returns A JSON response containing the form data if successful, or an error message if unsuccessful.
 * @throws 401 - Unauthorized: The request does not include a valid API key.
 * @throws 500 - Internal Server Error: An error occurred while processing the request.
 * @throws 404 - Not Found: The form with the provided UUID does not exist.
 * @example GET /api/getform?form_uuid=12345678-1234-1234-1234-123456789012
 */
export async function GET(req: NextRequest) {
  if (!(await CheckAPIkey(req))) {
    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
  }

  const { env } = getRequestContext()
  const myDb = env.DB;

  try {
    // Get JSON data from the POST request body
    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get('form_uuid');
    console.log('Received data:', uuid);

    const stmt = `SELECT 
    form_id,
    form_name,
    form_description
FROM 
    forms
WHERE
    form_UUID = ?;
`;

    console.log('Executing SQL statement:', stmt);
    const formResult = await myDb.prepare(stmt)
      .bind(uuid)
      .first<Form>();

    if (!formResult) {
      return NextResponse.json({ message: 'Table not found' }, { status: 404 });;
    }

    const formId = formResult?.form_id;

    // Dynamically construct the SQL statement for form fields
    const stmt2 = `
    SELECT 
    field_name,
    field_type,
    field_order,
    form_id,
    form_field_id
  FROM 
    form_fields
  WHERE
    form_id = ${formId}
  ORDER BY field_order;
    `;
    const formFieldRes = await myDb.prepare(stmt2)
      .all<FormField>();

    // Send a response back to the client
    formResult.form_fields = formFieldRes?.results || [];

    return NextResponse.json(formResult);
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}