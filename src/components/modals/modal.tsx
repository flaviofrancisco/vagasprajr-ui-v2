export function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}
