import { Game } from "./game.types";

const games: Game[] = [
  { id: "g1", name: "Space Battle", category: "Action", isFeatured: true },
  { id: "g2", name: "Puzzle Mania", category: "Puzzle" },
  { id: "g3", name: "Speed Run", category: "Arcade" },
];

export const GamesService = {
  getAllGames(): Game[] {
    return games;
  },
  getFeaturedGames(): Game[] {
    return games.filter(g => g.isFeatured);
  },
  getGamesByCategory(category: string): Game[] {
    return games.filter(g => g.category === category);
  },
  getGameById(id: string): Game | undefined {
    return games.find(g => g.id === id);
  }
};
