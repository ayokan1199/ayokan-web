import React from "react";

const RewardUnlockAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-yellow-300/30 rounded animate-pulse z-10">
      <span className="text-white font-bold text-lg">✨ Débloqué ! ✨</span>
    </div>
  );
};

export default RewardUnlockAnimation;
