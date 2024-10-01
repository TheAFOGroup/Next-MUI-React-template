// Interface for the forms table
export interface Form {
  form_id: number;
  form_UUID: string;
  form_name: string;
  form_owner: string;
  form_description: string;
  created_at: string; // Using string to represent timestamp
  updated_at: string; // Using string to represent timestamp
}

// Interface for the form_history table
export interface FormHistory {
  form_history_id: number;
  form_id: number;
  updated_at: string; // Using string to represent timestamp
}

// Interface for the form_history_fields table
export interface FormHistoryFields {
  form_history_id: number;
  form_field_id: number;
  field_order: number;
}

// Interface for the form_fields table
export interface FormField {
  form_field_id: number;
  form_id: number;
  field_name: string;
  field_type: string;
  field_order: number;
  created_at: string; // Using string to represent timestamp
  updated_at: string; // Using string to represent timestamp
}

// Interface for the field_info table
export interface FieldInfo {
  field_info_id: number;
  form_field_id: number;
  field_info_item: string;
}

// Interface for the user_responses table
export interface UserResponse {
  response_id: number;
  form_id: number;
  created_at: string; // Using string to represent timestamp
}

// Interface for the response_entries table
export interface ResponseEntry {
  response_entry_id: number;
  response_id: number;
  form_field_id: number;
  response: string | null; // Using string to represent text, allowing null
}