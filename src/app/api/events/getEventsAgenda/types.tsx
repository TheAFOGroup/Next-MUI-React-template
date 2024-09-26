export interface EventAgenda {
  event_agenda_id: number; // Primary key, auto-incremented integer
  events_agenda_event_id: number; // Foreign key referencing the events table, required integer
  events_agenda_title: string; // Agenda title, required varchar
  events_agenda_description?: string; // Agenda description, optional text
  events_agenda_start_time: string; // Start time of the agenda, stored as a string in the format 'HH:MM:SS'
  events_agenda_end_time: string; // End time of the agenda, stored as a string in the format 'HH:MM:SS'
  events_agenda_enabled: boolean; // Indicates if the agenda item is enabled, required boolean
  events_agenda_created_at: string; // Timestamp when the record was created, stored as a string in the format 'YYYY-MM-DD HH:MM:SS'
  events_agenda_updated_at: string; // Timestamp when the record was last updated, stored as a string in the format 'YYYY-MM-DD HH:MM:SS'
};