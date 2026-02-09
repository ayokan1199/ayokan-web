import React from "react";

interface Props {
  onComplete: () => void;
}

const TutorialCompletion: React.FC<Props> = ({ onComplete }) => {
  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Tutoriel terminé 🎉</h2>
      <p className="text-gray-700 mb-6">Vous avez débloqué toutes les fonctionnalités du Magic Cooler !</p>
      <button
        onClick={onComplete}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Commencer
      </button>
    </div>
  );
};

export default TutorialCompletion;
