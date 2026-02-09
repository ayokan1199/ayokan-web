import React from "react";

const AdsQuickActions: React.FC = () => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-semibold text-lg mb-3">Actions rapides</h2>

      <div className="flex flex-wrap gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Créer une campagne
        </button>

        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Voir les performances
        </button>

        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Gérer le budget
        </button>
      </div>
    </div>
  );
};

export default AdsQuickActions;
