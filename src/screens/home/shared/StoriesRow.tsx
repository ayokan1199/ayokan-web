// src/home/stories/StoriesRow.tsx
import React, { useState } from "react";
import StoryBubble, { StoryUser } from "./StoryBubble";

type Props = {
  stories: StoryUser[];
};

const StoriesRow: React.FC<Props> = ({ stories }) => {
  const [seen, setSeen] = useState<Record<string, boolean>>({});

  const handleOpen = (id: string) => {
    setSeen((s) => ({ ...s, [id]: true }));
    console.log("open story", id);
  };

  return (
    <section className="mt-4 overflow-x-auto">
      <div className="flex gap-4 px-1">
        {/* Add story */}
        <button className="flex flex-col items-center gap-1">
          <div className="h-16 w-16 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center text-white text-xl">
            +
          </div>
          <span className="text-[11px] font-bold text-white/60">Ta story</span>
        </button>

        {stories.map((s) => (
          <StoryBubble
            key={s.id}
            story={{ ...s, viewed: seen[s.id] }}
            onOpen={handleOpen}
          />
        ))}
      </div>
    </section>
  );
};

export default StoriesRow;
