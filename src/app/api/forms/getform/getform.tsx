export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
export interface Env {
  DB: D1Database;
}

import { Form, FormField } from '@/app/api/forms/getform/types';
/**
 * Retrieves a form from the database based on the provided UUID.
 * 
 * @param uuid - The UUID of the form to retrieve.
 * @returns A Promise that resolves to the retrieved form object.
 * @throws If the form is not found in the database or an error occurs during retrieval.
 */
export async function GetForm(myDb: D1Database, uuid: string) {

  try {
    // Get JSON data from the POST request body
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

    console.log(formResult)

    if (formResult == null) {
      throw Error('Form not found');
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

    console.log(formFieldRes)

    if (formFieldRes?.results) {
      for (const formField of formFieldRes.results) {
        const fieldInfoStmt = `
          SELECT 
            field_info_item
          FROM 
            field_info
          WHERE
            form_field_id = ?;
        `;
        const fieldInfoRes = await myDb.prepare(fieldInfoStmt).bind(formField.form_field_id).all<{ field_info_item: string }>();

        formField.field_info = fieldInfoRes?.results.map(info => info.field_info_item) || [];
      }
    }

    // Send a response back to the client
    formResult.form_fields = formFieldRes?.results || [];

    return formResult
  } catch (error) {
    return error
  }
}