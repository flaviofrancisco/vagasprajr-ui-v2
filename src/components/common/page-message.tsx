export interface PageMessageProps {
  message: string;
  messageType?: string;
  action: () => void;
  actionLabel?: string;
}

export const MessageType = {
  Error: 'error',
  Warning: 'warning',
  Success: 'success',
  Info: 'info',
};

const PageMessage: React.FC<PageMessageProps> = ({ message, messageType, action, actionLabel }) => {
  return (
    <div className="flex flex-col justify-start bg-white shadow-lg rounded-lg p-8 w-4/5 mx-auto">
      <h1 className="text-4xl font-bold text-black">
        {messageType === MessageType.Error
          ? 'Ops!'
          : messageType === MessageType.Warning
          ? 'Atenção!'
          : messageType === MessageType.Success
          ? 'Sucesso'
          : messageType === MessageType.Info
          ? 'Informação'
          : 'Informação'}
      </h1>
      <div className="flex flex-col justify-center items-center p-4">
        <p
          className={`text-xl text-center ${
            messageType === MessageType.Error
              ? 'text-red-600'
              : messageType === MessageType.Warning
              ? 'text-yellow-600'
              : messageType === MessageType.Success
              ? 'text-green-600'
              : messageType === MessageType.Info
              ? 'text-blue-600'
              : 'text-black'
          }`}
        >
          {message}
        </p>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" onClick={action}>
        {actionLabel}
      </button>
    </div>
  );
};

export default PageMessage;
