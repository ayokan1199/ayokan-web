import React from "react";

interface Props {
  score: number;
}

const GameResultScreen: React.FC<Props> = ({ score }) => {
  return (
    <div className="absolute inset-0 bg-black/90 flex flex-col justify-center items-center text-white gap-4">
      <h2 className="text-3xl font-bold">Fin de la partie</h2>
      <p className="text-xl">Votre score: {score}</p>
      <button className="px-6 py-2 bg-blue-500 rounded">
        Rejouer
      </button>
    </div>
  );
};

export default GameResultScreen;
