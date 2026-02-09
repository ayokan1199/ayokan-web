// src/home/recommendations/Recommendations.tsx
import React from "react";

export type RecommendedUser = {
  id: string;
  name: string;
  age?: number;
  city?: string;
  distanceKm?: number;

  avatarUrl: string;
  bio?: string;

  isNew?: boolean;
  isPopular?: boolean;

  isVip?: boolean;
  isGold?: boolean;

  isLive?: boolean;
  matchScore?: number; // 0-100
};

type RecommendationsProps = {
  title?: string;
  subtitle?: string;

  users: RecommendedUser[];
  onOpenProfile: (userId: string) => void;
  onFollow?: (userId: string) => void;
  onSendGift?: (userId: string) => void;
  onSeeAll?: () => void;
};

const Recommendations: React.FC<RecommendationsProps> = ({
  title = "🤝 Recommandations",
  subtitle = "Pour toi, basé sur tes interactions, centres d’intérêt et zone (si autorisée).",
  users,
  onOpenProfile,
  onFollow,
  onSendGift,
  onSeeAll,
}) => {
  return (
    <section className="mt-6" aria-label="Recommandations">
      <style>{css}</style>

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

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
        {/* glows */}
        <div
          className="pointer-events-none absolute -left-28 -top-28 h-[300px] w-[300px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(232,162,182,0.14), transparent 72%)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-28 -bottom-28 h-[320px] w-[320px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(215,178,124,0.12), transparent 72%)",
          }}
        />

        {/* cards */}
        <div className="relative z-[1] flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 lg:grid-cols-4">
          {users.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => onOpenProfile(u.id)}
              className="group min-w-[250px] md:min-w-0 text-left"
              aria-label={`Ouvrir le profil recommandé de ${u.name}`}
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 transition hover:bg-white/7">
                {/* header media */}
                <div className="relative">
                  <img
                    src={u.avatarUrl}
                    alt={u.name}
                    className="h-[200px] w-full object-cover transition group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                  {/* top-left badges */}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    {u.isNew ? (
                      <Badge
                        label="🆕 Nouveau"
                        style={{
                          background: "rgba(255,255,255,0.12)",
                          border: "1px solid rgba(255,255,255,0.14)",
                          color: "rgba(255,255,255,0.92)",
                        }}
                      />
                    ) : null}

                    {u.isPopular ? (
                      <Badge
                        label="🔥 Populaire"
                        style={{
                          background: "rgba(170,90,255,0.16)",
                          border: "1px solid rgba(170,90,255,0.22)",
                          color: "rgba(235,220,255,0.92)",
                        }}
                      />
                    ) : null}

                    {u.isVip ? (
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

                  {/* top-right live tv */}
                  {u.isLive ? (
                    <div className="absolute right-3 top-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-2 py-1 text-[10px] font-black text-white/90">
                        <span className="tv-wrap" aria-hidden="true">
                          📺
                          <span className="tv-dot" />
                        </span>
                        LIVE
                      </span>
                    </div>
                  ) : null}

                  {/* bottom-left match score */}
                  {typeof u.matchScore === "number" ? (
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] font-black text-white/85">
                          Compatibilité
                        </span>
                        <span className="text-[11px] font-black text-white/85">
                          {Math.max(0, Math.min(100, Math.round(u.matchScore)))}%
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.max(
                              0,
                              Math.min(100, Math.round(u.matchScore))
                            )}%`,
                            background:
                              "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="truncate text-sm font-black text-white/92">
                          {u.name}
                          {typeof u.age === "number" ? `, ${u.age}` : ""}
                        </span>

                        {/* ✅ GOLD = diamant + badge vert à côté du nom */}
                        {u.isGold ? (
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black"
                            style={{
                              background: "rgba(34,197,94,0.16)",
                              border: "1px solid rgba(34,197,94,0.24)",
                              color: "rgba(210,255,225,0.95)",
                            }}
                          >
                            💎 Gold
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-1 text-[12px] font-semibold text-white/60">
                        {u.city ? <span>{u.city}</span> : <span>Proche de toi</span>}
                        {typeof u.distanceKm === "number" ? (
                          <span className="mx-2 text-white/35">•</span>
                        ) : null}
                        {typeof u.distanceKm === "number" ? (
                          <span>{u.distanceKm.toFixed(1)} km</span>
                        ) : null}
                      </div>

                      {u.bio ? (
                        <div className="mt-2 line-clamp-2 text-[12px] font-semibold text-white/65">
                          {u.bio}
                        </div>
                      ) : (
                        <div className="mt-2 text-[12px] font-semibold text-white/55">
                          Clique pour voir le profil.
                        </div>
                      )}
                    </div>

                    <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-black text-white/85">
                      Ouvrir
                    </span>
                  </div>

                  {/* actions */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onFollow) onFollow(u.id);
                        else onOpenProfile(u.id);
                      }}
                      className="rounded-2xl border border-white/12 bg-white/5 px-3 py-2 text-xs font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
                    >
                      Suivre
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSendGift) onSendGift(u.id);
                        else onOpenProfile(u.id);
                      }}
                      className="rounded-2xl px-3 py-2 text-xs font-black text-[#120A12] active:scale-[0.99]"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                      }}
                    >
                      🔥 Gift
                    </button>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* footer */}
        <div className="relative z-[1] mt-4 text-xs font-semibold text-white/55">
          🔐 Sécurité: contenu +18. Signaler un abus à tout moment.
        </div>
      </div>
    </section>
  );
};

export default Recommendations;

/* ---------------------------------- */

const Badge: React.FC<{ label: string; style: React.CSSProperties }> = ({
  label,
  style,
}) => {
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-1 text-[10px] font-black"
      style={style}
    >
      {label}
    </span>
  );
};

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
