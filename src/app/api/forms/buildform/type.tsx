export interface BuildFormType {
  form_name: string;
  form_owner: string;
  form_description: string;
  form_fields: FormField[];
}

interface FormField {
  field_name: string;
  field_type: string;
  field_info: string[];
  field_order: number;
}

interface FieldInfo {
  field_info_item: string[]
}

export interface BuildFormResponse {
  UUID: string;
}