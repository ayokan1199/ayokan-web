import { Wallet, Reward } from "./game.types";

let wallet: Wallet = {
  balance: 1200,
  earnedRewards: [],
  spendHistory: [],
};

export const WalletService = {
  getWallet(): Wallet {
    return wallet;
  },
  addBalance(amount: number) {
    wallet.balance += amount;
  },
  spend(amount: number, item: string) {
    if (wallet.balance >= amount) {
      wallet.balance -= amount;
      wallet.spendHistory.push({ id: `s-${Date.now()}`, item, cost: amount });
    } else {
      throw new Error("Balance insuffisante");
    }
  },
  addReward(reward: Reward) {
    wallet.earnedRewards.push(reward);
  }
};
