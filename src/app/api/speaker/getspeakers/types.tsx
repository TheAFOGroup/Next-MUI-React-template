export interface GetSpeakersRespond {
  events_speaker_id: number;
  events_speaker_name: string;
  events_speaker_title: string;
  events_speaker_bio: string;
  events_speaker_image_url: string;
  events_speaker_type: string;
  events_speaker_enabled: boolean;
  events_speaker_owner: string;
  created_at: Date;
  updated_at: Date;
}