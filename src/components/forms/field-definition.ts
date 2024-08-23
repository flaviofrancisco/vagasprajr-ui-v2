export interface FieldDefinition extends SimpleFieldDefinition {
  label: string;
  type: string;
}

export interface SimpleFieldDefinition {
  name: string;
}

export interface FieldDefinitionCss extends SimpleFieldDefinition {
  className?: string;
  is_url?: boolean;
}
