import React from "react";
import LiveAvatar from "../shared/LiveAvatar";

interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  points: number;
}

interface Props {
  users: User[];
}

const TopPassionUsers: React.FC<Props> = ({ users }) => {
  return (
    <div className="bg-white rounded shadow p-2">
      <h3 className="font-bold mb-2 text-sm">Top Passionnés</h3>
      <ul className="space-y-1">
        {users.map((u, idx) => (
          <li key={u.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{idx + 1}.</span>
              <LiveAvatar src={u.avatarUrl} size={24} />
              <span>{u.name}</span>
            </div>
            <span className="font-semibold">{u.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopPassionUsers;
