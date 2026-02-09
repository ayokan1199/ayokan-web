// src/home/feed/UserHeader.tsx
import React, { useMemo } from "react";

export type FeedUser = {
  id: string;
  name: string;

  avatarUrl: string;

  username?: string;
  city?: string;

  isNew?: boolean;
  isPopular?: boolean;

  isVip?: boolean; // badge doré
  isGold?: boolean; // badge vert + diamant 💎
isPremium?: boolean,
  isLive?: boolean; // TV + point rouge clignotant
};

type UserHeaderProps = {
  user: FeedUser;

  createdAt?: string; // ISO
  locationLabel?: string;
  isSponsored?: boolean;

  onOpenProfile: () => void;
  onFollow?: () => void;
  onMenu?: () => void;
};

const UserHeader: React.FC<UserHeaderProps> = ({
  user,
  createdAt,
  locationLabel,
  isSponsored,
  onOpenProfile,
  onFollow,
  onMenu,
}) => {
  const meta = useMemo(() => {
    const parts: string[] = [];
    const time = createdAt ? formatRelative(createdAt) : null;
    if (time) parts.push(time);
    const loc = locationLabel || user.city;
    if (loc) parts.push(loc);
    if (isSponsored) parts.push("Sponsorisé");
    return parts.join(" • ");
  }, [createdAt, locationLabel, user.city, isSponsored]);

  return (
    <header className="flex items-start justify-between gap-3" aria-label="En-tête du post">
      <style>{css}</style>

      {/* Left clickable area */}
      <button
        type="button"
        onClick={onOpenProfile}
        className="group flex min-w-0 items-center gap-3 text-left"
        aria-label={`Ouvrir le profil de ${user.name}`}
      >
        <div className="relative">
          <div className="relative h-11 w-11 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-full w-full object-cover transition group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>

          {/* Live indicator: TV + red blink */}
          {user.isLive ? (
            <div className="absolute -right-2 -top-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/45 px-2 py-1 text-[10px] font-black text-white/90">
                <span className="tv-wrap" aria-hidden="true">
                  📺
                  <span className="tv-dot" />
                </span>
                LIVE
              </span>
            </div>
          ) : null}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate text-sm font-black text-white/92">
              {user.name}
            </span>

            {/* VIP */}
            {user.isVip ? (
              <Badge
                label="VIP"
                style={{
                  background: "rgba(215,178,124,0.18)",
                  border: "1px solid rgba(215,178,124,0.26)",
                  color: "rgba(255,230,190,0.92)",
                }}
              />
            ) : null}

            {/* GOLD: badge vert + diamant */}
            {user.isGold ? (
              <Badge
                label="💎 Gold"
                style={{
                  background: "rgba(34,197,94,0.16)",
                  border: "1px solid rgba(34,197,94,0.24)",
                  color: "rgba(210,255,225,0.95)",
                }}
              />
            ) : null}

            {/* New / Popular */}
            {user.isNew ? (
              <Badge
                label="🆕"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "rgba(255,255,255,0.92)",
                }}
              />
            ) : null}

            {user.isPopular ? (
              <Badge
                label="🔥"
                style={{
                  background: "rgba(170,90,255,0.16)",
                  border: "1px solid rgba(170,90,255,0.22)",
                  color: "rgba(235,220,255,0.92)",
                }}
              />
            ) : null}
          </div>

          {meta ? (
            <div className="mt-1 text-[12px] font-semibold text-white/60">
              {meta}
            </div>
          ) : (
            <div className="mt-1 text-[12px] font-semibold text-white/55">
              Voir le profil
            </div>
          )}
        </div>
      </button>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {onFollow ? (
          <button
            type="button"
            onClick={onFollow}
            className="rounded-2xl border border-white/12 bg-white/5 px-3 py-2 text-xs font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
            aria-label="Suivre"
          >
            Suivre
          </button>
        ) : null}

        <button
          type="button"
          onClick={onMenu}
          className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-white/85 hover:bg-white/10 active:scale-[0.99]"
          aria-label="Menu du post"
        >
          •••
        </button>
      </div>
    </header>
  );
};

export default UserHeader;

/* ---------------------------------- */

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

function formatRelative(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (!Number.isFinite(diff)) return "";

  const sec = Math.floor(diff / 1000);
  if (sec < 30) return "à l’instant";
  if (sec < 60) return `${sec}s`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}min`;

  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h`;

  const days = Math.floor(h / 24);
  if (days < 7) return `${days}j`;

  // fallback
  return d.toLocaleDateString();
}

const css = `
/* Live: rouge clignotant dans une TV 📺 */
.tv-wrap{
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
