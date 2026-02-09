import React from "react";
import AffiliateStats from "./AffiliateStats";
import AffiliateLinks from "./AffiliateLinks";
import PayoutRules from "./PayoutRules";
import AffiliateHistory from "./AffiliateHistory";

const AffiliationScreen: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Programme d’affiliation</h1>

      <p className="text-sm text-gray-600">
        Gagne un pourcentage sur chaque inscription ou achat généré via tes liens.
      </p>

      <AffiliateStats />
      <AffiliateLinks />
      <PayoutRules />
      <AffiliateHistory />
    </div>
  );
};

export default AffiliationScreen;
