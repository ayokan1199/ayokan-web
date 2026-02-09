import React from "react";
import ReportUser from "./ReportUser";
import BlockUser from "./BlockUser";
import ModerationStatus from "./ModerationStatus";
import EmergencyHelp from "./EmergencyHelp";

const SafetyCenterScreen: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Centre de Sécurité Plan Cul</h1>
      <p className="text-gray-700 text-center">
        Gérez vos paramètres de sécurité, bloquez ou signalez des utilisateurs et accédez aux aides d’urgence.
      </p>

      {/* Sections */}
      <ModerationStatus />
      <ReportUser />
      <BlockUser />
      <EmergencyHelp />
    </div>
  );
};

export default SafetyCenterScreen;
