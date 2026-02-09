// screens/bluezone/reels/ReelsList.tsx
import React, { useState } from "react";
import ReelsItem from "./ReelsItem";

type Reel = {
  id: number;
  author: string;
  videoUrl: string;
  likes: number;
  comments: number;
};

const initialReels: Reel[] = [
  { id: 1, author: "Alex", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", likes: 10, comments: 2 },
  { id: 2, author: "Sam", videoUrl: "https://www.w3schools.com/html/movie.mp4", likes: 7, comments: 1 },
];

const ReelsList: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>(initialReels);

  const handleLike = (id: number) => {
    setReels((prev) => prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r)));
  };

  return (
    <div className="space-y-4">
      {reels.map((reel) => (
        <ReelsItem key={reel.id} {...reel} onLike={handleLike} />
      ))}
    </div>
  );
};

export default ReelsList;
