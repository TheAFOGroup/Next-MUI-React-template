import { Dayjs } from "dayjs";

export interface BuildEventType {
  event_name: string;
  event_description?: string;
  event_date?: Dayjs; // Use string for date to match SQL date type
  event_time?: Dayjs; // Use string for time to match SQL time type
  event_location?: string; // Optional field
  eventSpeaker?: number[]; // Optional field 
  eventAgenda?: EventAgenda[]; // Optional field
  event_HTMLContent?: string[]; // Optional field
  event_template?: string; // Optional field
  event_form_id?: number; // Optional field
  event_owner: string;
  eventURL?: string;
}

export interface BuildEventResponse {
  UUID: string;
}

interface EventAgenda {
  events_agenda_title: string; // Assuming a title field for the agenda
  events_agenda_description?: string; // Optional field
  events_agenda_start_time: Dayjs; // Use string for time to match SQL time type
  events_agenda_end_time: Dayjs; // Use string for time to match SQL time type
}