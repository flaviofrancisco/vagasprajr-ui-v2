import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './section.module.scss';
import { SimpleFieldDefinition } from '@/components/forms/field-definition';
import Link from 'next/link';
import PencilSvg from '@/components/svg/pencil.svg';

interface SectionProps {
  title: string;
  fields: SimpleFieldDefinition[];
  entry: any;
  editLink?: string;
}

const SectionComponent: React.FC<SectionProps> = ({ title, fields, entry, editLink }: SectionProps) => {
  return (
    <>
      <h2 className={`${styles['form-cell']} text-xl font-bold`}>{title}</h2>
      <div className={`${styles['form-row']}`}>
        <div className={`${styles['form-cell']} break-words overflow-hidden text-ellipsis`}>
          {fields.map((field) => (
            <p key={uuidv4()}>{entry[field.name]}</p>
          ))}
        </div>
        {editLink && (
          <div className={`${styles['form-cell']}`}>
            <Link href={editLink} key={`edit-intro`} className="float-right">
              <PencilSvg className="h-6 w-6" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default SectionComponent;