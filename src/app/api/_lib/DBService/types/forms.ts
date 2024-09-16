export interface Form {
  form_id: number;
  form_UUID: string;
  form_name: string;
  form_owner: string;
  form_description: string;
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
}

export interface FormField {
  form_field_id: number;
  form_id: number;
  field_name: string;
  field_type: string;
  field_order: number;
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
}

export interface FieldInfo {
  field_info_id: number;
  form_field_id: number;
  field_info_item: string;
}