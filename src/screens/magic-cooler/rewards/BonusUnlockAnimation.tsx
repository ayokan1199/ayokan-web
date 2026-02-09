import React, { useEffect } from "react";

interface Props {
  onComplete?: () => void;
}

const BonusUnlockAnimation: React.FC<Props> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2000); // 2 secondes d'animation
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex justify-center items-center p-6 bg-yellow-50 rounded shadow">
      <p className="text-2xl font-bold text-yellow-600 animate-pulse">
        ✨ Bonus Débloqué ! ✨
      </p>
    </div>
  );
};

export default BonusUnlockAnimation;
