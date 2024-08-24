'use client';
import React from 'react';
import styles from './entry-form.component.module.scss';
import { SelectCombo } from '@/components/inputs/select-combo/select-combo';
import StatesBrazil from '@/components/common/datasources/states-br';
import { FieldDefinition } from '../field-definition';
interface EntryFormProps {
  entry: any;
  fields: Field[];
  onSubmit: (e: React.FormEvent) => void;
}

interface Field extends FieldDefinition {
  onchange: (value: any, field: string) => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ entry, fields, onSubmit }) => {
  const renderField = (field: Field) => {
    switch (field.type) {
      case 'select':
        return (
          <SelectCombo
            options={StatesBrazil}
            value={entry[field.name]}
            onChange={(value: string) => {
              field.onchange(value, field.name);
            }}
          />
        );
      case 'textarea':
        return (
          <textarea
            className={`w-full p-2 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
            id={field.name}
            name={field.name}
            onChange={(e) => field.onchange(e.target.value, field.name)}
            value={entry[field.name]}
          />
        );
      default:
        return (
          <input
            className={`w-full p-2 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
            type={field.type}
            id={field.name}
            name={field.name}
            onChange={(e) => field.onchange(e.target.value, field.name)}
            value={entry[field.name]}
          />
        );
    }
  };

  return (
    <form className={`${styles['form']}`} onSubmit={onSubmit}>
      {fields.map((field) => (
        <div className={`w-full`} key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          {renderField(field)}
        </div>
      ))}
    </form>
  );
};

export default EntryForm;
