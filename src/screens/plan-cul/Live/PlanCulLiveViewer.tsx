import React from "react";

const PlanCulLiveViewer: React.FC = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Live Viewer</h2>

      <div className="bg-black h-64 rounded mb-4 flex items-center justify-center text-white">
        Vidéo Live (placeholder)
      </div>

      <div className="flex gap-2 mb-2">
        <button className="px-3 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
          ❤️ J’aime
        </button>
        <button className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
          💬 Chat
        </button>
      </div>

      <div className="p-2 bg-gray-50 rounded">Commentaires / Chat coquin</div>
    </div>
  );
};

export default PlanCulLiveViewer;
