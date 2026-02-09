import React, { useState } from "react";
import RewardUnlockAnimation from "./RewardUnlockAnimation";

interface Reward {
  id: string;
  name: string;
  unlocked: boolean;
}

interface Props {
  reward: Reward;
}

const RewardCard: React.FC<Props> = ({ reward }) => {
  const [unlocked, setUnlocked] = useState(reward.unlocked);
  const [showAnim, setShowAnim] = useState(false);

  const handleUnlock = () => {
    if (!unlocked) {
      setUnlocked(true);
      setShowAnim(true);
      setTimeout(() => setShowAnim(false), 2000);
    }
  };

  return (
    <div className="relative bg-white p-3 rounded shadow cursor-pointer hover:shadow-lg transition">
      <h3 className={`font-bold ${unlocked ? "text-green-600" : "text-gray-700"}`}>
        {reward.name}
      </h3>
      <p className="text-sm text-gray-500">{unlocked ? "Débloqué" : "Verrouillé"}</p>

      {!unlocked && (
        <button
          onClick={handleUnlock}
          className="mt-2 w-full py-1 bg-blue-500 text-white rounded"
        >
          Débloquer
        </button>
      )}

      {showAnim && <RewardUnlockAnimation />}
    </div>
  );
};

export default RewardCard;
