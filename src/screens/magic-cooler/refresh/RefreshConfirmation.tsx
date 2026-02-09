import React from "react";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  costSparks?: number;
}

const RefreshConfirmation: React.FC<Props> = ({ onConfirm, onCancel, costSparks }) => {
  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <h3 className="font-bold text-lg">Confirmer le rafraîchissement</h3>
      {costSparks ? (
        <p className="text-red-600">Coût : {costSparks} ✨</p>
      ) : (
        <p className="text-green-600">Gratuit !</p>
      )}
      <div className="flex space-x-2">
        <button
          className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onConfirm}
        >
          Confirmer
        </button>
        <button
          className="flex-1 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={onCancel}
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default RefreshConfirmation;
