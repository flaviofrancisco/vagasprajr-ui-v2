import { FieldDefinition, FieldDefinitionBase } from '../field-definition';

export const USER_PERSONAL_INFO_KEY = 'user_personal_info';
export const USER_ABOUT_ME_KEY = 'user_about_me';
export const USER_CERTIFICATIONS_KEY = 'user_certifications';
export const USER_EDUCATIONS_KEY = 'user_education';
export const USER_IDIOM_INFO = 'idioms_info';
export const USER_EXPERIENCES_KEY = 'experiences';

export interface FormDefinition {
  key: string;
  title: string;
  simple_definition: FieldDefinitionBase[];
  form_definition: FieldDefinition[];
  hasDates?: boolean;
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
  [USER_CERTIFICATIONS_KEY]: {
    key: USER_CERTIFICATIONS_KEY,
    title: 'Certificações',
    simple_definition: [{ name: 'name', className: 'font-bold' }, { name: 'issuing_company', className: 'font-semibold mb-4' }, { name: 'credential_id' }, { name: 'credential_url', type: 'url' }],
    form_definition: [],
    hasDates: true,
  },
  [USER_EDUCATIONS_KEY]: {
    key: USER_EDUCATIONS_KEY,
    title: 'Formação',
    simple_definition: [{ name: 'institution', className: 'font-bold' }, { name: 'degree', className: 'font-semibold mb-4' }, { name: 'course' }, { name: 'field_of_study' }, { name: 'grade' }],
    form_definition: [],
    hasDates: true,
  },
  [USER_IDIOM_INFO]: {
    key: USER_IDIOM_INFO,
    title: 'Idiomas',
    simple_definition: [
      { name: 'name', className: 'font-bold' },
      { name: 'level', className: 'font-semibold mb-4' },
    ],
    form_definition: [],
  },
  [USER_EXPERIENCES_KEY]: {
    key: USER_EXPERIENCES_KEY,
    title: 'Experiências',
    simple_definition: [{ name: 'company', className: 'font-bold' }, { name: 'position', className: 'font-semibold mb-4' }, { name: 'description' }],
    form_definition: [],
    hasDates: true,
  },
};
