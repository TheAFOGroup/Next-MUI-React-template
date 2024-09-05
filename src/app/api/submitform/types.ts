export interface SubmitForm {
  form_id: number;
  form_fields: SubmmitField[];
};

export interface SubmmitField {
  form_field_id: number;
  response: string;
};