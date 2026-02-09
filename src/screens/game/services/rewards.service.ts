import { Reward } from "./game.types";

let rewards: Reward[] = [
  { id: "r1", title: "Badge VIP", points: 100, isUnlocked: false },
  { id: "r2", title: "Avatar exclusif", points: 200, isUnlocked: false },
  { id: "r3", title: "100 Sparks", points: 50, isUnlocked: true },
];

export const RewardsService = {
  getAllRewards(): Reward[] {
    return rewards;
  },
  unlockReward(id: string) {
    const reward = rewards.find(r => r.id === id);
    if (reward) reward.isUnlocked = true;
  }
};
