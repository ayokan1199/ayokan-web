import React, { useState } from "react";
import CampaignNameInput from "./CampaignNameInput";
import CampaignTypeSelector from "./CampaignTypeSelector";
import CampaignDraftSave from "./CampaignDraftSave";

const CreateCampaignScreen: React.FC = () => {
  const [campaignName, setCampaignName] = useState("");
  const [campaignType, setCampaignType] = useState<"boost" | "discount" | "traffic">("boost");

  const handleSaveDraft = () => {
    alert(`Brouillon sauvegardé : ${campaignName} (${campaignType})`);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Créer une campagne</h1>

      <CampaignNameInput value={campaignName} onChange={setCampaignName} />
      <CampaignTypeSelector value={campaignType} onChange={setCampaignType} />
      <CampaignDraftSave onSave={handleSaveDraft} />
    </div>
  );
};

export default CreateCampaignScreen;
