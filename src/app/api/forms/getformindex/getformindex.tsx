export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
export interface Env {
  DB: D1Database;
}
import { FormIndexRespond } from '@/app/api/forms/getformindex/types';
/**
 * GetFormIndex get all the form title that created by that user
 * @param myDb DB instance
 * @param user user that own the form
 * @returns list of forms not including the fields
 */
export async function GetFormIndex(myDb: D1Database, user: string): Promise<FormIndexRespond[] | Error> {

  try {
    const stmt = `SELECT 
    form_id,
    form_UUID,
    form_name,
    form_description,
    form_owner,
    created_at,
    updated_at
FROM 
    forms
WHERE
    form_owner = ?;
`;


    console.log('Executing SQL statement:', stmt);
    const formResult = await myDb.prepare(stmt)
      .bind(user)
      .all<FormIndexRespond>();

    return formResult.results
  } catch (error) {
    return Error(String(error));
  }
}