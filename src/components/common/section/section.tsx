import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './section.module.scss';
import { FieldDefinitionBase } from '@/components/forms/field-definition';
import Link from 'next/link';
import PencilSvg from '@/components/svg/pencil.svg';

interface SectionProps {
  title: string;
  fields: FieldDefinitionBase[];
  entry: any;
  data?: string;
}

const SectionComponent: React.FC<SectionProps> = ({ title, fields, entry, data }: SectionProps) => {
  return (
    <>
      <div className="flex flex-row items-start">
        {data && (
          <Link
            href={{
              pathname: '/edit-item',
              query: {
                data: data,
              },
            }}
            key={`edit-item-${uuidv4()}`}
            className="bg-green-500 mr-2 hover:bg-green-700 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center"
          >
            <PencilSvg className="h-2 w-2" />
          </Link>
        )}
        <h2 className={`${styles['form-cell']} text-xl font-bold`}>{title}</h2>
      </div>
      <div className={`${styles['form-row']}`}>
        <div className={`${styles['form-cell']} break-words overflow-hidden text-ellipsis`}>
          {fields.map((field) => (
            <p key={uuidv4()}>{entry[field.name]}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionComponent;
