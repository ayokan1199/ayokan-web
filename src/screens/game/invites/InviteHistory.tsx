import React from "react";

const history = [
  { id: "h1", friend: "Alice", result: "Gagné" },
  { id: "h2", friend: "Bob", result: "Perdu" },
];

const InviteHistory: React.FC = () => {
  return (
    <div className="bg-white p-3 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">Historique des invitations</h3>
      <ul className="space-y-1">
        {history.map(h => (
          <li key={h.id} className="flex justify-between">
            <span>{h.friend}</span>
            <span className={`font-semibold ${h.result === "Gagné" ? "text-green-500" : "text-red-500"}`}>
              {h.result}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InviteHistory;
