import React from "react";
import LiveAvatar from "../shared/LiveAvatar";

interface Participant {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface Props {
  participants: Participant[];
}

const LiveVideoGrid: React.FC<Props> = ({ participants }) => {
  const gridClass =
    participants.length <= 4
      ? "grid-cols-2"
      : participants.length <= 6
      ? "grid-cols-3"
      : "grid-cols-4";

  return (
    <div className={`grid ${gridClass} gap-2 p-2`}>
      {participants.map((p) => (
        <div key={p.id} className="relative bg-black rounded overflow-hidden h-32">
          <LiveAvatar src={p.avatarUrl} size={24} />
          <div className="absolute bottom-1 left-1 text-white text-xs bg-black bg-opacity-50 px-1 rounded">
            {p.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveVideoGrid;
