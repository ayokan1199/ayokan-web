import React from "react";

const tips = [
  "Augmentez le budget sur les jours les plus performants.",
  "Essayez différents formats d'annonce pour tester l'engagement.",
  "Ciblez les audiences similaires à vos meilleurs clients.",
];

const OptimizationTips: React.FC = () => {
  return (
    <div className="bg-white rounded shadow p-4 space-y-2">
      <h2 className="font-semibold">Conseils d’optimisation</h2>
      <ul className="list-disc list-inside text-gray-700">
        {tips.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default OptimizationTips;
