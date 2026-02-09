import React from "react";

interface Props {
  offerName: string;
  dateUsed: string;
}

const UsedOfferStatus: React.FC<Props> = ({ offerName, dateUsed }) => {
  return (
    <div className="bg-blue-50 p-3 rounded shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{offerName}</h3>
        <p className="text-sm text-gray-500">Utilisé le {dateUsed}</p>
      </div>
      <span className="text-blue-600 font-semibold">✔️</span>
    </div>
  );
};

export default UsedOfferStatus;
