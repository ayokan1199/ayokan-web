import React from "react";

interface Props {
  name: string;
  isHost?: boolean;
}

const ParticipantCard: React.FC<Props> = ({ name, isHost }) => {
  return (
    <div className="flex items-center gap-2 bg-white rounded px-2 py-1 shadow">
      <div className="w-8 h-8 bg-gray-300 rounded-full" />
      <span className="text-sm">{name}</span>
      {isHost && (
        <span className="text-xs bg-pink-500 text-white px-1 rounded">
          HOST
        </span>
      )}
    </div>
  );
};

export default ParticipantCard;
