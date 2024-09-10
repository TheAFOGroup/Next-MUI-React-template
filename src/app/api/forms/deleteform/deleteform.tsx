export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'

export interface Env {
  DB: D1Database;
}
import { getRequestContext } from '@cloudflare/next-on-pages'

export async function DeleteForm(form_id: number) {
  const { env } = getRequestContext()
  const myDb = env.DB;

  const statements = [
    `DELETE FROM response_entries WHERE form_field_id IN (SELECT form_field_id FROM form_fields WHERE form_id = ?);`,
    `DELETE FROM user_responses WHERE form_id = ?;`,
    `DELETE FROM form_fields WHERE form_id = ?;`,
    `DELETE FROM forms WHERE form_id = ?;`
  ];

  const batchStatements = [
    myDb.prepare(statements[0]).bind(form_id),
    myDb.prepare(statements[1]).bind(form_id),
    myDb.prepare(statements[2]).bind(form_id),
    myDb.prepare(statements[3]).bind(form_id)
  ];

  return await myDb.batch(batchStatements);
}