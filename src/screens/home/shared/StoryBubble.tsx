// src/home/stories/StoryBubble.tsx
import React from "react";

export type StoryUser = {
  id: string;
  name: string;
  avatar: string;
  isLive?: boolean;
  isVip?: boolean;
  isPopular?: boolean;
  viewed?: boolean;
};

type Props = {
  story: StoryUser;
  onOpen: (id: string) => void;
};

const StoryBubble: React.FC<Props> = ({ story, onOpen }) => {
  const ring = getRing(story);

  return (
    <button
      onClick={() => onOpen(story.id)}
      className="flex flex-col items-center gap-1"
    >
      <style>{css}</style>

      <div className="relative">
        {!story.viewed && (
          <span
            className="absolute inset-[-6px] rounded-full animate-spin-slow"
            style={{ background: ring }}
          />
        )}

        <img
          src={story.avatar}
          className="relative z-10 h-16 w-16 rounded-full border border-black object-cover"
        />

        {story.isLive && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-2 text-[10px] font-black text-white">
            LIVE
          </span>
        )}
      </div>

      <span className="text-[11px] font-bold text-white/80 truncate max-w-[70px]">
        {story.name}
      </span>
    </button>
  );
};

export default StoryBubble;

function getRing(s: StoryUser) {
  if (s.isLive) return "linear-gradient(45deg,#ff0040,#ff7a00)";
  if (s.isVip) return "linear-gradient(45deg,#e6b566,#ffd700)";
  if (s.isPopular) return "linear-gradient(45deg,#8b5cf6,#ec4899)";
  return "linear-gradient(45deg,#ff69b4,#f5d36c)";
}

const css = `
@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow{
  animation: spinSlow 6s linear infinite;
}
`;
