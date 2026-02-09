// screens/bluezone/live/BluezoneLiveScreen.tsx
import React, { useState } from "react";
import LiveItem from "./LiveItem";

type Live = {
  id: number;
  title: string;
  host: string;
  viewers: number;
};

const initialLives: Live[] = [
  { id: 1, title: "Discussion SafeSpace 🌈", host: "Alex", viewers: 12 },
  { id: 2, title: "Live rencontre amicale", host: "Sam", viewers: 5 },
];

const BluezoneLiveScreen: React.FC = () => {
  const [lives, setLives] = useState<Live[]>(initialLives);

  const handleJoin = (id: number) => {
    alert(`Vous avez rejoint le live ${id}`);
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Lives BlueZone</h1>
      {lives.map((live) => (
        <LiveItem key={live.id} {...live} onJoin={handleJoin} />
      ))}
    </div>
  );
};

export default BluezoneLiveScreen;
