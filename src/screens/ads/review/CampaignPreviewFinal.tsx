import React from "react";

const CampaignPreviewFinal: React.FC = () => {
  return (
    <div className="border rounded bg-gray-50 p-4 space-y-2">
      <h2 className="font-semibold">Aperçu final</h2>

      <div className="bg-white rounded shadow p-3">
        <p className="font-bold">🔥 Super Promo</p>
        <p className="text-sm text-gray-600">
          Profitez de notre offre exclusive maintenant
        </p>

        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
          En savoir plus
        </button>
      </div>
    </div>
  );
};

export default CampaignPreviewFinal;
