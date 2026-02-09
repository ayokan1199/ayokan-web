import { Tournament, User, LeaderboardEntry, Reward } from "./game.types";

// Données fictives initiales
let tournaments: Tournament[] = [
  { id: "t1", name: "Tournoi de Janvier", reward: "500 Sparks", participants: 50 },
  { id: "t2", name: "Championnat Hebdo", reward: "Badge VIP", participants: 30 },
];

let tournamentParticipants: Record<string, User[]> = {
  t1: [],
  t2: [],
};

let tournamentLeaderboard: Record<string, LeaderboardEntry[]> = {
  t1: [],
  t2: [],
};

export const TournamentsService = {
  // Retourne tous les tournois
  getAllTournaments(): Tournament[] {
    return tournaments;
  },

  // Retourne un tournoi par ID
  getTournamentById(id: string): Tournament | undefined {
    return tournaments.find(t => t.id === id);
  },

  // Ajoute un participant à un tournoi
  addParticipant(tournamentId: string, user: User) {
    if (!tournamentParticipants[tournamentId]) tournamentParticipants[tournamentId] = [];
    tournamentParticipants[tournamentId].push(user);

    // Met à jour le nombre de participants
    const tournament = this.getTournamentById(tournamentId);
    if (tournament) tournament.participants = tournamentParticipants[tournamentId].length;
  },

  // Retourne les participants d’un tournoi
  getParticipants(tournamentId: string): User[] {
    return tournamentParticipants[tournamentId] || [];
  },

  // Ajoute un score dans le classement
  addLeaderboardEntry(tournamentId: string, entry: LeaderboardEntry) {
    if (!tournamentLeaderboard[tournamentId]) tournamentLeaderboard[tournamentId] = [];
    tournamentLeaderboard[tournamentId].push(entry);
  },

  // Retourne le classement d’un tournoi
  getLeaderboard(tournamentId: string): LeaderboardEntry[] {
    const leaderboard = tournamentLeaderboard[tournamentId] || [];
    return leaderboard.sort((a, b) => b.score - a.score);
  },

  // Débloque la récompense d’un tournoi pour un utilisateur
  unlockRewardForUser(tournamentId: string, userId: string): Reward | null {
    const tournament = this.getTournamentById(tournamentId);
    if (!tournament) return null;

    // Crée un objet Reward basé sur le tournoi
    const reward: Reward = {
      id: `r-${Date.now()}`,
      title: tournament.reward,
      points: 0,
      isUnlocked: true,
    };

    return reward;
  },

  // Crée un nouveau tournoi
  createTournament(name: string, reward: string): Tournament {
    const newTournament: Tournament = {
      id: `t-${Date.now()}`,
      name,
      reward,
      participants: 0,
    };
    tournaments.push(newTournament);
    tournamentParticipants[newTournament.id] = [];
    tournamentLeaderboard[newTournament.id] = [];
    return newTournament;
  },
};
