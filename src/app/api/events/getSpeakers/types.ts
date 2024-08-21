export interface Speaker {
  event_speaker_id: number;
  event_id: number;
  name: string;
  title?: string;
  bio?: string;
  image_url?: string;
  type?: number;
  enabled: boolean;
}