import React from "react";

const matches = [
  { id: "m1", opponent: "Bot1", status: "En attente" },
  { id: "m2", opponent: "Alice", status: "En cours" },
];

const InviteMatchList: React.FC = () => {
  return (
    <div className="bg-white p-3 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">Matchs</h3>
      <ul className="space-y-1">
        {matches.map(m => (
          <li key={m.id} className="flex justify-between">
            <span>{m.opponent}</span>
            <span className="text-gray-500">{m.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InviteMatchList;
