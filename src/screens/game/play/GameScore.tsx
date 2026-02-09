import React from "react";

interface Props {
  score: number;
}

const GameScore: React.FC<Props> = ({ score }) => {
  return (
    <div className="absolute top-16 left-4 text-white font-bold text-lg">
      Score actuel: {score}
    </div>
  );
};

export default GameScore;
