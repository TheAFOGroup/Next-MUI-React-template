import { Dayjs } from 'dayjs';

export interface EventAgendaProps {
  events_agenda_title: string; // Assuming a title field for the agenda
  events_agenda_description?: string; // Optional field
  events_agenda_start_time: Dayjs; // Use string for time to match SQL time type
  events_agenda_end_time: Dayjs; // Use string for time to match SQL time type
}
