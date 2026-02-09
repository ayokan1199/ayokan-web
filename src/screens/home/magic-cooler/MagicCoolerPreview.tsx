// src/home/magic-cooler/MagicCoolerPreview.tsx
import React from "react";

export type MagicOffer = {
  id: string;
  title: string; // ex: "Boost visibilité x2 (30 min)"
  subtitle?: string; // ex: "Offre limitée aujourd’hui"
  priceLabel?: string; // ex: "2 900 FCFA"
  tag?: "EXCLU" | "VIP" | "GOLD" | "FLASH";
};

type MagicCoolerPreviewProps = {
  offerOfDay: MagicOffer;
  miniOffers?: MagicOffer[];
  onOpenCooler: () => void;
  onOpenOffer?: (offerId: string) => void;
};

const MagicCoolerPreview: React.FC<MagicCoolerPreviewProps> = ({
  offerOfDay,
  miniOffers = [],
  onOpenCooler,
  onOpenOffer,
}) => {
  return (
    <section className="mt-6" aria-label="Glacière Magique">
      <style>{css}</style>

      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-white/90">❄️ Glacière Magique</h2>
          <p className="text-sm font-semibold text-white/60">
            Offres exclusives aujourd’hui. Conversion naturelle, sans forcer.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCooler}
          className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-white/80 hover:bg-white/10"
        >
          Ouvrir ❄️
        </button>
      </div>

      {/* Main cooler card */}
      <button
        type="button"
        onClick={onOpenCooler}
        className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 text-left hover:bg-white/7"
        aria-label="Ouvrir la Glacière Magique"
      >
        {/* glows */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-[300px] w-[300px] rounded-full blur-3xl cooler-glow-rose" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-[320px] w-[320px] rounded-full blur-3xl cooler-glow-gold" />

        {/* ice shimmer */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
          <div className="cooler-ice-sheen" />
        </div>

        <div className="relative z-[1] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left: icon + content */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="cooler-orbit absolute -inset-2 rounded-3xl" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-black/30 text-3xl">
                ❄️
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-black text-white/90">
                  Offre du jour
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                <span className="text-xs font-semibold text-white/60">
                  limitée
                </span>

                {offerOfDay.tag ? (
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black"
                    style={tagStyle(offerOfDay.tag)}
                  >
                    {tagEmoji(offerOfDay.tag)} {offerOfDay.tag}
                  </span>
                ) : null}
              </div>

              <h3 className="mt-2 truncate text-xl font-black text-white/95">
                {offerOfDay.title}
              </h3>

              {offerOfDay.subtitle ? (
                <p className="mt-1 text-sm font-semibold text-white/70">
                  {offerOfDay.subtitle}
                </p>
              ) : (
                <p className="mt-1 text-sm font-semibold text-white/70">
                  Débloque une surprise premium: boost, étincelles, visibilité.
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                <Pill label="🧊 Surprise" />
                <Pill label="✨ Étincelles" />
                <Pill label="🔥 Boost" />
              </div>
            </div>
          </div>

          {/* Right: price + CTA */}
          <div className="flex w-full flex-col gap-2 md:w-[320px]">
            <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
              <div className="text-[10px] font-black text-white/55">Prix</div>
              <div className="text-lg font-black text-white/90">
                {offerOfDay.priceLabel ?? "Offre spéciale"}
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenCooler();
              }}
              className="rounded-2xl px-4 py-3 text-sm font-black text-[#120A12] active:scale-[0.99]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
              }}
            >
              Ouvrir ❄️
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenOffer) onOpenOffer(offerOfDay.id);
                else onOpenCooler();
              }}
              className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-black text-white/90 hover:bg-white/10"
            >
              Voir le détail
            </button>
          </div>
        </div>

        {/* Mini offers row */}
        {miniOffers.length > 0 ? (
          <div className="relative z-[1] mt-4">
            <div className="mb-2 text-xs font-black text-white/70">
              Autres offres
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0">
              {miniOffers.slice(0, 6).map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenOffer) onOpenOffer(o.id);
                    else onOpenCooler();
                  }}
                  className="min-w-[260px] md:min-w-0"
                  aria-label={`Ouvrir offre ${o.title}`}
                >
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-4 transition hover:bg-white/7">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-black text-white/90">
                          {o.title}
                        </div>
                        <div className="mt-1 text-[12px] font-semibold text-white/60">
                          {o.subtitle ?? "Offre limitée"}
                        </div>
                      </div>

                      {o.tag ? (
                        <span
                          className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black"
                          style={tagStyle(o.tag)}
                        >
                          {tagEmoji(o.tag)} {o.tag}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[12px] font-black text-white/80">
                        {o.priceLabel ?? "Voir"}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-black text-white/80">
                        Ouvrir
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </button>

      {/* footer disclaimer */}
      <div className="mt-3 text-xs font-semibold text-white/55">
        🔞 Contenu +18. Signaler un abus. Les offres n’interrompent jamais l’expérience.
      </div>
    </section>
  );
};

