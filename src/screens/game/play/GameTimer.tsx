import React, { useEffect } from "react";

interface Props {
  timeLeft: number;
  setTimeLeft: (t: number) => void;
  onEnd: () => void;
}

const GameTimer: React.FC<Props> = ({ timeLeft, setTimeLeft, onEnd }) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      onEnd();
      return;
    }

    const interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, setTimeLeft, onEnd]);

  return null; // pas d'affichage ici, affiché dans HUD
};

export default GameTimer;
