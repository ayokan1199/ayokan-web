// Utilisateur
export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  accountType: "Basic" | "Premium" | "VIP" | "Gold";
}

// Jeu
export interface Game {
  id: string;
  name: string;
  category: string;
  description?: string;
  requirements?: string[];
  isFeatured?: boolean;
}

// Tournoi / Challenge
export interface Tournament {
  id: string;
  name: string;
  reward: string;
  participants: number;
}

export interface Challenge {
  id: string;
  title: string;
  progress: number; // 0 - 100
  reward: string;
  isDaily: boolean;
}

// Récompense / Wallet
export interface Reward {
  id: string;
  title: string;
  points: number;
  isUnlocked: boolean;
}

export interface Wallet {
  balance: number;
  earnedRewards: Reward[];
  spendHistory: { id: string; item: string; cost: number }[];
}

// Classement
export interface LeaderboardEntry {
  userId: string;
  userName: string;
  score: number;
  rank?: number;
}

// Match / Invitations
export interface Match {
  id: string;
  players: User[];
  score?: number[];
  status: "pending" | "active" | "finished";
}
