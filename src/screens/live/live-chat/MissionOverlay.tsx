import React from "react";

interface Props {
  title: string;
  progress: number;
}

const MissionOverlay: React.FC<Props> = ({ title, progress }) => {
  return (
    <div className="absolute bottom-24 left-4 bg-white rounded shadow p-3 w-64">
      <h4 className="font-semibold text-sm">{title}</h4>

      <div className="h-2 bg-gray-200 rounded mt-2 overflow-hidden">
        <div
          className="h-full bg-green-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-gray-500 mt-1">
        {progress}% completed
      </p>
    </div>
  );
};

export default MissionOverlay;
