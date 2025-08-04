import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

type AlertProps = {
  type: 'error' | 'success';
  message: string;
  onClose?: () => void;
};

export const Alert = ({ type, message, onClose }: AlertProps) => {
  const bgColor = type === 'error' ? 'bg-red-50' : 'bg-green-50';
  const textColor = type === 'error' ? 'text-red-800' : 'text-green-800';
  const icon = type === 'error' ? (
    <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
  ) : (
    <CheckCircleIcon className="h-5 w-5 text-green-400" />
  );

  return (
    <div className={`rounded-md ${bgColor} p-4 mb-4`}>
      <div className="flex">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className={`rounded-md ${bgColor} inline-flex ${textColor} focus:outline-none`}
            >
              <span className="sr-only">Cerrar</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};