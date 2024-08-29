import React from 'react';
import styles from './context-menu-filter.module.scss';
import { Column } from '../tables/table';

const ContextMenuFilter: React.FC<ContextMenuProps> = ({ column, clientX, clientY, visible, close, onFilter }) => {
  let windowsInnerWidth = 2000;

  if (typeof window !== 'undefined') {
    windowsInnerWidth = window.innerWidth;
  }

  if (windowsInnerWidth - clientX < 200) {
    clientX = clientX - 200;
  }

  const [value, setValue] = React.useState<string>('');

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (column?.type === 'checkbox' || column?.type === 'boolean') {
      setValue(e.target.checked ? 'true' : 'false');
    } else {
      setValue(e.target.value);
    }
  };

  const renderInput = () => {
    switch (column?.type) {
      case 'number':
        return <input className="border border-gray-300 rounded-md p-2 dark:bg-gray-700" inputMode="numeric" pattern="[0-9]*" type={column?.type} value={+value} onChange={onChangeValue} />;
      case 'checkbox':
        return <input className="border border-gray-300 rounded-md p-2 dark:bg-gray-700" type={column?.type} value={value} onChange={onChangeValue} />;
      case 'date':
        return <input className="border border-gray-300 rounded-md p-2 dark:bg-gray-700" type={column?.type} value={value} onChange={onChangeValue} />;
      default:
        return <input className="border border-gray-300 rounded-md p-2 dark:bg-gray-700" type={column?.type} value={value} onChange={onChangeValue} />;
    }
  };

  return (
    <div
      className={`${styles['context-menu']} ${styles['context-menu-theme']} w-150 absolute bg-white border border-gray-300 rounded-md shadow-md p-2 ${visible ? 'block' : 'hidden'} cursor-pointer`}
      style={{ top: clientY, left: clientX }}
    >
      <div className="flex flex-col">
        <span className="text-sm font-bold">Filtrar</span>
        <span className="text-sm">{column?.title}</span>
        {renderInput()}
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white rounded-md p-1 mt-4 mr-4 w-1/2" onClick={() => onFilter && onFilter(column, value)}>
            Filtrar
          </button>
          <button className="bg-gray-300 rounded-md p-1 mt-4 w-1/2 dark:bg-gray-800" onClick={close}>
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
