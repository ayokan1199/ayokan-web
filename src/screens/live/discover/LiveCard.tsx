import React from "react";

export interface Live {
  id: string;
  title: string;
  creator: string;
  viewers: number;
  isPremium?: boolean;
}

interface Props {
  live: Live;
}

const LiveCard: React.FC<Props> = ({ live }) => {
  return (
    <div className="bg-white rounded shadow p-3">
      <div className="h-32 bg-gray-200 rounded mb-2 flex items-center justify-center">
        <span className="text-sm text-gray-500">Live Preview</span>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{live.title}</h3>
          <p className="text-xs text-gray-500">{live.creator}</p>
        </div>

        <div className="text-xs text-gray-600">
          👀 {live.viewers}
        </div>
      </div>

      {live.isPremium && (
        <span className="inline-block mt-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
          Premium
        </span>
      )}
    </div>
  );
};

export default LiveCard;
