export interface EventTemplate {
  event_name: string;
  event_description?: string;
  event_date: string; // Use string for date to match SQL date type
  event_time: string; // Use string for time to match SQL time type
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
  events_speaker_type: number;
  events_speaker_enabled: boolean;
}

interface EventAgenda {
  agenda_title: string; // Assuming a title field for the agenda
  agenda_description?: string; // Optional field
  agenda_start_time: string; // Use string for time to match SQL time type
  agenda_end_time: string; // Use string for time to match SQL time type
}