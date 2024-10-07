// Interface for the events table
export interface Event {
  event_id: number;
  event_url: string;
  event_name: string;
  event_description: string;
  event_date: string; // Using string to represent date
  event_time: string; // Using string to represent time
  event_location?: string; // Optional field
  event_owner: string;
  created_at: string; // Using string to represent timestamp
  updated_at: string; // Using string to represent timestamp
}

// Interface for the events_event_speaker table
export interface EventsEventSpeaker {
  event_id: number;
  events_speaker_id: number;
}

// Interface for the events_forms table
export interface EventsForm {
  event_id: number;
  form_id: number;
}

// Interface for the events_speaker table
export interface EventsSpeaker {
  events_speaker_id: number;
  events_speaker_name: string;
  events_speaker_title?: string; // Optional field
  events_speaker_bio?: string; // Optional field
  events_speaker_image_url?: string; // Optional field
  events_speaker_type: number;
  events_speaker_enabled: boolean;
  events_speaker_owner: string;
  created_at: string; // Using string to represent timestamp
  updated_at: string; // Using string to represent timestamp
}

// Interface for the events_agenda table
export interface EventsAgenda {
  event_agenda_id: number;
  events_agenda_event_id: number;
  events_agenda_title: string;
  events_agenda_description?: string; // Optional field
  events_agenda_start_time: string; // Using string to represent time
  events_agenda_end_time: string; // Using string to represent time
  events_agenda_enabled: boolean;
  events_agenda_created_at: string; // Using string to represent timestamp
  events_agenda_updated_at: string; // Using string to represent timestamp
}

// Interface for the events_iframes table
export interface EventsIframe {
  event_iframe_id: number;
  event_id: number;
  title: string;
  url: string;
  enabled: boolean;
  created_at: string; // Using string to represent timestamp
  updated_at: string; // Using string to represent timestamp
}

// Interface for the events_html table
export interface EventsHtml {
  event_html_id: number;
  event_id: number;
  html_content: string;
  enabled: boolean;
  created_at: string; // Using string to represent timestamp
  updated_at: string; // Using string to represent timestamp
}

export interface EventLayout {
  event_layout_id: number;
  event_id: number;
  template: string;
  css: string;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;
}