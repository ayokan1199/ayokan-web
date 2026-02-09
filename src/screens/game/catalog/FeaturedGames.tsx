import React from "react";
import GameCard from "./GameCard";

const featuredGames = [
  { id: "1", name: "Puzzle Mania", thumbnail: "/games/puzzle.jpg" },
  { id: "2", name: "Word Battle", thumbnail: "/games/word.jpg" },
];

const FeaturedGames: React.FC = () => {
  return (
    <div className="my-4">
      <h2 className="font-bold text-lg mb-2">Jeux en vedette</h2>
      <div className="grid grid-cols-2 gap-2">
        {featuredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedGames;
