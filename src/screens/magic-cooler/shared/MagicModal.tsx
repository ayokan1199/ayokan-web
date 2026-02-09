import React from "react";

interface MagicModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MagicModal: React.FC<MagicModalProps> = ({ visible, onClose, children }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow p-4 max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-700 font-bold"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default MagicModal;
