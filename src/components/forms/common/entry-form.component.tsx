import React from 'react';
import styles from './entry-form.component.module.scss';
interface EntryFormProps {
  entry: any;
  fields: Field[];
  onSubmit: (e: React.FormEvent) => void;
}

interface Field {
  name: string;
  label: string;
  type: string;
  onchange: (value: any, field: string) => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ entry, fields, onSubmit }) => {
  return (
    <form className={`${styles['form']}`} onSubmit={onSubmit}>
      {fields.map((field) => (
        <div className={`w-full`} key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            className={`w-full p-2 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
            type={field.type}
            id={field.name}
            name={field.name}
            onChange={(e) => field.onchange(e.target.value, field.name)}
            value={entry[field.name]}
          />
        </div>
      ))}
    </form>
  );
};

export default EntryForm;
