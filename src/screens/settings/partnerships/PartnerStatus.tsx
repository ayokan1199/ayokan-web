import React from "react";

interface PartnerStatusProps {
  status: "En attente" | "Approuvé" | "Refusé";
  date?: string;
}

const PartnerStatus: React.FC<PartnerStatusProps> = ({ status, date }) => {
  let statusColor = "text-gray-500";

  if (status === "Approuvé") statusColor = "text-green-600";
  else if (status === "Refusé") statusColor = "text-red-600";
  else if (status === "En attente") statusColor = "text-yellow-600";

  return (
    <div className="border p-3 rounded-md flex justify-between items-center">
      <span className={`font-medium ${statusColor}`}>Statut : {status}</span>
      {date && <span className="text-sm text-gray-500">{date}</span>}
    </div>
  );
};

export default PartnerStatus;
