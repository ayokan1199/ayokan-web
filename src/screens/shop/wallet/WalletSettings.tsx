import React from "react";

const WalletSettings: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-semibold text-lg">Paramètres du portefeuille</h2>
      <p className="text-gray-700">Configurer vos méthodes de paiement, notifications et préférences de retrait.</p>
    </div>
  );
};

export default WalletSettings;
