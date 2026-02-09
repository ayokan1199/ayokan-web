// src/home/live/LiveNowInline.tsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export type LiveNowInlineItem = {
  id: string;

  hostId: string;
  hostName: string;
  hostAvatarUrl: string;

  title?: string;
  category?: "popular" | "plan-cul" | "vip" | "nearby";

  viewersCount?: number;

  // if true: TV icon + red blink in it
  isLive: true;

  // optional
  isVip?: boolean;
  isGold?: boolean;
};

type LiveNowInlineProps = {
  items: LiveNowInlineItem[];
  onJoin?: (liveId: string) => void;
  onOpenHost?: (hostId: string) => void;
  className?: string;
};

const LiveNowInline: React.FC<LiveNowInlineProps> = ({
  items,
  onJoin,
  onOpenHost,
  className,
}) => {
  const navigate = useNavigate();

  const safeItems = useMemo(() => (items ?? []).filter(Boolean).slice(0, 12), [items]);

  const join = (liveId: string) => {
    if (onJoin) return onJoin(liveId);
    navigate(`/live/${encodeURIComponent(liveId)}`);
  };

  const openHost = (hostId: string) => {
    if (onOpenHost) return onOpenHost(hostId);
    navigate(`/profile/${encodeURIComponent(hostId)}`);
  };

  if (safeItems.length === 0) return null;

  return (
    <section className={["mt-6", className ?? ""].join(" ")} aria-label="LIVE en cours">
      <style>{css}</style>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
        {/* glows */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full blur-3xl live-glow-rose" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-[360px] w-[360px] rounded-full blur-3xl live-glow-gold" />

        <div className="relative z-[1] flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[12px] font-black text-white/90">
                <TVLiveIcon />
                LIVE EN COURS
              </span>

              <span className="text-[12px] font-semibold text-white/60">
                {safeItems.length} live{safeItems.length > 1 ? "s" : ""}
              </span>
            </div>

            <p className="mt-2 text-sm font-semibold text-white/65">
              Rejoins un live en 1 clic. Cadeaux, vibes et rencontres.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/live")}
            className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-xs font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
          >
            Tout voir
          </button>
        </div>

        <div className="relative z-[1] mt-4">
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
            {safeItems.map((l) => (
              <LiveInlineCard
                key={l.id}
                item={l}
                onJoin={() => join(l.id)}
                onOpenHost={() => openHost(l.hostId)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveNowInline;

/* ---------------------------------- */

const LiveInlineCard: React.FC<{
  item: LiveNowInlineItem;
  onJoin: () => void;
  onOpenHost: () => void;
}> = ({ item, onJoin, onOpenHost }) => {
  const viewersLabel = formatViewers(item.viewersCount);

  return (
    <div className="w-[240px] shrink-0">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-4">
        {/* mini glows */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-[220px] w-[220px] rounded-full blur-3xl live-mini-rose" />
        <div className="pointer-events-none absolute -right-16 -bottom-16 h-[240px] w-[240px] rounded-full blur-3xl live-mini-gold" />

        <div className="relative z-[1] flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={onOpenHost}
            className="flex min-w-0 items-center gap-3 text-left"
            aria-label={`Ouvrir profil de ${item.hostName}`}
          >
            <div className="relative">
              <div className="h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img
                  src={item.hostAvatarUrl}
                  alt={item.hostName}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* TV live badge on avatar */}
              <div className="absolute -right-2 -bottom-2">
                <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/55 px-2 py-1 text-[10px] font-black text-white/90">
                  <TVLiveIcon small />
                </span>
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="truncate text-sm font-black text-white/92">
                  {item.hostName}
                </span>

                {item.isGold ? (
                  <Badge
                    label="💎 Gold"
                    style={{
                      background: "rgba(34,197,94,0.16)",
                      border: "1px solid rgba(34,197,94,0.24)",
                      color: "rgba(210,255,225,0.95)",
                    }}
                  />
                ) : null}

                {item.isVip ? (
                  <Badge
                    label="VIP"
                    style={{
                      background: "rgba(215,178,124,0.18)",
                      border: "1px solid rgba(215,178,124,0.26)",
                      color: "rgba(255,230,190,0.92)",
                    }}
                  />
                ) : null}
              </div>

              <div className="mt-1 text-[12px] font-semibold text-white/65">
                {viewersLabel}
              </div>
            </div>
          </button>

          {item.category ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-black text-white/75">
              {categoryLabel(item.category)}
            </span>
          ) : null}
        </div>

        {item.title ? (
          <div className="relative z-[1] mt-3 text-[12px] font-semibold text-white/70 line-clamp-2">
            {item.title}
          </div>
        ) : (
          <div className="relative z-[1] mt-3 text-[12px] font-semibold text-white/55">
            Clique pour rejoindre le live
          </div>
        )}

        <button
          type="button"
          onClick={onJoin}
          className="relative z-[1] mt-4 w-full rounded-2xl px-4 py-3 text-sm font-black text-[#120A12] active:scale-[0.99]"
          style={{
            background:
              "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
            boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
          }}
        >
          Rejoindre
        </button>
      </div>
    </div>
  );
};

const Badge: React.FC<{ label: string; style: React.CSSProperties }> = ({
  label,
  style,
}) => (
  <span
    className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black"
    style={style}
  >
    {label}
  </span>
);

/* ---------------------------------- */
/* TV Icon with blinking red dot INSIDE the TV */

const TVLiveIcon: React.FC<{ small?: boolean }> = ({ small }) => {
  const size = small ? 16 : 18;
  return (
    <span className="tv-ico" aria-hidden="true" style={{ width: size, height: size }}>
      <span className="tv-emoji">📺</span>
      <span className="tv-dot" />
    </span>
  );
};

/* ---------------------------------- */

function formatViewers(n?: number) {
  const v = typeof n === "number" && Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
  if (v === 0) return "En direct";
  if (v < 1000) return `${v} spectateurs`;
  if (v < 1_000_000) return `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k spectateurs`;
  return `${(v / 1_000_000).toFixed(v % 1_000_000 === 0 ? 0 : 1)}M spectateurs`;
}

function categoryLabel(c: NonNullable<LiveNowInlineItem["category"]>) {
  if (c === "plan-cul") return "Plan Cul ⭐";
  if (c === "vip") return "VIP";
  if (c === "nearby") return "Proche";
  return "Populaire";
}

const css = `
.live-glow-rose{
  background: radial-gradient(circle, rgba(232,162,182,0.14), transparent 72%);
}
.live-glow-gold{
  background: radial-gradient(circle, rgba(215,178,124,0.12), transparent 72%);
}
.live-mini-rose{
  background: radial-gradient(circle, rgba(232,162,182,0.12), transparent 72%);
}
.live-mini-gold{
  background: radial-gradient(circle, rgba(215,178,124,0.10), transparent 72%);
}

/* TV + blink dot INSIDE */
.tv-ico{
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
.tv-emoji{
  transform: translateY(0.5px);
}
.tv-dot{
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  left: 55%;
  top: 44%;
  transform: translate(-50%, -50%);
  background: rgb(255,59,59);
  box-shadow: 0 0 12px rgba(255,59,59,0.75);
  animation: aykTvBlink 0.9s ease-in-out infinite;
}
@keyframes aykTvBlink {
  0% { opacity: 0.25; transform: translate(-50%, -50%) scale(0.92); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.12); }
  100% { opacity: 0.25; transform: translate(-50%, -50%) scale(0.92); }
}

.no-scrollbar::-webkit-scrollbar{ display: none; }
.no-scrollbar{ scrollbar-width: none; -ms-overflow-style: none; }

/* clamp without plugin requirement */
.line-clamp-2{
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`;
