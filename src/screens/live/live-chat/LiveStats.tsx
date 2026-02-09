import React from "react";

const LiveStats: React.FC = () => {
  return (
    <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white text-xs p-3 rounded space-y-1">
      <div>👀 542 viewers</div>
      <div>🔥 Rank #12</div>
      <div>⭐ 1.2K sparks</div>
    </div>
  );
};

export default LiveStats;
