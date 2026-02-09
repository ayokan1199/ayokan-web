import React from "react";

interface ReelHeaderProps {
  creatorName: string;
  creatorBadge?: string;
}

const ReelHeader: React.FC<ReelHeaderProps> = ({ creatorName, creatorBadge }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-gray-400" /> {/* Avatar placeholder */}
      <span className="font-bold">{creatorName}</span>
      {creatorBadge && (
        <span className="px-2 py-0.5 text-xs rounded bg-yellow-500">{creatorBadge}</span>
      )}
      <button className="ml-auto px-3 py-1 border rounded">Suivre</button>
    </div>
  );
};

export default ReelHeader;
