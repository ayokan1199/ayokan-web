import { LeaderboardEntry } from "./game.types";

let globalLeaderboard: LeaderboardEntry[] = [
  { userId: "u1", userName: "Alice", score: 1200 },
  { userId: "u2", userName: "Bob", score: 1150 },
  { userId: "u3", userName: "Charlie", score: 1100 },
];

export const LeaderboardService = {
  getGlobalLeaderboard(): LeaderboardEntry[] {
    return globalLeaderboard.sort((a, b) => b.score - a.score);
  },
  addScore(entry: LeaderboardEntry) {
    globalLeaderboard.push(entry);
  }
};
