export interface SubmitForm {
  form_id: number;
  form_fields: SubmmitField[];
};

export interface SubmmitField {
  form_field_id: number;
  response: string;
};

export interface FormField {
  field_name: string;
  field_type: string;
  field_order: number;
  field_info: string[];
  form_id: number;
  form_field_id: number;
}
