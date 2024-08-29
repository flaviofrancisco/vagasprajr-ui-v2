import React from 'react';
import Dialog from './dialog';

interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
  onConfirm: Function;
}
export default function Confirm(props: Props) {
  const { open, onClose, title, children, onConfirm } = props;
  if (!open) {
    return <></>;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-xl">{title}</h2>
      <div className="py-5">{children}</div>
      <div className="flex justify-end">
        <div className="p-1">
          <button onClick={() => onClose()} className="bg-secondary hover:bg-secondary-light">
            Não
          </button>
        </div>
        <div className="p-1">
          <button
            onClick={() => {
              onClose();
              onConfirm();
            }}
          >
            Sim
          </button>
        </div>
      </div>
    </Dialog>
  );
}
