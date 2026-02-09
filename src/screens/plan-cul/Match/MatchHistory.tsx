import React from "react";

const previousMatches = ["Alice", "Bob", "Clara", "David"];

const MatchHistory: React.FC = () => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Historique des matchs</h3>
      <ul className="space-y-1 text-gray-700">
        {previousMatches.map((user) => (
          <li key={user} className="p-2 bg-gray-100 rounded">
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchHistory;
