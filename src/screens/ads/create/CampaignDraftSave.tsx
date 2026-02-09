import React from "react";

interface Props {
  onSave: () => void;
}

const CampaignDraftSave: React.FC<Props> = ({ onSave }) => {
  return (
    <div className="mt-4">
      <button
        onClick={onSave}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Sauvegarder le brouillon
      </button>
    </div>
  );
};

export default CampaignDraftSave;
