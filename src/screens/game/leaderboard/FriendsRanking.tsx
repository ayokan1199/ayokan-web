import React from "react";

const friendsPlayers = [
  { id: "f1", name: "You", score: 1000 },
  { id: "f2", name: "Alice", score: 950 },
  { id: "f3", name: "Bob", score: 900 },
];

const FriendsRanking: React.FC = () => {
  return (
    <div className="bg-white p-3 rounded shadow">
      <h3 className="font-semibold mb-2">Classement amis</h3>
      <ul className="space-y-1">
        {friendsPlayers.map((p, index) => (
          <li key={p.id} className="flex justify-between">
            <span>{index + 1}. {p.name}</span>
            <span>{p.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsRanking;
