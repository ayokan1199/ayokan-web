import React from "react";

interface Props {
  offerName: string;
  onContinue: () => void;
}

const OfferActivationSuccess: React.FC<Props> = ({ offerName, onContinue }) => {
  return (
    <div className="p-6 bg-green-50 rounded shadow text-center space-y-4">
      <h2 className="text-2xl font-bold text-green-700">Offre activée !</h2>
      <p>🎉 Vous avez activé l’offre : <span className="font-semibold">{offerName}</span></p>
      <button
        onClick={onContinue}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Continuer
      </button>
    </div>
  );
};

export default OfferActivationSuccess;
