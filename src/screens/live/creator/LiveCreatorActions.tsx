import React from "react";

const LiveCreatorActions: React.FC = () => {
  return (
    <div className="flex gap-3">
      <button className="flex-1 bg-yellow-400 text-black py-2 rounded">
        Pause Live
      </button>
      <button className="flex-1 bg-red-500 text-white py-2 rounded">
        End Live
      </button>
    </div>
  );
};

export default LiveCreatorActions;
