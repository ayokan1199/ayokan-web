import React from "react";
import ExplicitContentLevel from "./ExplicitContentLevel";
import DiscoveryPreferences from "./DiscoveryPreferences";
import PrivacyControls from "./PrivacyControls";
import AgeVerification from "./AgeVerification";

const PlanCulSettingsScreen: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Paramètres Plan Cul</h1>
      <p className="text-gray-700 text-center">
        Gérez vos préférences, votre confidentialité et votre niveau de contenu explicite.
      </p>

      <ExplicitContentLevel />
      <DiscoveryPreferences />
      <PrivacyControls />
      <AgeVerification />
    </div>
  );
};

export default PlanCulSettingsScreen;
