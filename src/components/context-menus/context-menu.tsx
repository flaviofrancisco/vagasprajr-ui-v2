import React from 'react';
import useOnClickOutside from './useOnClickOutside';
import styles from './context-menu.module.scss';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ContextMenu: React.FC<ContextMenuProps> = ({ clientX, clientY, visible, close, data, onEdit, onDelete }) => {
  const contextMenuRef = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(contextMenuRef, close || (() => {}));

  return (
    <div
      ref={contextMenuRef}
      onClick={() => {
        if (close) {
          close();
        }
      }}
      className={`${styles['context-menu']} absolute bg-white border border-gray-300 rounded-md shadow-md p-2 ${visible ? 'block' : 'hidden'} cursor-pointer`}
      style={{ top: clientY, left: clientX }}
    >
      <div className="flex flex-col">
        <ContextMenuButton onClick={() => onEdit(data)} icon={<FaEdit />} label="Editar" />
        <ContextMenuButton onClick={() => onDelete(data)} icon={<FaTrash />} label="Excluir" />
      </div>
    </div>
  );
};

const ContextMenuButton: React.FC<{ onClick: () => void; icon: React.ReactNode; label: string }> = ({ onClick, icon, label }) => (
  <button onClick={onClick} className="p-1 w-full flex-column text-left flex items-center hover:bg-gray-200">
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

export default ContextMenu;

export interface ContextMenuProps {
  clientX: number;
  clientY: number;
  visible: boolean;
  close?: () => void;
  data?: any;
  onEdit: (data: any) => void;
  onDelete: (data: any) => void;
}
