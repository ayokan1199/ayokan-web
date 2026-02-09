// src/home/live/LiveCard.tsx
import React from "react";

export type LiveCardUser = {
  id: string;
  name: string;
  avatarUrl: string;
  viewers: number;
  category?: "popular" | "plan-cul" | "vip";
  isLive: boolean;
};

type LiveCardProps = {
  user: LiveCardUser;
  onClick: (userId: string) => void;
  onJoin: (userId: string) => void;
};

const LiveCard: React.FC<LiveCardProps> = ({ user, onClick, onJoin }) => {
  const badge = getCategoryBadge(user.category);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(user.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick(user.id);
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/7"
      aria-label={`Ouvrir le live de ${user.name}`}
    >
      <style>{css}</style>

      {/* glow */}
      <div
        className="pointer-events-none absolute -left-16 -top-16 h-[200px] w-[200px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(232,162,182,0.14), transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-16 -bottom-16 h-[220px] w-[220px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(215,178,124,0.12), transparent 72%)",
        }}
      />

      {/* top row */}
      <div className="relative z-[1] flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-12 w-12 rounded-2xl border border-white/10 object-cover"
            />
            {user.isLive ? (
              <span className="absolute -bottom-1 -right-1 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-black text-white/90">
                <span className="tv-icon" aria-hidden="true">
                  📺
                  <span className="tv-dot" />
                </span>
              </span>
            ) : null}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-black text-white/90">
                {user.name}
              </span>

              {badge ? (
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black"
                  style={badge.style}
                >
                  {badge.label}
                </span>
              ) : null}
            </div>

            <div className="mt-0.5 flex items-center gap-2">
              {user.isLive ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-black text-red-200">
                  <span className="live-dot" aria-hidden="true" />
                  EN DIRECT
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-white/55">
                  Hors ligne
                </span>
              )}

              <span className="text-[11px] font-semibold text-white/55">
                {formatViewers(user.viewers)} spectateurs
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onJoin(user.id);
          }}
          className="rounded-2xl px-3 py-2 text-xs font-black text-[#120A12] transition active:scale-[0.99]"
          style={{
            background:
              "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
            boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
          }}
          aria-label={`Rejoindre le live de ${user.name}`}
        >
          Rejoindre
        </button>
      </div>

      {/* preview */}
      <div className="relative z-[1] mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <div className="aspect-[16/9] w-full">
          <div className="h-full w-full bg-gradient-to-br from-white/10 via-transparent to-white/5" />
        </div>

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="text-xs font-black text-white/90">
            {user.isLive ? "Live en cours" : "Replay"}
          </span>

          {user.isLive ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/35 px-2 py-1 text-[10px] font-black text-white/85">
              📺
              <span className="live-dot" aria-hidden="true" />
              LIVE
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full border border-white/10 bg-black/35 px-2 py-1 text-[10px] font-black text-white/75">
              ▶︎ Voir
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveCard;

/* ----------------------------- */

function formatViewers(n: number) {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(n >= 10_000 ? 0 : 1)}k`;
  return `${(n / 1_000_000).toFixed(1)}M`;
}

function getCategoryBadge(category?: LiveCardUser["category"]) {
  if (!category) return null;

  if (category === "popular") {
    return {
      label: "POPULAIRE",
      style: {
        background: "rgba(170,90,255,0.16)",
        border: "1px solid rgba(170,90,255,0.22)",
        color: "rgba(235,220,255,0.92)",
      } as React.CSSProperties,
    };
  }

  if (category === "plan-cul") {
    return {
      label: "PLAN CUL ⭐",
      style: {
        background: "rgba(255,180,70,0.14)",
        border: "1px solid rgba(255,180,70,0.22)",
        color: "rgba(255,235,200,0.92)",
      } as React.CSSProperties,
    };
  }

  if (category === "vip") {
    return {
      label: "VIP",
      style: {
        background: "rgba(215,178,124,0.18)",
        border: "1px solid rgba(215,178,124,0.26)",
        color: "rgba(255,230,190,0.92)",
      } as React.CSSProperties,
    };
  }

  return null;
}

const css = `
.live-dot{
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: rgb(255,59,59);
  box-shadow: 0 0 12px rgba(255,59,59,0.75);
  animation: aykLiveDot 0.9s ease-in-out infinite;
}

@keyframes aykLiveDot {
  0% { opacity: 0.25; transform: scale(0.92); }
  50% { opacity: 1; transform: scale(1.08); }
  100% { opacity: 0.25; transform: scale(0.92); }
}

.tv-icon{
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.tv-dot{
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  right: -2px;
  top: -2px;
  background: rgb(255,59,59);
  box-shadow: 0 0 12px rgba(255,59,59,0.75);
  animation: aykTvDot 0.9s ease-in-out infinite;
}

@keyframes aykTvDot {
  0% { opacity: 0.25; transform: scale(0.92); }
  50% { opacity: 1; transform: scale(1.08); }
  100% { opacity: 0.25; transform: scale(0.92); }
}
`;
