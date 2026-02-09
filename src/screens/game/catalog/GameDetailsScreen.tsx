import React from "react";
import GameRequirements from "./GameRequirements";

interface Game {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  requirements: string[];
}

const sampleGame: Game = {
  id: "1",
  name: "Puzzle Mania",
  thumbnail: "/games/puzzle.jpg",
  description: "Résolvez des puzzles passionnants et progressez à travers les niveaux.",
  requirements: ["Connexion internet", "Version 1.0+", "Espace libre 50MB"],
};

const GameDetailsScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <img src={sampleGame.thumbnail} alt={sampleGame.name} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="font-bold text-2xl mb-2">{sampleGame.name}</h2>
      <p className="text-gray-700 mb-4">{sampleGame.description}</p>

      <GameRequirements requirements={sampleGame.requirements} />

      <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded">
        Jouer maintenant
      </button>
    </div>
  );
};

export default GameDetailsScreen;
