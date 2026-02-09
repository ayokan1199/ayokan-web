import React from "react";

const LiveStatsHeader: React.FC = () => {
  return (
    <div className="bg-black text-white rounded p-4 flex justify-between">
      <div>
        <p className="text-sm opacity-80">Viewers</p>
        <p className="text-xl font-bold">328</p>
      </div>
      <div>
        <p className="text-sm opacity-80">Gifts</p>
        <p className="text-xl font-bold">124</p>
      </div>
      <div>
        <p className="text-sm opacity-80">Sparks</p>
        <p className="text-xl font-bold">2 450</p>
      </div>
    </div>
  );
};

export default LiveStatsHeader;
