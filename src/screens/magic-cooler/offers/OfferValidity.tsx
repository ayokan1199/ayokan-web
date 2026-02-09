import React from "react";

interface Props {
  validity: string;
}

const OfferValidity: React.FC<Props> = ({ validity }) => {
  return (
    <div className="text-sm text-gray-500">
      Offre valide jusqu’au : <span className="font-semibold">{validity}</span>
    </div>
  );
};

export default OfferValidity;
