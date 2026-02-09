// src/home/hero/HeroBanner.tsx
import React from "react";

type HeroBannerProps = {
  onGoLive: () => void;
  onSeeLiveNow: () => void;
};

const HeroBanner: React.FC<HeroBannerProps> = ({ onGoLive, onSeeLiveNow }) => {
  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5"
      aria-label="Hero"
    >
      {/* glows */}
      <div
        className="pointer-events-none absolute -left-20 -top-20 h-[240px] w-[240px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(232,162,182,0.18), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-24 -bottom-24 h-[260px] w-[260px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(215,178,124,0.16), transparent 70%)",
        }}
      />

      {/* grain shimmer */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.35) 18%, transparent 36%)",
            transform: "translateX(-30%)",
            animation: "aykHeroSheen 4.5s ease-in-out infinite",
          }}
        />
      </div>

      <style>{css}</style>

      <div className="relative z-[1] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-black text-white/80">
            🔥 Valeur immédiate
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            vibes premium
          </div>

          <h1 className="mt-3 text-2xl font-black leading-tight text-white/95 md:text-3xl">
            🔥 Passe en LIVE, rencontre et gagne des Étincelles
          </h1>

          <p className="mt-2 max-w-[680px] text-sm font-medium text-white/70">
            Clique, explore, et bascule vers LIVE, Plan Cul, Reels, Game, Shop ou
            Glacière Magique. Pas de détour.
          </p>

          {/* mini chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Chip label="LIVE 🔴" />
            <Chip label="Plan Cul ⭐" />
            <Chip label="Reels 🎥" />
            <Chip label="Game 🎮" />
            <Chip label="Shop 🛍️" />
            <Chip label="Glacière ❄️" />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-[330px]">
          <button
            type="button"
            onClick={onGoLive}
            className="rounded-2xl px-4 py-3 text-sm font-black text-[#120A12] transition-transform active:scale-[0.99]"
            style={{
              background:
                "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
              boxShadow: "0 18px 48px rgba(0,0,0,0.35)",
            }}
          >
            🔴 Passer en LIVE
          </button>

          <button
            type="button"
            onClick={onSeeLiveNow}
            className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-black text-white/90 hover:bg-white/10"
          >
            📺 LIVE en cours
          </button>

          <div className="mt-1 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-xs font-semibold text-white/70">
            Astuce: plus tu interagis, plus le feed devient précis.
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

/* ---------------------------- */

const Chip: React.FC<{ label: string }> = ({ label }) => {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black text-white/80">
      {label}
    </span>
  );
};

const css = `
@keyframes aykHeroSheen {
  0%   { transform: translateX(-40%) skewX(-12deg); opacity: 0.00; }
  18%  { opacity: 0.12; }
  45%  { transform: translateX(140%) skewX(-12deg); opacity: 0.00; }
  100% { transform: translateX(140%) skewX(-12deg); opacity: 0.00; }
}
`;
