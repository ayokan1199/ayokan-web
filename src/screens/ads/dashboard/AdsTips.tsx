import React from "react";

const AdsTips: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded p-4">
      <h2 className="font-semibold text-blue-800 mb-2">
        Conseils pour optimiser vos campagnes
      </h2>

      <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
        <li>Testez plusieurs créatifs pour améliorer le CTR</li>
        <li>Surveillez vos dépenses quotidiennes</li>
        <li>Ajustez le ciblage selon les performances</li>
        <li>Pausez les campagnes peu rentables</li>
      </ul>
    </div>
  );
};

export default AdsTips;
