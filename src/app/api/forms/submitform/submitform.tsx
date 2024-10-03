export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
export interface Env {
  DB: D1Database;
}

import { SubmitFormType } from '@/app/api/forms/submitform/types';
interface responseId {
  response_id: number
}

/**
 * Retrieves a form from the database based on the provided UUID.
 * 
 * @param uuid - The UUID of the form to retrieve.
 * @returns A Promise that resolves to the retrieved form object.
 * @throws If the form is not found in the database or an error occurs during retrieval.
 */
export async function SubmitForm(myDb: D1Database, data: SubmitFormType) {

  const stmt = `INSERT INTO user_responses (form_id)
      VALUES 
      (?)
      returning response_id;
      `;

  try {
    const formResult = await myDb.prepare(stmt)
      .bind(data.form_id)
      .first<responseId>();


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

    return res;
  } catch (e: any) {
    if (e.message.includes('SQLITE_CONSTRAINT')) {
      throw new Error("Form not found");
    } else {
      throw e;
    }
  }
}