import React from 'react';
import styles from './context-menu-filter.module.scss';
import { Column } from '../tables/table';

const ContextMenuFilter: React.FC<ContextMenuProps> = ({ column, clientX, clientY, visible, close, onFilter }) => {
  const [value, setValue] = React.useState<string>('');

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div
      className={`${styles['context-menu']} w-150 absolute bg-white border border-gray-300 rounded-md shadow-md p-2 ${visible ? 'block' : 'hidden'} cursor-pointer`}
      style={{ top: clientY, left: clientX }}
    >
      <div className="flex flex-col">
        <span className="text-sm font-bold">Filtrar</span>
        <span className="text-sm">{column?.title}</span>
        <input className="border border-gray-300 rounded-md p-2" type="text" value={value} onChange={onChangeValue} />
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white rounded-md p-1 mt-4 mr-4 w-1/2" onClick={() => onFilter && onFilter(column, value)}>
            Filtrar
          </button>
          <button className="bg-gray-300 rounded-md p-1 mt-4 w-1/2" onClick={close}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export interface ContextMenuProps {
  clientX: number;
  clientY: number;
  visible: boolean;
  close?: () => void;
  onFilter?: (column: Column | null, value: any) => void;
  column: Column | null;
}

export default ContextMenuFilter;
