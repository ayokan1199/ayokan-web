import React from "react";

interface ConsentModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  message?: string;
}

const ConsentModal: React.FC<ConsentModalProps> = ({
  open,
  onClose,
  onAccept,
  message = "Acceptez-vous les conditions pour continuer ?",
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 max-w-sm w-full shadow-lg space-y-4">
        <h2 className="text-lg font-semibold">Consentement</h2>
        <p>{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Annuler
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentModal;
