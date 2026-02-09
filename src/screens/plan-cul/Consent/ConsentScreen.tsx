import React from "react";
import ConsentChecklist from "./ConsentChecklist";

const ConsentScreen: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Consentement Plan Cul</h1>
      <p className="text-gray-700 text-center">
        Avant d’utiliser certaines fonctionnalités +18, merci de confirmer que tu es d’accord avec nos règles et pratiques de consentement.
      </p>

      {/* Checklist interactive */}
      <ConsentChecklist />

      <button
        className="w-full py-2 bg-pink-500 text-white font-semibold rounded hover:bg-pink-600 transition"
      >
        Confirmer et continuer
      </button>
    </div>
  );
};

export default ConsentScreen;
