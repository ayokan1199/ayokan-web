import React from "react";
import PolicyChecklist from "./PolicyChecklist";
import AdultContentDisclaimer from "./AdultContentDisclaimer";
import CampaignPreviewFinal from "./CampaignPreviewFinal";
import SubmitCampaign from "./SubmitCampaign";

const ReviewCampaignScreen: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Vérification de la campagne</h1>

      <CampaignPreviewFinal />

      <PolicyChecklist />

      <AdultContentDisclaimer />

      <SubmitCampaign />
    </div>
  );
};

export default ReviewCampaignScreen;
