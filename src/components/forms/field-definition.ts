export interface FieldDefinition extends SimpleFieldDefinition {
  label: string;
  type: string;
  className?: string;
  is_url?: boolean;
}

export interface SimpleFieldDefinition {
  name: string;
}
