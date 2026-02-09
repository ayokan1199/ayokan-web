import React from "react";

interface Game {
  id: string;
  name: string;
  category?: string;
  thumbnail: string;
}

interface Props {
  game: Game;
}

const GameCard: React.FC<Props> = ({ game }) => {
  return (
    <div className="bg-white rounded shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
      <img src={game.thumbnail} alt={game.name} className="w-full h-32 object-cover" />
      <div className="p-2">
        <h3 className="font-bold">{game.name}</h3>
        {game.category && <p className="text-sm text-gray-500">{game.category}</p>}
      </div>
    </div>
  );
};

export default GameCard;
