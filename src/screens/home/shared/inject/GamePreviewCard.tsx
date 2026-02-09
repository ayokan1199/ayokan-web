// src/home/game/GamePreviewCard.tsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export type GamePreviewStats = {
  sparklesReward?: number; // Étincelles gagnables
  activePlayers?: number;
  dailyMissions?: number;
  streakDays?: number;
};

type GamePreviewCardProps = {
  title?: string;
  subtitle?: string;

  stats?: GamePreviewStats;

  featuredChallenges?: Array<{
    id: string;
    title: string;
    rewardSparkles: number;
    difficulty?: "easy" | "medium" | "hard";
  }>;

  onPlayNow?: () => void;
  onOpenGame?: () => void;
  className?: string;
};

const GamePreviewCard: React.FC<GamePreviewCardProps> = ({
  title = "🎮 Joue et gagne des Étincelles",
  subtitle = "Défis rapides, récompenses instantanées. Monte en visibilité en jouant.",
  stats,
  featuredChallenges,
  onPlayNow,
  onOpenGame,
  className,
}) => {
  const navigate = useNavigate();

  const safeStats = useMemo(() => {
    return {
      sparklesReward: clampInt(stats?.sparklesReward),
      activePlayers: clampInt(stats?.activePlayers),
      dailyMissions: clampInt(stats?.dailyMissions),
      streakDays: clampInt(stats?.streakDays),
    };
  }, [stats]);

  const challenges =
    featuredChallenges?.slice(0, 3) ??
    [
      { id: "c1", title: "Défi du jour: 3 likes", rewardSparkles: 40, difficulty: "easy" },
      { id: "c2", title: "Regarde 2 LIVE", rewardSparkles: 60, difficulty: "medium" },
      { id: "c3", title: "Invite 1 ami", rewardSparkles: 120, difficulty: "hard" },
    ];

  const play = () => {
    if (onPlayNow) return onPlayNow();
    navigate("/game");
  };

  const open = () => {
    if (onOpenGame) return onOpenGame();
    navigate("/game");
  };

  return (
    <section className={["mt-6", className ?? ""].join(" ")} aria-label="Game preview">
      <style>{css}</style>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
        {/* glows */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full blur-3xl game-glow-rose" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-[360px] w-[360px] rounded-full blur-3xl game-glow-gold" />

        {/* shimmer */}
        <div className="pointer-events-none absolute inset-0 game-sheen opacity-[0.18]" />

        <div className="relative z-[1] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-black text-white/92">{title}</h2>
              <span className="rounded-full border border-white/10 bg-black/25 px-2 py-0.5 text-[10px] font-black text-white/80">
                Boost visibilité
              </span>
            </div>
            <p className="mt-1 text-sm font-semibold text-white/65">{subtitle}</p>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <StatPill
                label="Étincelles"
                value={safeStats.sparklesReward ? `+${safeStats.sparklesReward}` : "—"}
                hint="Récompense"
                icon="✨"
              />
              <StatPill
                label="Joueurs"
                value={safeStats.activePlayers ? `${safeStats.activePlayers}` : "—"}
                hint="Actifs"
                icon="🧑‍🤝‍🧑"
              />
              <StatPill
                label="Missions"
                value={safeStats.dailyMissions ? `${safeStats.dailyMissions}` : "—"}
                hint="Aujourd’hui"
                icon="🎯"
              />
              <StatPill
                label="Streak"
                value={safeStats.streakDays ? `${safeStats.streakDays}j` : "—"}
                hint="Série"
                icon="🔥"
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 md:w-[320px]">
            <button
              type="button"
              onClick={play}
              className="rounded-2xl px-4 py-3 text-sm font-black text-[#120A12] active:scale-[0.99]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
              }}
            >
              Jouer maintenant
            </button>

            <button
              type="button"
              onClick={open}
              className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-xs font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
            >
              Voir tous les jeux
            </button>

            <div className="text-[11px] font-semibold text-white/55">
              Astuce: plus tu joues, plus ton profil est recommandé.
            </div>
          </div>
        </div>

        {/* challenges */}
        <div className="relative z-[1] mt-5">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-black text-white/85">Défis recommandés</div>
            <button
              type="button"
              onClick={open}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-black text-white/80 hover:bg-white/10"
            >
              Tout voir
            </button>
          </div>

          <div className="grid gap-2 md:grid-cols-3">
            {challenges.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={open}
                className="group rounded-2xl border border-white/10 bg-black/25 p-4 text-left transition hover:bg-white/7 active:scale-[0.99]"
                aria-label={`Ouvrir défi: ${c.title}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-black text-white/90 line-clamp-2">
                      {c.title}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-black text-white/75">
                        Récompense
                      </span>
                      <span className="text-[12px] font-black text-white/85">
                        +{c.rewardSparkles} ✨
                      </span>
                    </div>
                  </div>

                  <DifficultyPill difficulty={c.difficulty} />
                </div>

                <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[38%] rounded-full game-progress" />
                </div>

                <div className="mt-2 text-[11px] font-semibold text-white/55">
                  Clique pour participer
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamePreviewCard;

/* ---------------------------------- */

const StatPill: React.FC<{
  label: string;
  value: string;
  hint: string;
  icon: string;
}> = ({ label, value, hint, icon }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="text-[11px] font-black text-white/70">{label}</div>
        <div className="text-[12px]" aria-hidden="true">
          {icon}
        </div>
      </div>
      <div className="mt-1 text-base font-black text-white/92">{value}</div>
      <div className="mt-0.5 text-[10px] font-semibold text-white/50">{hint}</div>
    </div>
  );
};

const DifficultyPill: React.FC<{ difficulty?: "easy" | "medium" | "hard" }> = ({
  difficulty,
}) => {
  const meta = getDifficultyMeta(difficulty);
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-full px-2 py-1 text-[10px] font-black"
      style={meta.style}
      aria-label={`Difficulté: ${meta.label}`}
    >
      {meta.label}
    </span>
  );
};

function getDifficultyMeta(d?: "easy" | "medium" | "hard") {
  if (d === "hard") {
    return {
      label: "Hard",
      style: {
        background: "rgba(255,59,59,0.12)",
        border: "1px solid rgba(255,59,59,0.20)",
        color: "rgba(255,220,220,0.92)",
      } as React.CSSProperties,
    };
  }
  if (d === "medium") {
    return {
      label: "Medium",
      style: {
        background: "rgba(215,178,124,0.16)",
        border: "1px solid rgba(215,178,124,0.22)",
        color: "rgba(255,230,190,0.92)",
      } as React.CSSProperties,
    };
  }
  return {
    label: "Easy",
    style: {
      background: "rgba(34,197,94,0.12)",
      border: "1px solid rgba(34,197,94,0.20)",
      color: "rgba(210,255,225,0.92)",
    } as React.CSSProperties,
  };
}

function clampInt(v: unknown) {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.floor(n));
}

const css = `
.game-glow-rose{
  background: radial-gradient(circle, rgba(232,162,182,0.14), transparent 72%);
}
.game-glow-gold{
  background: radial-gradient(circle, rgba(215,178,124,0.12), transparent 72%);
}

.game-progress{
  background: linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1));
  box-shadow: 0 12px 30px rgba(232,162,182,0.12);
}

.game-sheen{
  background: linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.22) 18%, transparent 36%);
  transform: translateX(-55%) skewX(-12deg);
  animation: aykGameSheen 6.8s ease-in-out infinite;
}

@keyframes aykGameSheen{
  0% { transform: translateX(-60%) skewX(-12deg); opacity: 0.00; }
  12%{ opacity: 0.16; }
  44%{ transform: translateX(130%) skewX(-12deg); opacity: 0.00; }
  100%{ transform: translateX(130%) skewX(-12deg); opacity: 0.00; }
}

/* clamp without plugin requirement */
.line-clamp-2{
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`;
