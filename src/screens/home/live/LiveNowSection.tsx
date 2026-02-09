// src/home/live/LiveNowSection.tsx
import React from "react";
import LiveCard, { LiveCardUser } from "./LiveCard";

type LiveNowSectionProps = {
  title?: string;
  subtitle?: string;
  items: LiveCardUser[];
  onOpenLive: (userId: string) => void;
  onJoinLive: (userId: string) => void;
  onSeeAll?: () => void;
};

const LiveNowSection: React.FC<LiveNowSectionProps> = ({
  title = "🔴 LIVE en cours",
  subtitle = "Populaires et Plan Cul, choisis ton ambiance.",
  items,
  onOpenLive,
  onJoinLive,
  onSeeAll,
}) => {
  return (
    <section className="mt-5" aria-label="Live en cours">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-white/90">{title}</h2>
          <p className="text-sm font-semibold text-white/60">{subtitle}</p>
        </div>

        {onSeeAll ? (
          <button
            type="button"
            onClick={onSeeAll}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-white/80 hover:bg-white/10"
          >
            Voir tout
          </button>
        ) : null}
      </div>

      {/* horizontal scroll (mobile) + grid (desktop) */}
      <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:pb-0 lg:grid-cols-3">
        {items.map((u) => (
          <div key={u.id} className="min-w-[320px] md:min-w-0">
            <LiveCard user={u} onClick={onOpenLive} onJoin={onJoinLive} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveNowSection;
