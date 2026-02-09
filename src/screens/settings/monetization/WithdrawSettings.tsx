import React from "react";

const WithdrawSettings: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h2 className="font-semibold">Retrait des gains</h2>

      <p className="text-sm text-gray-500">
        Configure ton moyen de paiement pour retirer tes gains.
      </p>

      <button className="text-blue-600 text-sm">
        Configurer le retrait
      </button>
    </div>
  );
};

export default WithdrawSettings;
