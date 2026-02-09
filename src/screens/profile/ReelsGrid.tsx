import React from "react";

interface Reel {
  id: string;
  videoUrl: string;
  creatorName: string;
  creatorBadge?: "VIP" | "Gold";
  likes: number;
  views: number;
}

interface ReelsGridProps {
  reels?: Reel[];
}

const ReelsGrid: React.FC<ReelsGridProps> = ({ reels }) => {
  // Exemple par défaut
  const defaultReels: Reel[] = [
    { id: "1", videoUrl: "/videos/reel1.mp4", creatorName: "Alice", creatorBadge: "VIP", likes: 120, views: 500 },
    { id: "2", videoUrl: "/videos/reel2.mp4", creatorName: "Bob", creatorBadge: "Gold", likes: 300, views: 1200 },
    { id: "3", videoUrl: "/videos/reel3.mp4", creatorName: "Charlie", likes: 50, views: 200 },
    { id: "4", videoUrl: "/videos/reel4.mp4", creatorName: "Diana", creatorBadge: "VIP", likes: 220, views: 800 },
  ];

  const gridReels = reels || defaultReels;

  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      {gridReels.map((reel) => (
        <div key={reel.id} className="relative w-full aspect-video rounded overflow-hidden group">
          <video
            src={reel.videoUrl}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            autoPlay
            loop
            muted
          />
          {/* Overlay info */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1">
              <span className="font-bold">{reel.creatorName}</span>
              {reel.creatorBadge && (
                <span className={`px-1 text-xs rounded ${
                  reel.creatorBadge === "VIP" ? "bg-purple-500" : "bg-yellow-400"
                }`}>{reel.creatorBadge}</span>
              )}
            </div>
            <div className="flex gap-2 text-xs">
              <span>❤️ {reel.likes}</span>
              <span>👁️ {reel.views}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReelsGrid;
