import { Dayjs } from "dayjs";

export interface EventTemplateTypes {
  event_name: string;
  event_description?: string;
  event_date?: Dayjs; // Use string for date to match SQL date type
  event_time?: Dayjs; // Use string for time to match SQL time type
  event_location?: string; // Optional field
  EventSpeaker?: EventSpeaker[]; // Optional field 
  EventAgenda?: EventAgenda[]; // Optional field
}

interface EventSpeaker {
  events_speaker_id: number;
  events_speaker_name: string;
  events_speaker_title?: string; // Optional field
  events_speaker_bio?: string; // Optional field
  events_speaker_image_url?: string; // Optional field
  events_speaker_type?: string;
  events_speaker_enabled: boolean;
}

interface EventAgenda {
  events_agenda_title: string; // Assuming a title field for the agenda
  events_agenda_description?: string; // Optional field
  events_agenda_start_time: Dayjs; // Use string for time to match SQL time type
  events_agenda_end_time: Dayjs; // Use string for time to match SQL time type
}