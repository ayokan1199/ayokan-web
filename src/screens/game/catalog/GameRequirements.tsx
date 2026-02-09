import React from "react";

interface Props {
  requirements: string[];
}

const GameRequirements: React.FC<Props> = ({ requirements }) => {
  return (
    <div className="bg-white p-3 rounded shadow">
      <h3 className="font-bold mb-2">Conditions du jeu</h3>
      <ul className="list-disc list-inside text-gray-700">
        {requirements.map((req, idx) => (
          <li key={idx}>{req}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameRequirements;
