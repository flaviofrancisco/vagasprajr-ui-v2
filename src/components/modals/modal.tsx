import styles from './modal.module.scss';

export function Modal({ children, ...props }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`${styles['modal-body']} bg-white rounded-lg shadow-lg`}>
        <div className={`${styles['modal-header']}`}>
          <h2>{props.title}</h2>
        </div>
        {children}
        <div className={`${styles['modal-footer']}`}>
          <button className={`${styles['button-close']} ml-50`} onClick={props.onClose}>
            {props.closeButtonText || 'Close'}
          </button>
          <button className={`${styles['button-save']}`} onClick={props.onSave}>
            {props.saveButtonText || 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export interface ModalProps {
  children: React.ReactNode;
  title: string;
  closeButtonText?: string;
  saveButtonText?: string;
  onClose: () => void;
  onSave: () => void;
}
