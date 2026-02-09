import React from "react";

interface Props {
  onResume: () => void;
  onQuit: () => void;
}

const GamePauseMenu: React.FC<Props> = ({ onResume, onQuit }) => {
  return (
    <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center gap-4">
      <h2 className="text-white text-2xl font-bold">Pause</h2>
      <button
        onClick={onResume}
        className="px-6 py-2 bg-green-500 text-white rounded"
      >
        Reprendre
      </button>
      <button
        onClick={onQuit}
        className="px-6 py-2 bg-red-500 text-white rounded"
      >
        Quitter
      </button>
    </div>
  );
};

export default GamePauseMenu;
