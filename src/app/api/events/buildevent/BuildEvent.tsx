export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
export interface Env {
  DB: D1Database;
}
import { v4 as uuidv4 } from 'uuid';

import { BuildEventResponse, BuildEventType } from '@/app/api/events/buildevent/types';
interface eventId {
  event_id: number
}

export async function BuildEvent(myDb: D1Database, data: BuildEventType) {
  // TODO: Implenmnet rollback in case of fail transaction
  try {
    // 
    const url = data.eventURL ? data.eventURL : uuidv4();

    // Get JSON data from the POST request body
    const stmt = `INSERT INTO events (event_UUID, event_name, event_description, event_date, event_time, event_location,event_owner)
          VALUES 
          (?, ?, ?, ?, ?, ?, ?)
          returning event_id;`;

    console.log('Executing SQL statement:', stmt);
    const eventIdRes = await myDb.prepare(stmt)
      .bind(url, data.event_name, data.event_description, data.event_date ? data.event_date.toString() : "", data.event_time ? data.event_time.toString() : "", data.event_location, data.event_owner)
      .first<eventId>();

    const eventId = eventIdRes?.event_id;

    const batchStatment: D1PreparedStatement[] = [];

    // Insert event agenda
    if (data.eventAgenda && data.eventAgenda.length > 0) {
      const prepareString = `INSERT INTO events_agenda (events_agenda_event_id, events_agenda_title, events_agenda_description, events_agenda_start_time, events_agenda_end_time) VALUES ${data.eventAgenda.map(() => '(?, ?, ?, ?, ?)').join(', ')}`;
      const bindParams = data.eventAgenda.flatMap(agenda => [eventId, agenda.events_agenda_title, agenda.events_agenda_description, agenda.events_agenda_start_time?.toString(), agenda.events_agenda_end_time?.toString()]);
      batchStatment.push(myDb.prepare(prepareString).bind(...bindParams));
    }

    // Insert event speaker
    if (data.eventSpeaker && data.eventSpeaker.length > 0) {
      const prepareString = `INSERT INTO events_event_speaker (event_id, events_speaker_id) VALUES ${data.eventSpeaker?.map(() => '(?, ?)').join(', ')}`;
      const bindParams = data.eventSpeaker?.flatMap(speakerId => [eventId, speakerId]) ?? [];
      batchStatment.push(myDb.prepare(prepareString).bind(...bindParams));
    }

    // Insert event form
    if (data.event_form_id) {
      const prepareString = myDb.prepare('INSERT INTO events_forms (event_id, form_id) VALUES (?, ?)')
        .bind(eventId, data.event_form_id)
      batchStatment.push(prepareString);
    }

    // Insert eventHTMLContent
    if (data.event_HTMLContent && data.event_HTMLContent.length > 0) {
      const prepareString = `INSERT INTO events_html (event_id, html_content) VALUES (?, ?)`;
      const bindParams = data.event_HTMLContent.flatMap(speakerId => [eventId, speakerId]);
      batchStatment.push(myDb.prepare(prepareString).bind(...bindParams));
    }

    // Execute all batch statements
    await myDb.batch(batchStatment);
    const respond: BuildEventResponse = { UUID: url }
    // Send a response back to the client
    return ({ message: 'Data received successfully', respond });
  } catch (error) {
    console.error('Error processing POST request:', error);
    throw error
  }
}