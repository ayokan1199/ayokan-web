import React from "react";

interface Props {
  score: number;
  timeLeft: number;
  onPause: () => void;
}

const GameHUD: React.FC<Props> = ({ score, timeLeft, onPause }) => {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-black/50">
      <div>Score: {score}</div>
      <div>Temps: {timeLeft}s</div>
      <button onClick={onPause} className="px-2 py-1 bg-yellow-500 rounded">
        Pause
      </button>
    </div>
  );
};

export default GameHUD;
