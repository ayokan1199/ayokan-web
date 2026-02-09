import React from "react";

const PayoutRules: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h2 className="font-semibold">Règles de rémunération</h2>

      <ul className="list-disc list-inside text-sm text-gray-600">
        <li>20 % sur chaque abonnement Premium</li>
        <li>10 % sur les achats d’Étincelles</li>
        <li>Paiement minimum : 50 €</li>
        <li>Paiements mensuels</li>
      </ul>
    </div>
  );
};

export default PayoutRules;
