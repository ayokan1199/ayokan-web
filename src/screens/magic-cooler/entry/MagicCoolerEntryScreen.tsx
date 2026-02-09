import React, { useState } from "react";
import IceDiamondAnimation from "./IceDiamondAnimation";
import WelcomeMessage from "./WelcomeMessage";
import EntrySoundController from "./EntrySoundController";

const MagicCoolerEntryScreen: React.FC = () => {
  const [skipped, setSkipped] = useState(false);
  const userName = "Alex"; // à remplacer par le nom réel depuis le backend

  const handleSkip = () => setSkipped(true);

  if (skipped) return null;

  return (
    <div className="fixed inset-0 bg-blue-50 flex flex-col justify-center items-center z-50">
      <IceDiamondAnimation loop={false} />
      <WelcomeMessage userName={userName} />
      <EntrySoundController soundUrl="/sounds/magic-entry.mp3" />

      <button
        onClick={handleSkip}
        className="mt-8 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
      >
        Passer
      </button>
    </div>
  );
};

export default MagicCoolerEntryScreen;
