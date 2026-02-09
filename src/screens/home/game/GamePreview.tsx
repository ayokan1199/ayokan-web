// src/home/game/GamePreview.tsx
import React from "react";

export type GameChallenge = {
  id: string;
  title: string;
  rewardSparkles: number;
  difficulty: "Facile" | "Moyen" | "Difficile";
  tag?: string; // ex: "Nouveau", "Tendance"
};

type GamePreviewProps = {
  onPlay: () => void;
  onOpenChallenge: (id: string) => void;
  challenges: GameChallenge[];
};

const GamePreview: React.FC<GamePreviewProps> = ({
  onPlay,
  onOpenChallenge,
  challenges,
}) => {
  return (
    <section className="mt-6" aria-label="Game Preview">
      <style>{css}</style>

      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-white/90">🎮 Game & Défis</h2>
          <p className="text-sm font-semibold text-white/60">
            Joue, gagne des Étincelles, monte en visibilité.
          </p>
        </div>

        <button
          type="button"
          onClick={onPlay}
          className="rounded-2xl px-4 py-2 text-xs font-black text-[#120A12] active:scale-[0.99]"
          style={{
            background:
              "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
            boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
          }}
          aria-label="Jouer maintenant"
        >
          Jouer maintenant
        </button>
      </div>

      {/* Main hero card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
        {/* glows */}
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-[260px] w-[260px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(232,162,182,0.16), transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-24 -bottom-24 h-[280px] w-[280px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(215,178,124,0.14), transparent 70%)",
          }}
        />

        <div className="relative z-[1] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] font-black text-white/80">
              ⚡ Missions rapides
              <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
              récompenses instant
            </div>

            <h3 className="mt-3 text-xl font-black text-white/95">
              🎯 Défi du jour: “Match Express”
            </h3>

            <p className="mt-2 max-w-[700px] text-sm font-semibold text-white/70">
              Complète 3 interactions (like, message, follow) et débloque un boost
              de visibilité + Étincelles.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Pill label="💎 Bonus VIP" />
              <Pill label="🔥 Boost feed" />
              <Pill label="✨ Étincelles +120" />
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 md:w-[320px]">
            <button
              type="button"
              onClick={onPlay}
              className="rounded-2xl px-4 py-3 text-sm font-black text-[#120A12] active:scale-[0.99]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
              }}
            >
              ▶︎ Lancer le défi
            </button>

            <button
              type="button"
              onClick={() => onOpenChallenge("daily")}
              className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-black text-white/90 hover:bg-white/10"
            >
              Voir les règles
            </button>
          </div>
        </div>
      </div>

      {/* Challenges row */}
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0">
        {challenges.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onOpenChallenge(c.id)}
            className="group min-w-[280px] md:min-w-0"
            aria-label={`Ouvrir le défi ${c.title}`}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/7">
              <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
                <div className="glitter-layer" />
              </div>

              <div className="relative z-[1] flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-black text-white/90">
                      {c.title}
                    </span>
                    {c.tag ? (
                      <span className="shrink-0 rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] font-black text-white/80">
                        {c.tag}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-1 text-[12px] font-semibold text-white/60">
                    Difficulté:{" "}
                    <span className="font-black text-white/80">{c.difficulty}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-right">
                  <div className="text-[10px] font-black text-white/60">Récompense</div>
                  <div className="text-sm font-black text-white/90">
                    ✨ {c.rewardSparkles}
                  </div>
                </div>
              </div>

              <div className="relative z-[1] mt-3 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-white/55">
                  Clique pour jouer
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-black text-white/80">
                  ▶︎ Start
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default GamePreview;

/* ---------------------------------- */

const Pill: React.FC<{ label: string }> = ({ label }) => {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black text-white/80">
      {label}
    </span>
  );
};

const css = `
.glitter-layer{
  width: 140%;
  height: 140%;
  background: linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.35) 18%, transparent 36%);
  transform: translateX(-40%) skewX(-12deg);
  animation: aykGameSheen 4.8s ease-in-out infinite;
  filter: blur(0.2px);
}
@keyframes aykGameSheen{
  0% { transform: translateX(-55%) skewX(-12deg); opacity: 0.00; }
  16%{ opacity: 0.12; }
  44%{ transform: translateX(130%) skewX(-12deg); opacity: 0.00; }
  100%{ transform: translateX(130%) skewX(-12deg); opacity: 0.00; }
}
`;
