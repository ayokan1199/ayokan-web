// screens/bluezone/live/LiveItem.tsx
import React from "react";

type LiveItemProps = {
  id: number;
  title: string;
  host: string;
  viewers: number;
  onJoin: (id: number) => void;
};

const LiveItem: React.FC<LiveItemProps> = ({ id, title, host, viewers, onJoin }) => {
  return (
    <div className="border p-3 rounded-md bg-white shadow-sm flex justify-between items-center">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-gray-600 text-sm">Hôte: {host}</p>
        <p className="text-gray-600 text-sm">👁️ {viewers}</p>
      </div>
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => onJoin(id)}
      >
        Rejoindre
      </button>
    </div>
  );
};

export default LiveItem;
