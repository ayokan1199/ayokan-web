import React from "react";

interface Props {
  offerName: string;
  dateActivated: string;
  sparksUsed: number;
}

const ActivatedOfferItem: React.FC<Props> = ({ offerName, dateActivated, sparksUsed }) => {
  return (
    <div className="bg-white rounded shadow p-3 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{offerName}</h3>
        <p className="text-gray-500 text-sm">Activée le {dateActivated}</p>
      </div>
      <span className="text-yellow-500 font-bold">{sparksUsed} ✨</span>
    </div>
  );
};

export default ActivatedOfferItem;
