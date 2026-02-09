import React from "react";

interface Props {
  name: string;
  reward: string;
  participants: number;
  description: string;
}

const TournamentDetails: React.FC<Props> = ({ name, reward, participants, description }) => {
  return (
    <div className="p-4 bg-white rounded shadow min-h-screen">
      <h2 className="font-bold text-2xl mb-2">{name}</h2>
      <p className="text-gray-700 mb-2">{description}</p>
      <p className="text-gray-500 mb-1">Récompense: {reward}</p>
      <p className="text-gray-500 mb-4">Participants: {participants}</p>
      <button className="w-full py-2 bg-green-500 text-white rounded">S’inscrire</button>
    </div>
  );
};

export default TournamentDetails;
