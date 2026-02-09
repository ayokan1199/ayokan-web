import React, { useState } from "react";
import GameHUD from "./GameHUD";
import GameTimer from "./GameTimer";
import GameScore from "./GameScore";
import GamePauseMenu from "./GamePauseMenu";
import GameResultScreen from "./GameResultScreen";

const GamePlayScreen: React.FC = () => {
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // exemple 60s

  const handleGameOver = () => setGameOver(true);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <GameHUD score={score} timeLeft={timeLeft} onPause={() => setPaused(true)} />

      <div className="flex justify-center items-center h-full">
        {!gameOver && !paused ? (
          <p className="text-white text-lg">Le jeu est en cours...</p>
        ) : null}
      </div>

      <GameTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onEnd={handleGameOver} />

      <GameScore score={score} />

      {paused && <GamePauseMenu onResume={() => setPaused(false)} onQuit={handleGameOver} />}

      {gameOver && <GameResultScreen score={score} />}
    </div>
  );
};

export default GamePlayScreen;
