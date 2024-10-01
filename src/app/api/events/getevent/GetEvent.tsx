export const runtime = 'edge';
import { D1Database } from '@cloudflare/workers-types'
export interface Env {
  DB: D1Database;
}

import dayjs from 'dayjs';

import { EventsAgenda, EventsEventSpeaker, EventsForm, EventsHtml } from '@/app/api/_lib/DBService/types/events';
import { GetEventEventAgenda, GetEventType } from '@/app/api/events/getevent/types';
import { GetForm } from '@/app/api/forms/getform/getform';
import { Form as FormType } from '@/app/api/forms/getform/types';
import { GetSpeakers } from '@/app/api/speaker/getspeakers/getspeakers';
import { GetSpeakersRespond } from '@/app/api/speaker/getspeakers/types';
export async function GetEvent(myDb: D1Database, uuid: string) {
  // Fetch event details
  const eventStmt = `SELECT * FROM events WHERE event_UUID = ?`;
  const event = await myDb.prepare(eventStmt).bind(uuid).first<GetEventType>();

  if (!event) {
    throw new Error('Event not found');
  }

  const eventId = event.event_id
  // Fetch event agenda
  const agendaStmt = `SELECT events_agenda_title,events_agenda_description,events_agenda_start_time,events_agenda_end_time FROM events_agenda WHERE events_agenda_event_id = ? order by event_agenda_id`;
  const rawAgenda = await myDb.prepare(agendaStmt).bind(eventId).all<EventsAgenda>();

  // transform agenda to match the expected response
  const agenda: GetEventEventAgenda[] = rawAgenda.results.map((agendaItem) => {
    return {
      events_agenda_title: agendaItem.events_agenda_title,
      events_agenda_description: agendaItem.events_agenda_description,
      events_agenda_start_time: dayjs(agendaItem.events_agenda_start_time),
      events_agenda_end_time: dayjs(agendaItem.events_agenda_end_time)
    }
  });

  // Fetch event speakers
  const speakersStmt = `SELECT * FROM events_event_speaker WHERE event_id = ?`;
  const eventSpeakers = await myDb.prepare(speakersStmt).bind(eventId).all<EventsEventSpeaker>();

  let speakers: GetSpeakersRespond[] | undefined;
  if (eventSpeakers.results.length > 0) {
    speakers = await GetSpeakers(myDb, null, eventSpeakers.results.map((speaker) => speaker.events_speaker_id));
  }

  // Fetch event forms
  const formsStmt = `SELECT * FROM events_forms WHERE event_id = ?`;
  const forms = await myDb.prepare(formsStmt).bind(event.event_id).first<EventsForm>();

  let form: FormType | undefined;
  if (forms) {
    form = await GetForm(myDb, undefined, forms.form_id);
  }

  // Fetch event HTML content
  const htmlStmt = `SELECT * FROM events_html WHERE event_id = ?`;
  const htmlContent = await myDb.prepare(htmlStmt).bind(event.event_id).all<EventsHtml>();

  // Transform the HTML content to match the expected response
  const htmlContentString = htmlContent.results.map((htmlItem) => {
    return htmlItem.html_content;
  });
  // Combine all results
  const result: GetEventType = {
    ...event,
    eventAgenda: agenda,
    eventSpeaker: speakers,
    eventForm: form,
    event_HTMLContent: htmlContentString
  };

  // Return the combined result
  return result;
}