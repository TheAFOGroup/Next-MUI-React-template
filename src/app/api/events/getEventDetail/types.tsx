export interface Event {
  event_id: number; // Primary key, auto-incremented integer
  event_UUID: string,
  event_name: string; // Event name, required varchar
  event_description: string; // Event description, required text
  event_date: string; // Date of the event, stored as a string in the format 'YYYY-MM-DD'
  event_time: string; // Time of the event, stored as a string in the format 'HH:MM:SS'
  event_location?: string; // Event location, optional varchar
  created_at: string; // Timestamp when the record was created, stored as a string in the format 'YYYY-MM-DD HH:MM:SS'
  updated_at: string; // Timestamp when the record was last updated, stored as a string in the format 'YYYY-MM-DD HH:MM:SS'
};