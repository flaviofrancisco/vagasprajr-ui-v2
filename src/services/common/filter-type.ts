export interface Filter {
  operator: 'and' | 'or';
  fields: Field[];
}

export interface Field {
  type: string;
  name: string;
  value?: string;
  min_value?: string;
  max_value?: string;
}
