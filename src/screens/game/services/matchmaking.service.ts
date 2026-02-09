import { Match, User } from "./game.types";

let matches: Match[] = [];

export const MatchmakingService = {
  createMatch(players: User[]): Match {
    const match: Match = {
      id: `m-${Date.now()}`,
      players,
      status: "pending",
    };
    matches.push(match);
    return match;
  },
  getActiveMatches(): Match[] {
    return matches.filter(m => m.status === "active");
  },
  updateMatchStatus(matchId: string, status: Match["status"]) {
    const match = matches.find(m => m.id === matchId);
    if (match) match.status = status;
  }
};
