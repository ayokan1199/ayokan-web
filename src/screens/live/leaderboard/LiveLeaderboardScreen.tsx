import React, { useState } from "react";
import TopPassionUsers from "./TopPassionUsers";
import TopCreators from "./TopCreators";
import LeaderboardFilters from "./LeaderboardFilters";

const mockUsers = [
  { id: "u1", name: "Alice", points: 500, avatarUrl: "/avatars/alice.png" },
  { id: "u2", name: "Bob", points: 400, avatarUrl: "/avatars/bob.png" },
  { id: "u3", name: "Claire", points: 300, avatarUrl: "/avatars/claire.png" },
];

const mockCreators = [
  { id: "c1", name: "Host1", viewers: 120, avatarUrl: "/avatars/host1.png" },
  { id: "c2", name: "Host2", viewers: 100, avatarUrl: "/avatars/host2.png" },
];

const LiveLeaderboardScreen: React.FC = () => {
  const [filter, setFilter] = useState("Tous");

  return (
    <div className="p-4 bg-gray-100 min-h-screen space-y-4">
      <h2 className="text-lg font-bold mb-2">Classement LIVE</h2>

      <LeaderboardFilters
        filters={["Tous", "VIP", "Gold", "Proche"]}
        onSelect={setFilter}
      />

      <TopPassionUsers users={mockUsers} />
      <TopCreators creators={mockCreators} />
    </div>
  );
};

export default LiveLeaderboardScreen;
