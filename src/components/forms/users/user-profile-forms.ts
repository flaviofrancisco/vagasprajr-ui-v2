import { FieldDefinition, SimpleFieldDefinition } from '../field-definition';

export const USER_PERSONAL_INFO_KEY = 'user_personal_info';
export const USER_ABOUT_ME_KEY = 'user_about_me';

export interface FormDefinition {
  key: string;
  title: string;
  simple_definition: SimpleFieldDefinition[];
  form_definition: FieldDefinition[];
}

export const user_forms = {
  [USER_PERSONAL_INFO_KEY]: {
    key: USER_PERSONAL_INFO_KEY,
    title: 'Dados pessoais',
    simple_definition: [{ name: 'first_name' }, { name: 'last_name' }, { name: 'email' }, { name: 'city' }, { name: 'state' }],
    form_definition: [
      { name: 'first_name', label: 'Nome', type: 'text', required: true },
      { name: 'last_name', label: 'Sobrenome', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'city', label: 'Cidade', type: 'text', required: true },
      { name: 'state', label: 'Estado', type: 'text', required: true },
    ],
  },
  [USER_ABOUT_ME_KEY]: {
    key: USER_ABOUT_ME_KEY,
    title: 'Sobre mim',
    simple_definition: [{ name: 'about_me' }],
    form_definition: [{ name: 'about_me', label: 'Sobre mim', type: 'textarea', required: false }],
  },
};
