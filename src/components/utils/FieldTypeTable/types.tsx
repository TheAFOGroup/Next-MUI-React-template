export interface DynamicField {
  field_order: number;
  field_name: string;
  field_type: string;
}

export interface DropDownType {
  dropdown_type: string,
  child_table: ChildTable
}

export interface ChildTable {
  enabled: boolean
  hints: string
}