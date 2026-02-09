import React from "react";

const LiveCreatorOptions: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Live Options</h3>

      <div className="space-y-2 text-sm">
        <button className="w-full text-left">Enable slow mode</button>
        <button className="w-full text-left">Mute participants</button>
        <button className="w-full text-left">Block user</button>
      </div>
    </div>
  );
};

export default LiveCreatorOptions;
