import { Dayjs } from "dayjs";
import { SubmmitField } from '@/app/api/forms/submitform/types';

export interface EventTemplateTypes {
  event_name: string;
  event_description?: string;
  event_date?: Dayjs; // Use string for date to match SQL date type
  event_time?: Dayjs; // Use string for time to match SQL time type
  event_location?: string; // Optional field
  EventSpeaker?: EventSpeaker[]; // Optional field 
  EventAgenda?: EventAgenda[]; // Optional field
  EventForm?: Form; // Optional field
  event_HTMLContent?: string; // Optional field
  event_form_id?: number; // Optional field
  event_template?: string; // Optional field
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

export interface Form {
  form_id: number;
  form_name: string;
  form_description: string;
  form_fields: FormField[];
  form_on_submit?: (submitFields: SubmmitField[], error?: boolean) => void
}

interface FormField {
  field_name: string;
  field_type: string;
  field_order: number;
  field_info: string[];
  form_id: number;
  form_field_id: number;
}