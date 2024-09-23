import { Dayjs } from 'dayjs';

export interface EventAgendaProps {
  title: string;
  description: string;
  start_time: Dayjs;
  end_time: Dayjs;
}
