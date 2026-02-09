import React from "react";

const AdultContentDisclaimer: React.FC = () => {
  return (
    <div className="bg-yellow-50 border border-yellow-300 rounded p-4">
      <h3 className="font-semibold mb-1">⚠️ Contenu sensible</h3>
      <p className="text-sm text-yellow-900">
        Les publicités contenant du contenu +18 doivent être
        clairement signalées et ciblées uniquement vers les
        utilisateurs éligibles.
      </p>
    </div>
  );
};

export default AdultContentDisclaimer;
