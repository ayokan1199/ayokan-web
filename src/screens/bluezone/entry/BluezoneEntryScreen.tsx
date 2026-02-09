// bluezone/entry/BluezoneEntryScreen.tsx
import React from "react";

const BluezoneEntryScreen: React.FC<{ onContinue?: () => void }> = ({
  onContinue,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-indigo-900 to-black text-white">
      <h1 className="text-3xl font-bold mb-4">
        Bienvenue dans la communauté BlueZone
      </h1>

      <p className="text-sm opacity-90 max-w-md mb-8">
        Un espace inclusif, respectueux et réservé aux personnes concernées.
        <br />
        Ici, la bienveillance et la sécurité sont prioritaires.
      </p>

      <button
        onClick={onContinue}
        className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
      >
        Continuer
      </button>
    </div>
  );
};

export default BluezoneEntryScreen;
