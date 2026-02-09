import React, { useState } from "react";
import TutorialStep from "./TutorialStep";
import FreeSparkReward from "./FreeSparkReward";
import TutorialCompletion from "./TutorialCompletion";
import { FaGift } from "react-icons/fa";

const steps = [
  { title: "Découvrir le Magic Cooler", description: "Apprenez à naviguer dans votre glacière magique." },
  { title: "Collecter vos Étincelles", description: "Complétez des activités pour gagner des Étincelles." },
  { title: "Activer des offres", description: "Profitez de réductions et bonus sur vos offres préférées." },
];

const MagicCoolerTutorialScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  if (completed) return <TutorialCompletion onComplete={() => alert("Tutoriel terminé !")} />;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Tutoriel Magic Cooler</h1>
      <TutorialStep
        stepNumber={currentStep + 1}
        title={steps[currentStep].title}
        description={steps[currentStep].description}
        icon={<FaGift className="text-yellow-400" />}
      />
      <FreeSparkReward amount={10} />
      <div className="text-center mt-4">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {currentStep < steps.length - 1 ? "Suivant" : "Terminer"}
        </button>
      </div>
    </div>
  );
};

export default MagicCoolerTutorialScreen;
