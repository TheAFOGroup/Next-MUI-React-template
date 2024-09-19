export interface BuildEventSpeaker {
  events_speaker_name: string;
  events_speaker_title?: string;
  events_speaker_bio?: string;
  events_speaker_image_url?: string;
  events_speaker_type?: number;
  events_speaker_owner: string;
}

export interface BuildEventSpeakerRespond {
  events_speaker_id: number;
}