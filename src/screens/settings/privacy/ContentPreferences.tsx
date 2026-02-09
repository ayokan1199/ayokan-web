import React, { useState } from "react";

const ContentPreferences: React.FC = () => {
  const [explicit, setExplicit] = useState(false);
  const [planCul, setPlanCul] = useState(false);

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h2 className="font-semibold">Préférences de contenu</h2>

      <label className="flex items-center justify-between">
        <span>Afficher contenu explicite</span>
        <input
          type="checkbox"
          checked={explicit}
          onChange={() => setExplicit(!explicit)}
        />
      </label>

      <label className="flex items-center justify-between">
        <span>Activer mode Plan Cul</span>
        <input
          type="checkbox"
          checked={planCul}
          onChange={() => setPlanCul(!planCul)}
        />
      </label>
    </div>
  );
};

export default ContentPreferences;
