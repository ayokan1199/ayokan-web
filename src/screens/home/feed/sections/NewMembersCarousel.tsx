// src/home/recommendations/NewMembersCarousel.tsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export type NewMember = {
  id: string;
  name: string;
  username?: string;
  avatarUrl: string;

  city?: string;

  // badges
  isVip?: boolean;
  isGold?: boolean;

  // live indicator
  isLive?: boolean;

  // story ring
  hasStory?: boolean;
  storySeen?: boolean;
};

type NewMembersCarouselProps = {
  title?: string;
  subtitle?: string;

  members: NewMember[];

  onOpenProfile?: (id: string) => void;
  onSayHello?: (id: string) => void;
  onOpenStory?: (id: string) => void;

  className?: string;
};

const NewMembersCarousel: React.FC<NewMembersCarouselProps> = ({
  title = "🆕 Nouveaux sur Ayokan",
  subtitle = "Dis bonjour 👋 et lance une conversation.",
  members,
  onOpenProfile,
  onSayHello,
  onOpenStory,
  className,
}) => {
  const navigate = useNavigate();

  const items = useMemo(
    () => (members ?? []).filter(Boolean).slice(0, 16),
    [members]
  );

  const openProfile = (id: string) => {
    if (onOpenProfile) return onOpenProfile(id);

    // ✅ Fallback compatible avec tes routes actuelles (pas de /profile/:id)
    navigate("/profile", { state: { userId: id } });
  };

  const sayHello = (id: string) => {
    if (onSayHello) return onSayHello(id);

    // ✅ Fallback safe (si tu n’as pas encore /messages)
    // On évite un 404 et on prépare l’info pour plus tard.
    navigate("/", { state: { openHelloTo: id } });
  };

  const openStory = (id: string) => {
    if (onOpenStory) return onOpenStory(id);
    openProfile(id);
  };

  if (items.length === 0) return null;

  return (
    <section
      className={["mt-6", className ?? ""].join(" ")}
      aria-label="Nouveaux membres"
    >
      <style>{css}</style>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
        {/* glows */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full blur-3xl nm-glow-rose" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-[360px] w-[360px] rounded-full blur-3xl nm-glow-gold" />

        <div className="relative z-[1] flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-black text-white/92">{title}</h2>
            <p className="mt-1 text-sm font-semibold text-white/65">
              {subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/", { state: { tab: "new" } })}
            className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-xs font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
          >
            Explorer
          </button>
        </div>

        <div className="relative z-[1] mt-4">
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
            {items.map((m) => (
              <MemberCard
                key={m.id}
                member={m}
                onOpenProfile={() => openProfile(m.id)}
                onHello={() => sayHello(m.id)}
                onOpenStory={() => openStory(m.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewMembersCarousel;

/* ---------------------------------- */

const MemberCard: React.FC<{
  member: NewMember;
  onOpenProfile: () => void;
  onHello: () => void;
  onOpenStory: () => void;
}> = ({ member, onOpenProfile, onHello, onOpenStory }) => {
  const openPrimary = () => {
    // ✅ Story prioritaire si non vue + dispo
    if (member.hasStory && !member.storySeen) return onOpenStory();
    return onOpenProfile();
  };

  return (
    <div className="w-[210px] shrink-0">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-4">
        {/* micro glows */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-[220px] w-[220px] rounded-full blur-3xl nm-mini-rose" />
        <div className="pointer-events-none absolute -right-16 -bottom-16 h-[240px] w-[240px] rounded-full blur-3xl nm-mini-gold" />

        <div className="relative z-[1] flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={openPrimary}
            className="flex items-center gap-3 text-left"
            aria-label={`Ouvrir ${member.hasStory ? "story/profil" : "profil"} de ${member.name}`}
          >
            <StoryAvatar
              src={member.avatarUrl}
              alt={member.name}
              hasStory={!!member.hasStory}
              seen={!!member.storySeen}
            />

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="truncate text-sm font-black text-white/92">
                  {member.name}
                </span>

                {/* ✅ GOLD = badge vert + diamant */}
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

                {/* VIP doré */}
                {member.isVip ? (
                  <Badge
                    label="VIP"
                    style={{
                      background: "rgba(215,178,124,0.18)",
                      border: "1px solid rgba(215,178,124,0.26)",
                      color: "rgba(255,230,190,0.92)",
                    }}
                    ariaLabel="Membre VIP"
                  />
                ) : null}

                {/* ✅ LIVE = rouge clignote DANS une TV 📺 */}
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
                    : "Nouveau membre"}
              </div>
            </div>
          </button>
        </div>

        <div className="relative z-[1] mt-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onOpenProfile}
            className="rounded-2xl border border-white/12 bg-white/5 px-3 py-2 text-xs font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
          >
            Voir profil
          </button>

          <button
            type="button"
            onClick={onHello}
            className="rounded-2xl px-3 py-2 text-xs font-black text-[#120A12] active:scale-[0.99]"
            style={{
              background:
                "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
              boxShadow: "0 14px 34px rgba(0,0,0,0.35)",
            }}
          >
            Dire bonjour 👋
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------- */
/* Story avatar: animation ring if hasStory && !seen */

const StoryAvatar: React.FC<{
  src: string;
  alt: string;
  hasStory: boolean;
  seen: boolean;
}> = ({ src, alt, hasStory, seen }) => {
  const ringClass =
    hasStory && !seen
      ? "nm-story-ring nm-story-ring-anim"
      : hasStory && seen
        ? "nm-story-ring nm-story-ring-seen"
        : "";

  return (
    <div className="relative">
      {hasStory ? (
        <div className={["absolute -inset-1 rounded-[18px]", ringClass].join(" ")} />
      ) : null}

      <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
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

/* ---------------------------------- */

const css = `
.nm-glow-rose{
  background: radial-gradient(circle, rgba(232,162,182,0.14), transparent 72%);
}
.nm-glow-gold{
  background: radial-gradient(circle, rgba(215,178,124,0.12), transparent 72%);
}
.nm-mini-rose{
  background: radial-gradient(circle, rgba(232,162,182,0.12), transparent 72%);
}
.nm-mini-gold{
  background: radial-gradient(circle, rgba(215,178,124,0.10), transparent 72%);
}

.no-scrollbar::-webkit-scrollbar{ display: none; }
.no-scrollbar{ scrollbar-width: none; -ms-overflow-style: none; }

/* ✅ Story ring (animated when not seen) */
.nm-story-ring{
  border: 1px solid rgba(255,255,255,0.10);
  background:
    conic-gradient(
      from 180deg,
      rgba(232,162,182,0.00),
      rgba(232,162,182,0.55),
      rgba(215,178,124,0.55),
      rgba(232,162,182,0.00)
    );
  filter: drop-shadow(0 10px 24px rgba(0,0,0,0.35));
  opacity: 0.95;
}
.nm-story-ring-seen{
  background: rgba(255,255,255,0.06);
  opacity: 0.75;
}
.nm-story-ring-anim{
  animation: aykStoryRing 2.8s linear infinite;
}
@keyframes aykStoryRing{
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ✅ TV + blink dot INSIDE */
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

/* clamp without plugin requirement */
.line-clamp-2{
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`;
