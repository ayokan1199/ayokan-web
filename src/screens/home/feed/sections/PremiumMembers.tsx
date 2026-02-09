// src/screens/home/feed/sections/PremiumMembers.tsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ✅ PREMIUM / VIP MEMBERS
 * - Cartes cliquables (profil)
 * - Badge Premium = ⭐ (doré)
 * - Badge Gold = 💎 (diamant + style vert)
 * - LIVE = 📺 avec point rouge clignotant à l’intérieur
 * - Design premium rose doré / noir
 */

export type PremiumMember = {
  id: string;

  name: string;
  username?: string;
  avatarUrl: string;

  city?: string;

  // badges
  isVip?: boolean;     // VIP (doré)
  isGold?: boolean;    // GOLD (diamant + vert)
  isPremium?: boolean; // PREMIUM (⭐)

  // live indicator
  isLive?: boolean;

  // optional perks
  spotlightLabel?: string; // ex: "Tendance", "Top Gifts"
};

type PremiumMembersProps = {
  title?: string;
  subtitle?: string;

  members: PremiumMember[];

  onOpenProfile?: (id: string) => void;
  onSubscribeVip?: () => void;
  onFollow?: (id: string) => void;

  className?: string;
};

const PremiumMembers: React.FC<PremiumMembersProps> = ({
  title = "⭐ Membres Premium / VIP",
  subtitle = "Visibilité boostée, profils d’élite, vibes premium.",
  members,
  onOpenProfile,
  onSubscribeVip,
  onFollow,
  className,
}) => {
  const navigate = useNavigate();

  const items = useMemo(
    () => (members ?? []).filter(Boolean).slice(0, 12),
    [members]
  );

  const openProfile = (id: string) => {
    if (onOpenProfile) return onOpenProfile(id);

    // ✅ Fallback safe avec tes routes actuelles (pas /profile/:id)
    navigate("/profile", { state: { userId: id } });
  };

  const subscribeVip = () => {
    if (onSubscribeVip) return onSubscribeVip();
    // fallback: plus tard tu pointeras vers /vip ou /shop
    navigate("/", { state: { openVip: true } });
  };

  const follow = (id: string) => {
    if (onFollow) return onFollow(id);
  };

  if (items.length === 0) return null;

  return (
    <section
      className={["mt-6", className ?? ""].join(" ")}
      aria-label="Membres premium"
    >
      <style>{css}</style>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
        {/* glows */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full blur-3xl pr-glow-rose" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-[360px] w-[360px] rounded-full blur-3xl pr-glow-gold" />

        <div className="relative z-[1] flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-black text-white/92">{title}</h2>
            <p className="mt-1 text-sm font-semibold text-white/65">
              {subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={subscribeVip}
            className="rounded-2xl px-4 py-3 text-xs font-black text-[#120A12] active:scale-[0.99]"
            style={{
              background:
                "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
              boxShadow: "0 14px 34px rgba(0,0,0,0.35)",
            }}
          >
            Pass VIP
          </button>
        </div>

        <div className="relative z-[1] mt-4">
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
            {items.map((m) => (
              <PremiumCard
                key={m.id}
                member={m}
                onOpenProfile={() => openProfile(m.id)}
                onFollow={() => follow(m.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumMembers;

/* ---------------------------------- */

const PremiumCard: React.FC<{
  member: PremiumMember;
  onOpenProfile: () => void;
  onFollow: () => void;
}> = ({ member, onOpenProfile, onFollow }) => {
  return (
    <div className="w-[250px] shrink-0">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-4">
        {/* micro glows */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-[220px] w-[220px] rounded-full blur-3xl pr-mini-rose" />
        <div className="pointer-events-none absolute -right-16 -bottom-16 h-[240px] w-[240px] rounded-full blur-3xl pr-mini-gold" />

        <div className="relative z-[1] flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={onOpenProfile}
            className="flex items-center gap-3 text-left"
            aria-label={`Ouvrir le profil premium de ${member.name}`}
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <img
                src={member.avatarUrl}
                alt={member.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="truncate text-sm font-black text-white/92">
                  {member.name}
                </span>

                {/* ✅ GOLD (diamant + vert) */}
                {member.isGold ? (
                  <Badge
                    label="💎"
                    style={{
                      background: "rgba(34,197,94,0.16)",
                      border: "1px solid rgba(34,197,94,0.24)",
                      color: "rgba(210,255,225,0.95)",
                    }}
                    ariaLabel="Membre Gold"
                  />
                ) : null}

                {/* ✅ PREMIUM (⭐) */}
                {member.isPremium ? (
                  <Badge
                    label="⭐"
                    style={{
                      background: "rgba(215,178,124,0.18)",
                      border: "1px solid rgba(215,178,124,0.26)",
                      color: "rgba(255,230,190,0.92)",
                    }}
                    ariaLabel="Membre Premium"
                  />
                ) : null}

                {/* ✅ VIP (doré) */}
                {member.isVip ? (
                  <Badge
                    label="VIP"
                    style={{
                      background: "rgba(215,178,124,0.22)",
                      border: "1px solid rgba(215,178,124,0.30)",
                      color: "rgba(255,230,190,0.95)",
                    }}
                    ariaLabel="Membre VIP"
                  />
                ) : null}

                {/* ✅ LIVE = TV + blink red dot */}
                {member.isLive ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/45 px-2 py-0.5 text-[10px] font-black text-white/90">
                    <TVLiveIcon />
                    LIVE
                  </span>
                ) : null}
              </div>

              <div className="mt-1 text-[12px] font-semibold text-white/60">
                {member.username
                  ? `@${member.username}`
                  : member.city
                    ? member.city
                    : "Premium"}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={onFollow}
            className="rounded-2xl border border-white/12 bg-white/5 px-3 py-2 text-[11px] font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
            aria-label="Suivre"
          >
            Suivre
          </button>
        </div>

        {/* Spotlight / label */}
        {member.spotlightLabel ? (
          <div className="relative z-[1] mt-3">
            <div
              className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-black"
              style={{
                background:
                  "linear-gradient(135deg, rgba(232,162,182,0.22), rgba(215,178,124,0.18))",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.88)",
              }}
            >
              {member.spotlightLabel}
            </div>
          </div>
        ) : (
          <div className="relative z-[1] mt-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] font-semibold text-white/70">
              Priorité de visibilité activée ✅
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Badge: React.FC<{
  label: string;
  style: React.CSSProperties;
  ariaLabel?: string;
}> = ({ label, style, ariaLabel }) => (
  <span
    className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black"
    style={style}
    aria-label={ariaLabel}
  >
    {label}
  </span>
);

/* TV Icon with blinking red dot INSIDE */
const TVLiveIcon: React.FC = () => {
  return (
    <span className="tv-ico" aria-hidden="true">
      <span className="tv-emoji">📺</span>
      <span className="tv-dot" />
    </span>
  );
};

const css = `
.pr-glow-rose{
  background: radial-gradient(circle, rgba(232,162,182,0.14), transparent 72%);
}
.pr-glow-gold{
  background: radial-gradient(circle, rgba(215,178,124,0.12), transparent 72%);
}
.pr-mini-rose{
  background: radial-gradient(circle, rgba(232,162,182,0.12), transparent 72%);
}
.pr-mini-gold{
  background: radial-gradient(circle, rgba(215,178,124,0.10), transparent 72%);
}

.no-scrollbar::-webkit-scrollbar{ display: none; }
.no-scrollbar{ scrollbar-width: none; -ms-overflow-style: none; }

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
  width: 6px;
  height: 6px;
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
`;
