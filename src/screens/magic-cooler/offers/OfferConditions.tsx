import React from "react";

interface Props {
  conditions: string[];
}

const OfferConditions: React.FC<Props> = ({ conditions }) => {
  return (
    <ul className="list-disc list-inside text-gray-700 space-y-1">
      {conditions.map((c, index) => (
        <li key={index}>{c}</li>
      ))}
    </ul>
  );
};

export default OfferConditions;
