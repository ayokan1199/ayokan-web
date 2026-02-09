import React from "react";

const LiveChallengeProgress: React.FC = () => {
  const progress = 65;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Live Challenge</h3>

      <div className="h-2 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-full bg-pink-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-gray-500 mt-1">
        {progress}% completed
      </p>
    </div>
  );
};

export default LiveChallengeProgress;
