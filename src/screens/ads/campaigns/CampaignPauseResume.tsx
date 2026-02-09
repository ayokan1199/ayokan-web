import React, { useState } from "react";

interface Props {
  campaignId: string;
  initialStatus: "active" | "paused" | "completed";
  onStatusChange?: (status: "active" | "paused" | "completed") => void;
}

const CampaignPauseResume: React.FC<Props> = ({
  campaignId,
  initialStatus,
  onStatusChange,
}) => {
  const [status, setStatus] = useState(initialStatus);

  const toggleStatus = () => {
    if (status === "active") {
      setStatus("paused");
      onStatusChange?.("paused");
      alert("Campagne mise en pause ✅");
    } else if (status === "paused") {
      setStatus("active");
      onStatusChange?.("active");
      alert("Campagne reprise ✅");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow flex flex-col space-y-2 items-start">
      <h2 className="font-bold text-lg">Gérer la campagne</h2>
      <p className="text-gray-600">ID : {campaignId}</p>
      <p className="text-gray-700">Statut actuel : <span className="font-semibold">{status}</span></p>

      <button
        onClick={toggleStatus}
        className={`px-4 py-2 rounded text-white ${
          status === "active" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {status === "active" ? "Mettre en pause" : "Reprendre la campagne"}
      </button>
    </div>
  );
};

export default CampaignPauseResume;
