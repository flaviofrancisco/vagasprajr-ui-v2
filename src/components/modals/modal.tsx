import styles from './modal.module.scss';

export function Modal({ children, ...props }: ModalProps) {
  return (
    <div className={`${props.className} fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-gray-950`}>
      <div className={`${styles['modal-body']} bg-white rounded-lg shadow-lg`}>
        <div className={`${styles['modal-header']}`}>
          <h2>{props.title}</h2>
          <button className="top-2 right-2 text-gray-500 text-2xl hover:text-gray-700" onClick={props.onClose}>
            &times;
          </button>
        </div>
        {children}
        <div className={`${styles['modal-footer']}`}>
          <button className={`${styles['button-close']} ml-50`} onClick={props.onClose}>
            {props.closeButtonText || 'Close'}
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
  className?: string;
}
