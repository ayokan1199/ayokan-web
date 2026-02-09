import React from "react";
import VisibilityControls from "./VisibilityControls";
import ContentPreferences from "./ContentPreferences";
import BlockedUsers from "./BlockedUsers";

const PrivacySettingsScreen: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Confidentialité</h1>

      <VisibilityControls />
      <ContentPreferences />
      <BlockedUsers />
    </div>
  );
};

export default PrivacySettingsScreen;
