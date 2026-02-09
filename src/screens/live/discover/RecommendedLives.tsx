import React from "react";
import LiveCard, { Live } from "./LiveCard";

const recommendedLives: Live[] = [
  {
    id: "r1",
    title: "Chill & Chat",
    creator: "Luna",
    viewers: 320,
  },
  {
    id: "r2",
    title: "VIP Room 🔥",
    creator: "Alex",
    viewers: 120,
    isPremium: true,
  },
];

const RecommendedLives: React.FC = () => {
  return (
    <div>
      <h2 className="font-semibold mb-2">Recommended for you</h2>

      <div className="grid grid-cols-2 gap-3">
        {recommendedLives.map((live) => (
          <LiveCard key={live.id} live={live} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedLives;