export default MagicCoolerPreview;

/* ---------------------------------- */

const Pill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black text-white/80">
    {label}
  </span>
);

function tagEmoji(tag: MagicOffer["tag"]) {
  switch (tag) {
    case "FLASH":
      return "⚡";
    case "EXCLU":
      return "🧊";
    case "VIP":
      return "⭐";
    case "GOLD":
      return "💚";
    default:
      return "✨";
  }
}

function tagStyle(tag: MagicOffer["tag"]): React.CSSProperties {
  if (tag === "VIP") {
    return {
      background: "rgba(215,178,124,0.18)",
      border: "1px solid rgba(215,178,124,0.26)",
      color: "rgba(255,230,190,0.92)",
    };
  }
  if (tag === "GOLD") {
    return {
      background: "rgba(34,197,94,0.16)",
      border: "1px solid rgba(34,197,94,0.24)",
      color: "rgba(210,255,225,0.95)",
    };
  }
  if (tag === "FLASH") {
    return {
      background: "rgba(255,59,59,0.14)",
      border: "1px solid rgba(255,59,59,0.22)",
      color: "rgba(255,210,210,0.92)",
    };
  }
  return {
    background: "rgba(232,162,182,0.14)",
    border: "1px solid rgba(232,162,182,0.20)",
    color: "rgba(255,235,245,0.92)",
  };
}

const css = `
.cooler-glow-rose{
  background: radial-gradient(circle, rgba(232,162,182,0.18), transparent 70%);
}
.cooler-glow-gold{
  background: radial-gradient(circle, rgba(215,178,124,0.16), transparent 70%);
}
.cooler-ice-sheen{
  width: 140%;
  height: 140%;
  background: linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.35) 18%, transparent 36%);
  transform: translateX(-55%) skewX(-12deg);
  animation: aykCoolerSheen 5.2s ease-in-out infinite;
  filter: blur(0.25px);
}
@keyframes aykCoolerSheen{
  0% { transform: translateX(-60%) skewX(-12deg); opacity: 0.00; }
  14%{ opacity: 0.16; }
  45%{ transform: translateX(130%) skewX(-12deg); opacity: 0.00; }
  100%{ transform: translateX(130%) skewX(-12deg); opacity: 0.00; }
}

/* orbit glace autour de l'icône */
.cooler-orbit{
  background: conic-gradient(
    from 180deg,
    rgba(232,162,182,0.00),
    rgba(232,162,182,0.40),
    rgba(215,178,124,0.40),
    rgba(232,162,182,0.00)
  );
  filter: blur(0.2px);
  animation: aykOrbit 3.6s linear infinite;
}
@keyframes aykOrbit{
  from { transform: rotate(0deg); opacity: 0.85; }
  to   { transform: rotate(360deg); opacity: 0.85; }
}
`;
