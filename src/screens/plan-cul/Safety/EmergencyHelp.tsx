import React from "react";

const EmergencyHelp: React.FC = () => {
  const handleCallHelp = () => {
    alert("Appel d'urgence simulé activé !");
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-2 text-center">
      <h2 className="font-semibold text-lg">Aide d’urgence</h2>
      <p className="text-gray-700">
        En cas de danger ou de situation critique, contactez immédiatement les services d’urgence.
      </p>
      <button
        onClick={handleCallHelp}
        className="w-full py-2 mt-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Appeler l’aide d’urgence
      </button>
    </div>
  );
};

export default EmergencyHelp;
