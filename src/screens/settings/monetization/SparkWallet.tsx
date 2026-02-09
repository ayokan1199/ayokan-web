import React from "react";

const SparkWallet: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h2 className="font-semibold">Étincelles</h2>

      <div className="flex items-center justify-between">
        <span className="text-gray-500">Solde actuel</span>
        <span className="text-xl font-bold">1 250 ✨</span>
      </div>

      <button className="text-blue-600 text-sm">
        Voir l’historique
      </button>
    </div>
  );
};

export default SparkWallet;
