import { format } from 'path';
import { FieldDefinition, FieldDefinitionBase } from '../field-definition';

export const USER_PERSONAL_INFO_KEY = 'user_personal_info';
export const USER_ABOUT_ME_KEY = 'user_about_me';
export const USER_CERTIFICATIONS_KEY = 'certifications';
export const USER_EDUCATIONS_KEY = 'educations';
export const USER_IDIOM_INFO = 'idioms_info';
export const USER_EXPERIENCES_KEY = 'experiences';
export const USER_TECH_EXPERIENCES_KEY = 'tech_experiences';

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
      { name: 'state', label: 'Estado', type: 'select-br-states', required: true },
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
    form_definition: [
      { name: 'start_date', label: 'Mês/ Ano emissão', type: 'text', required: true, format: 'MM/YYYY' },
      { name: 'end_date', label: 'Expira em (mês/ano)', type: 'text', required: true, format: 'MM/YYYY' },
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'issuing_company', label: 'Empresa emissora', type: 'text', required: true },
      { name: 'credential_id', label: 'ID da credencial', type: 'text', required: true },
      { name: 'credential_url', label: 'URL da credencial', type: 'url', required: true },
    ],
    hasDates: true,
  },
  [USER_EDUCATIONS_KEY]: {
    key: USER_EDUCATIONS_KEY,
    title: 'Formação',
    simple_definition: [{ name: 'institution', className: 'font-bold' }, { name: 'degree', className: 'font-semibold mb-4' }, { name: 'course' }, { name: 'field_of_study' }, { name: 'grade' }],
    form_definition: [
      { name: 'start_date', label: 'Data de início (Mês/ano)', type: 'text', required: true, format: 'MM/YYYY' },
      { name: 'end_date', label: 'Data de término (Mês/ano)', type: 'text', required: true, format: 'MM/YYYY' },
      { name: 'institution', label: 'Instituição', type: 'text', required: true },
      { name: 'degree', label: 'Grau', type: 'text', required: true },
      { name: 'course', label: 'Curso', type: 'text', required: true },
      { name: 'field_of_study', label: 'Área de estudo', type: 'text', required: true },
      { name: 'grade', label: 'Nota', type: 'number', required: true },
    ],
    hasDates: true,
  },
  [USER_IDIOM_INFO]: {
    key: USER_IDIOM_INFO,
    title: 'Idiomas',
    simple_definition: [
      { name: 'name', className: 'font-bold' },
      { name: 'level', className: 'font-semibold mb-4' },
    ],
    form_definition: [
      {
        name: 'name',
        label: 'Idioma',
        type: 'text',
        required: true,
      },
      {
        name: 'level',
        label: 'Nível',
        type: 'select',
        required: true,
        options: [
          { value: 'Básico', label: 'Básico' },
          { value: 'Intermediário', label: 'Intermediário' },
          { value: 'Avançado', label: 'Avançado' },
          { value: 'Fluente', label: 'Fluente' },
        ],
      },
    ],
  },
  [USER_EXPERIENCES_KEY]: {
    key: USER_EXPERIENCES_KEY,
    title: 'Experiências',
    simple_definition: [{ name: 'company', className: 'font-bold' }, { name: 'position', className: 'font-semibold mb-4' }, { name: 'description' }],
    form_definition: [
      { name: 'start_date', label: 'Data de início (Mês/ Ano)', type: 'text', required: true, format: 'MM/YYYY' },
      { name: 'end_date', label: 'Data de término (Mês/ Ano)', type: 'text', required: true, format: 'MM/YYYY' },
      { name: 'company', label: 'Empresa', type: 'text', required: true },
      { name: 'position', label: 'Cargo', type: 'text', required: true },
      { name: 'description', label: 'Descrição', type: 'textarea', required: true },
    ],
    hasDates: true,
  },
  [USER_TECH_EXPERIENCES_KEY]: {
    key: USER_TECH_EXPERIENCES_KEY,
    title: 'Experiências em tecnologia',
    simple_definition: [
      { name: 'technology', className: 'font-bold' },
      { name: 'experience_time', className: 'font-semibold mb-4' },
      { name: 'experience_number', className: 'font-semibold mb-4' },
    ],
    form_definition: [
      {
        name: 'technology',
        label: 'Tecnologia',
        type: 'text',
        required: true,
      },
      {
        name: 'experience_time',
        label: 'Tempo de experiência',
        type: 'select',
        required: true,
        options: [
          { value: 'years', label: 'Ano(s)' },
          { value: 'months', label: 'Mês(es)' },
          { value: 'days', label: 'Dia(s)' },
          { value: 'hours', label: 'Hora(s)' },
          { value: 'weeks', label: 'Semana(s)' },
        ],
      },
      {
        name: 'experience_number',
        label: 'Número do tempo de experiência',
        type: 'number',
        required: true,
      },
    ],
  },
};
