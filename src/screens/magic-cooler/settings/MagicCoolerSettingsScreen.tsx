import React from "react";
import NotificationsSettings from "./NotificationsSettings";
import OfferFrequency from "./OfferFrequency";
import EligibilityRules from "./EligibilityRules";

const MagicCoolerSettingsScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Paramètres Glacière Magique</h1>

      <NotificationsSettings />
      <OfferFrequency />
      <EligibilityRules />
    </div>
  );
};

export default MagicCoolerSettingsScreen;
