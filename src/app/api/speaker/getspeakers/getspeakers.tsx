export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
export interface Env {
  DB: D1Database;
}
import { GetSpeakersRespond } from '@/app/api/speaker/getspeakers/types';
export async function GetSpeakers(myDb: D1Database, owner: string) {
  // TODO: Implenmnet rollback in case of fail transaction
  try {
    // Get JSON data from the POST request body
    const stmt = `SELECT events_speaker_id,events_speaker_name,events_speaker_title,
    events_speaker_bio,events_speaker_image_url,events_speaker_type,events_speaker_owner,
    events_speaker_enabled,created_at,updated_at FROM events_speaker WHERE events_speaker_owner = ?;`;

    console.log('Executing SQL statement:', stmt);
    const res = await myDb.prepare(stmt)
      .bind(
        owner
      )
      .all<GetSpeakersRespond>();
    console.log(res)
    return res.results
  } catch (error) {
    console.error('Error processing POST request:', error);
    return error;
  }
}