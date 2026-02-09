import React from "react";

interface Campaign {
  id: string;
  name: string;
  status: string;
  budget: number;
}

interface Props {
  campaign: Campaign;
}

const CampaignDetails: React.FC<Props> = ({ campaign }) => {
  const handleView = () => {
    alert(`Voir les détails de la campagne : ${campaign.name}`);
  };

  return (
    <button
      onClick={handleView}
      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Détails
    </button>
  );
};

export default CampaignDetails;
