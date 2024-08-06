import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';

interface FieldErrorProps {
  error: ReactNode;
  isVisible?: boolean;
}

const FieldError: React.FC<FieldErrorProps> = ({ error, isVisible }) => {
  return (
    <div className="text-red-500 text-sm">
      <p id="emailnote" className={`mt-2 px-4 py-2 mb-6 border border-red-300 rounded-lg ${isVisible ? 'block' : 'hidden'}`}>
        <FontAwesomeIcon icon={faInfoCircle} className="text-red-600 mr-2" />
        <span className="text-red-500 font-bold">{error}</span>
      </p>
    </div>
  );
};

export default FieldError;
