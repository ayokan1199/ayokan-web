import React from "react";
import OfferCTA from "./OfferCTA";

interface Props {
  id: string;
  title: string;
  description: string;
  cost: number;
  validity: string;
  onActivate: () => void;
}

const MagicOfferCard: React.FC<Props> = ({ id, title, description, cost, validity, onActivate }) => {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col space-y-2">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="font-semibold">{cost} Étincelles</span>
        <OfferCTA onActivate={onActivate} />
      </div>
      <p className="text-gray-400 text-xs">Validité : {validity}</p>
    </div>
  );
};

export default MagicOfferCard;
