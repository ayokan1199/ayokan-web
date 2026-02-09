import React from "react";

const PlanCulLiveCreator: React.FC = () => {
  const startLive = () => alert("Live commencé !");
  const endLive = () => alert("Live terminé !");

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Créateur Live Plan Cul</h2>

      <div className="bg-black h-64 rounded mb-4 flex items-center justify-center text-white">
        Caméra Live (placeholder)
      </div>

      <div className="flex gap-2">
        <button
          onClick={startLive}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Démarrer Live
        </button>
        <button
          onClick={endLive}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Terminer Live
        </button>
      </div>
    </div>
  );
};

export default PlanCulLiveCreator;
