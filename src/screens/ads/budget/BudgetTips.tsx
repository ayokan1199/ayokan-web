import React from "react";

const BudgetTips: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 p-4 rounded">
      <h3 className="font-semibold mb-2">💡 Conseils budget</h3>

      <ul className="text-sm text-blue-900 space-y-1">
        <li>• Commence avec au moins 7 jours</li>
        <li>• Augmente progressivement ton budget</li>
        <li>• Surveille les performances après 48h</li>
        <li>• Les audiences larges coûtent moins cher</li>
      </ul>
    </div>
  );
};

export default BudgetTips;
