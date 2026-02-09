import React, { useState } from "react";
import GameCategoryTabs from "./GameCategoryTabs";
import GameCard from "./GameCard";

const games = [
  { id: "1", name: "Puzzle Mania", category: "Puzzle", thumbnail: "/games/puzzle.jpg" },
  { id: "2", name: "Word Battle", category: "Word", thumbnail: "/games/word.jpg" },
  { id: "3", name: "Action Hero", category: "Action", thumbnail: "/games/action.jpg" },
];

const categories = ["Tous", "Puzzle", "Word", "Action"];

const GameCatalogScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredGames = activeCategory === "Tous"
    ? games
    : games.filter((g) => g.category === activeCategory);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <GameCategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <div className="grid grid-cols-2 gap-2 mt-2">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameCatalogScreen;
