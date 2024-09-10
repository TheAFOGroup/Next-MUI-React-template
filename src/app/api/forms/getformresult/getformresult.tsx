export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
export interface Env {
  DB: D1Database;
}
import { getRequestContext } from '@cloudflare/next-on-pages'

import { FormResult } from '@/app/api/forms/getformresult/types';

export async function GetFormResult(uuid: string): Promise<FormResult[]> {
  const { env } = getRequestContext();
  const myDb = env.DB;

  const stmt = `
    SELECT 
        re.response,
        re.response_id,
        ff.field_name,
        ff.field_type,
        ff.field_order,
        ur.created_at
    FROM 
        user_responses ur
    INNER JOIN 
        response_entries re ON ur.response_id = re.response_id
    INNER JOIN 
        form_fields ff ON re.form_field_id = ff.form_field_id
    INNER JOIN 
        forms f ON ff.form_id = f.form_id
    WHERE
        f.form_UUID = '${uuid}'
    ORDER BY 
        ur.response_id, ff.field_order;
  `;

  const formFieldRes = await myDb.prepare(stmt).all<FormResult>();    // Process the result here
  return formFieldRes.results;
}