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
export interface Env {
  DB: D1Database;
}
import { BuildFormType, BuildFormResponse } from '@/app/api/forms/buildform/type';
import { v4 as uuidv4 } from 'uuid';

interface formId {
  form_id: number
}

interface formFieldId {
  form_field_id: number
}

export async function BuildForm(myDb: D1Database, data: BuildFormType) {
  // TODO: Implenmnet rollback in case of fail transaction
  try {
    const uuid = uuidv4();

    // Get JSON data from the POST request body
    const stmt = `INSERT INTO forms (form_name, form_UUID, form_owner, form_description)
              VALUES 
                (?,?, ?, ?)
              returning form_id;`;

    console.log('Executing SQL statement:', stmt);
    const formIdRes = await myDb.prepare(stmt)
      .bind(data.form_name, uuid, data.form_owner, data.form_description)
      .first<formId>();

    const formId = formIdRes?.form_id;

    // Insert form fields and get their IDs
    const formFieldIds: { formFieldId: number | undefined; fieldInfo: string[]; }[] = [];
    for (const field of data.form_fields) {
      const formFieldRes = await myDb.prepare(`INSERT INTO form_fields (form_id, field_name, field_type, field_order) VALUES (${formId}, ?, ?, ?) RETURNING form_field_id`)
        .bind(field.field_name, field.field_type, field.field_order)
        .first<formFieldId>();

      console.log("formFieldId", formFieldRes)

      const formFieldId = formFieldRes?.form_field_id;
      formFieldIds.push({ formFieldId, fieldInfo: field.field_info });
      console.log("formFieldIds", formFieldIds)
    }

    // Insert field info with the corresponding form_field_id
    for (const { formFieldId, fieldInfo } of formFieldIds) {
      for (const info of fieldInfo) {
        await myDb.prepare('INSERT INTO field_info (form_field_id, field_info_item) VALUES (?, ?)')
          .bind(formFieldId, info)
          .run();
      }
    }

    const respond: BuildFormResponse = { UUID: uuid }
    // Send a response back to the client
    return ({ message: 'Data received successfully', respond });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return error;
  }
}