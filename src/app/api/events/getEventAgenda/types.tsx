export interface EventAgenda {
  event_agenda_id: number; // Primary key, auto-incremented integer
  event_id: number; // Foreign key referencing the events table, required integer
  title: string; // Agenda title, required varchar
  description?: string; // Agenda description, optional text
  start_time: string; // Start time of the agenda, stored as a string in the format 'HH:MM:SS'
  end_time: string; // End time of the agenda, stored as a string in the format 'HH:MM:SS'
  enabled: boolean; // Indicates if the agenda item is enabled, required boolean
  created_at: string; // Timestamp when the record was created, stored as a string in the format 'YYYY-MM-DD HH:MM:SS'
  updated_at: string; // Timestamp when the record was last updated, stored as a string in the format 'YYYY-MM-DD HH:MM:SS'
};