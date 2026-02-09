import React from "react";

interface Tournament {
  id: string;
  name: string;
  reward: string;
  participants: number;
}

interface Props {
  tournament: Tournament;
}

const TournamentCard: React.FC<Props> = ({ tournament }) => {
  return (
    <div className="bg-white p-3 rounded shadow hover:shadow-lg transition cursor-pointer">
      <h3 className="font-semibold">{tournament.name}</h3>
      <p className="text-gray-500 text-sm">Récompense: {tournament.reward}</p>
      <p className="text-gray-500 text-sm">Participants: {tournament.participants}</p>
      <button className="mt-2 w-full py-1 bg-blue-500 text-white rounded">Participer</button>
    </div>
  );
};

export default TournamentCard;
