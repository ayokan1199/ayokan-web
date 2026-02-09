import React from "react";

export type ReelItem = {
  id: string;
  videoUrl?: string;
  thumbnail: string;
  username: string;
  avatar: string;
  likes: number;
  comments: number;
  isLive?: boolean;
};

type Props = {
  reels: ReelItem[];
  onOpen: (id: string) => void;
};

const ReelsPreview: React.FC<Props> = ({ reels, onOpen }) => {
  return (
    <section className="mt-6">
      <style>{css}</style>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-black text-white/90">🎥 Reels</h2>

        <button className="text-xs font-bold text-pink-300 hover:underline">
          Voir tout
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3">
        {reels.map((reel) => (
          <button
            key={reel.id}
            onClick={() => onOpen(reel.id)}
            className="group relative min-w-[160px] overflow-hidden rounded-3xl border border-white/10 bg-black/40"
          >
            {/* thumbnail */}
            <img
              src={reel.thumbnail}
              className="h-[260px] w-full object-cover transition group-hover:scale-105"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* LIVE */}
            {reel.isLive && (
              <div className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black text-white animate-pulse">
                🔴 LIVE
              </div>
            )}

            {/* user */}
            <div className="absolute bottom-2 left-2 flex items-center gap-2">
              <img
                src={reel.avatar}
                className="h-7 w-7 rounded-full border border-white/20"
              />
              <span className="text-[11px] font-bold text-white">
                {reel.username}
              </span>
            </div>

            {/* stats */}
            <div className="absolute bottom-2 right-2 flex flex-col items-end gap-1 text-[10px] text-white">
              <span>❤️ {reel.likes}</span>
              <span>💬 {reel.comments}</span>
            </div>

            {/* glow */}
            <div className="absolute inset-0 pointer-events-none reel-glow" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default ReelsPreview;

const css = `
.reel-glow{
  box-shadow: inset 0 -60px 120px rgba(232,162,182,0.12);
}
`;
