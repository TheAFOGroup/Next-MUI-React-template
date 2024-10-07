import { Dayjs } from "dayjs";
import { Form as FormType } from '@/app/api/forms/getform/types';
import { GetSpeakersRespond } from '@/app/api/speaker/getspeakers/types';
export interface GetEventType {
  event_id: number;
  event_name: string;
  event_description?: string;
  event_date?: Dayjs; // Use string for date to match SQL date type
  event_time?: Dayjs; // Use string for time to match SQL time type
  event_location?: string; // Optional field
  eventSpeaker?: GetSpeakersRespond[]; // Optional field 
  eventAgenda?: GetEventEventAgenda[]; // Optional field
  event_HTMLContent?: string[]; // Optional field
  event_template?: string; // Optional field
  eventForm?: FormType; // Optional field
  event_owner: string;
  created_at: Dayjs; // Use string for timestamp to match SQL timestamp type
  updated_at: Dayjs; // Use string for timestamp to match SQL timestamp type
  event_css?: string; // Optional field
}

export interface GetEventEventAgenda {
  events_agenda_title: string; // Assuming a title field for the agenda
  events_agenda_description?: string; // Optional field
  events_agenda_start_time: Dayjs; // Use string for time to match SQL time type
  events_agenda_end_time: Dayjs; // Use string for time to match SQL time type
}