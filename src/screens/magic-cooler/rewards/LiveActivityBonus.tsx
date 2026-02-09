import React from "react";
import BonusConditions from "./BonusConditions";
import BonusUnlockAnimation from "./BonusUnlockAnimation";

interface Props {
  liveName: string;
  conditions: { id: string; description: string; completed: boolean }[];
  onClaim?: () => void;
}

const LiveActivityBonus: React.FC<Props> = ({ liveName, conditions, onClaim }) => {
  const allCompleted = conditions.every((c) => c.completed);

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold">{liveName} - Bonus LIVE</h2>
      <BonusConditions conditions={conditions} />
      {allCompleted && <BonusUnlockAnimation onComplete={onClaim} />}
      {!allCompleted && (
        <p className="text-gray-500">Regardez le LIVE et accomplissez les missions pour débloquer le bonus.</p>
      )}
    </div>
  );
};

export default LiveActivityBonus;
