export interface FieldDefinition extends FieldDefinitionBase {
  label?: string;
  type?: string;
}

export interface FieldDefinitionBase {
  name: string;
  className?: string;
}
