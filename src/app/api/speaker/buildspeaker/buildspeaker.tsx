export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
export interface Env {
  DB: D1Database;
}
import { BuildEventSpeaker, BuildEventSpeakerRespond } from '@/app/api/speaker/buildspeaker/types';

export async function BuildSpeaker(myDb: D1Database, data: BuildEventSpeaker) {
  // TODO: Implenmnet rollback in case of fail transaction
  try {
    // Get JSON data from the POST request body
    const stmt = `INSERT INTO events_speaker (events_speaker_name, events_speaker_title, events_speaker_bio, events_speaker_image_url, events_speaker_type, events_speaker_owner)
            VALUES 
            (?,?,?,?,?,?);`;

    console.log('Executing SQL statement:', stmt);
    const eventsSpeakerIdRes = await myDb.prepare(stmt)
      .bind(
        data.events_speaker_name,
        data.events_speaker_title,
        data.events_speaker_bio,
        data.events_speaker_image_url,
        data.events_speaker_type,
        data.events_speaker_owner
      )
      .run();
    return ({ message: 'Data received successfully', eventsSpeakerIdRes });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return error;
  }
}