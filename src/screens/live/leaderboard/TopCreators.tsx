import React from "react";
import LiveAvatar from "../shared/LiveAvatar";

interface Creator {
  id: string;
  name: string;
  avatarUrl?: string;
  viewers: number;
}

interface Props {
  creators: Creator[];
}

const TopCreators: React.FC<Props> = ({ creators }) => {
  return (
    <div className="bg-white rounded shadow p-2">
      <h3 className="font-bold mb-2 text-sm">Top Créateurs</h3>
      <ul className="space-y-1">
        {creators.map((c, idx) => (
          <li key={c.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{idx + 1}.</span>
              <LiveAvatar src={c.avatarUrl} size={24} />
              <span>{c.name}</span>
            </div>
            <span className="font-semibold">{c.viewers} viewers</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCreators;
