import { Dayjs } from "dayjs";

export interface EventAgendaTableType {
  events_agenda_title: string; // Agenda title, required varchar
  events_agenda_description?: string; // Agenda description, optional text
  events_agenda_start_time: Dayjs; // Start time of the agenda, stored as a string in the format 'HH:MM:SS'
  events_agenda_end_time: Dayjs; // End time of the agenda, stored as a string in the format 'HH:MM:SS'
}