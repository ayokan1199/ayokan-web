import React from "react";

const statuses = [
  { id: "s1", friend: "Bob", result: "Accepté" },
  { id: "s2", friend: "Charlie", result: "En attente" },
];

const InviteStatus: React.FC = () => {
  return (
    <div className="bg-white p-3 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">Statut des invitations</h3>
      <ul className="space-y-1">
        {statuses.map(s => (
          <li key={s.id} className="flex justify-between">
            <span>{s.friend}</span>
            <span className={`font-semibold ${
              s.result === "Accepté" ? "text-green-500" : "text-yellow-500"
            }`}>{s.result}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InviteStatus;
