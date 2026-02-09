import React from "react";
import NotificationsSettings from "./NotificationsSettings";
import PrivacySettings from "./PrivacySettings";
import EligibilitySettings from "./EligibilitySettings";
import ParentalControls from "./ParentalControls";

const SettingsScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-4">
      <h2 className="text-xl font-bold mb-2">Paramètres du jeu</h2>
      <NotificationsSettings />
      <PrivacySettings />
      <EligibilitySettings />
      <ParentalControls />
    </div>
  );
};

export default SettingsScreen;
