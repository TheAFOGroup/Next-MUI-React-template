export interface Form {
  form_id: number;
  form_name: string;
  form_description: string;
  form_fields: FormField[];
}

export interface FormField {
  field_name: string;
  field_type: string;
  field_order: number;
  form_id: number;
  form_field_id: number;
}
