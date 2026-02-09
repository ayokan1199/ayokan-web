import React from "react";

const PlayWithMatchCard: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="font-bold mb-2">Jouer avec un adversaire</h3>
      <button className="px-4 py-2 bg-green-500 text-white rounded">
        Trouver un match
      </button>
    </div>
  );
};

export default PlayWithMatchCard;
