import React from "react";

interface Props {
  offerName: string;
  expiryDate: string;
}

const ExpiredOfferStatus: React.FC<Props> = ({ offerName, expiryDate }) => {
  return (
    <div className="bg-red-50 p-3 rounded shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{offerName}</h3>
        <p className="text-sm text-gray-500">Expiré le {expiryDate}</p>
      </div>
      <span className="text-red-600 font-bold">❌</span>
    </div>
  );
};

export default ExpiredOfferStatus;
