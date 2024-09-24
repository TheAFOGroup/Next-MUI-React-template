export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
export interface Env {
  DB: D1Database;
}
import { GetSpeakersRespond } from '@/app/api/speaker/getspeakers/types';
export async function GetSpeakers(myDb: D1Database, owner: string | null, speakerIds: string[]) {
  // TODO: Implement rollback in case of fail transaction
  try {
    let stmt = `SELECT events_speaker_id, events_speaker_name, events_speaker_title,
      events_speaker_bio, events_speaker_image_url, events_speaker_type, events_speaker_owner,
      events_speaker_enabled, created_at, updated_at FROM events_speaker WHERE 1=1`;

    const params: (string | number)[] = [];

    // Add owner condition if provided
    if (owner) {
      stmt += " AND events_speaker_owner = ?";
      params.push(owner);
    }

    // Add speaker IDs condition if provided
    if (speakerIds.length > 0) {
      stmt += " AND events_speaker_id IN (" + speakerIds.map(() => '?').join(", ") + ")";
      params.push(...speakerIds);
    }

    console.log('Executing SQL statement:', stmt);
    const res = await myDb.prepare(stmt).bind(...params).all<GetSpeakersRespond[]>();
    return res.results;
  } catch (error) {
    console.error('Error processing request:', error);
    return error;
  }
}