import React from "react";

const AudienceInsights: React.FC = () => {
  return (
    <div className="bg-white rounded shadow p-4 space-y-2">
      <h2 className="font-semibold">Audience & Insights</h2>
      <p className="text-gray-600 text-sm">
        Principaux intérêts : Mode, Technologie, Sport
      </p>
      <p className="text-gray-600 text-sm">Tranche d'âge principale : 18-34 ans</p>
      <p className="text-gray-600 text-sm">Localisation : France, Belgique, Suisse Autres</p>
    </div>
  );
};

export default AudienceInsights;
