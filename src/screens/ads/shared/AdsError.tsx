import React from "react";

interface Props {
  message?: string;
  retry?: () => void;
}

const AdsError: React.FC<Props> = ({ message = "Une erreur est survenue.", retry }) => {
  return (
    <div className="bg-red-100 text-red-700 p-4 rounded shadow flex flex-col items-center">
      <p className="mb-2">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Réessayer
        </button>
      )}
    </div>
  );
};

export default AdsError;
