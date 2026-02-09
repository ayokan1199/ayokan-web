import React from "react";

const AdsAccountStatus: React.FC = () => {
  const status = "Actif"; // peut venir d'une API

  return (
    <div className="bg-white shadow rounded p-4 flex justify-between items-center">
      <span>Statut du compte :</span>
      <span className={`font-semibold ${status === "Actif" ? "text-green-600" : "text-red-600"}`}>
        {status}
      </span>
    </div>
  );
};

export default AdsAccountStatus;
