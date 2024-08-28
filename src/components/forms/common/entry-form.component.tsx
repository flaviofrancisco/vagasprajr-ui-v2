'use client';
import React, { FormEvent } from 'react';
import styles from './entry-form.component.module.scss';
import { SelectCombo } from '@/components/inputs/select-combo/select-combo';
import StatesBrazil from '@/components/common/datasources/states-br';
import { FieldDefinition } from '../field-definition';

interface EntryFormProps {
  entry: any;
  fields: Field[];
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
}

export interface Field extends FieldDefinition {
  options?: { value: string; label: string }[];
  onchange: (value: any, field: string) => void;
  disabled?: boolean;
}

const EntryForm: React.FC<EntryFormProps> = ({ entry, fields, onSubmit, onDelete }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ ...e });
  };
  const renderField = (field: Field) => {
    switch (field.type) {
      case 'select-br-states':
        return (
          <SelectCombo
            disabled={field.disabled}
            options={StatesBrazil}
            value={entry[field.name]}
            onChange={(value: string) => {
              field.onchange(value, field.name);
            }}
          />
        );
      case 'select':
        return (
          <label htmlFor={field.name}>
            {field.label}
            <select
              disabled={field.disabled}
              className={`w-full p-2 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
              id={field.name}
              name={field.name}
              onChange={(e) => field.onchange(e.target.value, field.name)}
              value={entry[field.name]}
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        );
      case 'textarea':
        return (
          <label htmlFor={field.name}>
            {field.label}
            <textarea
              disabled={field.disabled}
              className={`w-full p-2 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
              id={field.name}
              name={field.name}
              onChange={(e) => field.onchange(e.target.value, field.name)}
              value={entry[field.name]}
            />
          </label>
        );
      case 'checkbox':
        return (
          <label className={`${styles['custom-checkbox']}`}>
            <input
              disabled={field.disabled}
              className="hidden-checkbox"
              type={field.type}
              id={field.name}
              name={field.name}
              onChange={(e) => field.onchange(e.target.checked, field.name)}
              checked={entry[field.name]}
            />
            <span className={`${'custom-checkbox-box'}`}>{field.label} </span>
          </label>
        );
      default:
        return (
          <label htmlFor={field.name}>
            {field.label}
            <input
              disabled={field.disabled}
              className={`w-full p-2 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
              type={field.type}
              id={field.name}
              name={field.name}
              onChange={(e) => field.onchange(e.target.value, field.name)}
              value={entry[field.name]}
            />
          </label>
        );
    }
  };

  return (
    <form className={`${styles['form']}`} onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div className={`w-full`} key={field.name}>
          {renderField(field)}
        </div>
      ))}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-4">
        {onDelete && (
          <button
            className=" lg:w-1/4 lg:ml-0 lg:mr-auto p-2 border bg-red-800 text-white border-gray-200 rounded-lg shadow hover:bg-red-600 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            onClick={onDelete}
          >
            Deletar
          </button>
        )}

        <button
          className="lg:w-1/4 lg:ml-auto lg:mr-0 p-2 border bg-blue-800 text-white border-gray-200 rounded-lg shadow hover:bg-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          type="submit"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default EntryForm;
