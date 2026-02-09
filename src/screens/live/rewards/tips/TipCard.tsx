import React from "react";
import TipCTA from "./TipCTA";

interface Tip {
  id: string;
  title: string;
  description: string;
}

interface Props {
  tip: Tip;
}

const TipCard: React.FC<Props> = ({ tip }) => {
  return (
    <div className="border rounded p-3 shadow-sm bg-gray-50">
      <h4 className="font-semibold text-lg mb-1">{tip.title}</h4>
      <p className="text-gray-700 mb-2">{tip.description}</p>
      <TipCTA tipId={tip.id} />
    </div>
  );
};

export default TipCard;
