// src/home/magic-cooler/MagicCoolerInline.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export type MagicCoolerOffer = {
  id: string;
  title: string;
  subtitle?: string;

  // ex: "VIP -30%" / "2x Étincelles" / "Plan Cul Boost"
  badge?: string;

  // ex: "Aujourd’hui seulement" / "Expire dans 2h"
  urgency?: string;

  // optional visuals
  imageUrl?: string;

  // optional pricing
  priceLabel?: string; // ex: "4 900 FCFA"
  oldPriceLabel?: string; // ex: "9 900 FCFA"

  // for click routing
  actionPath?: string; // ex: "/shop/offers/xxx" or "/magic-cooler"
};

type MagicCoolerInlineProps = {
  offer?: MagicCoolerOffer;
  offers?: MagicCoolerOffer[]; // if provided, inline shows 1 featured + strip of others
  onOpen?: (offerId?: string) => void;
  className?: string;
};

const MagicCoolerInline: React.FC<MagicCoolerInlineProps> = ({
  offer,
  offers,
  onOpen,
  className,
}) => {
  const navigate = useNavigate();

  const all = useMemo(() => {
    const arr = (offers ?? []).filter(Boolean);
    if (offer) return [offer, ...arr.filter((o) => o.id !== offer.id)];
    return arr;
  }, [offer, offers]);

  const featured = all[0] ?? defaultOffer;
  const rest = all.slice(1, 9);

  const [shake, setShake] = useState(false);

  const open = (o?: MagicCoolerOffer) => {
    if (onOpen) return onOpen(o?.id);
    if (o?.actionPath) return navigate(o.actionPath);
    navigate("/magic-cooler");
  };

  const onOpenFeatured = () => {
    setShake(true);
    window.setTimeout(() => setShake(false), 650);
    open(featured);
  };

  return (
    <section className={["mt-6", className ?? ""].join(" ")} aria-label="Glacière magique">
      <style>{css}</style>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
        {/* cold glows */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-[340px] w-[340px] rounded-full blur-3xl cooler-glow-ice" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-[380px] w-[380px] rounded-full blur-3xl cooler-glow-rose" />

        {/* frosty sheen */}
        <div className="pointer-events-none absolute inset-0 cooler-frost opacity-[0.14]" />

        <div className="relative z-[1] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-black text-white/92">❄️ Glacière Magique</h2>
              <span className="rounded-full border border-white/10 bg-black/25 px-2 py-0.5 text-[10px] font-black text-white/80">
                Offres exclusives
              </span>
              {featured.urgency ? (
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-black"
                  style={{
                    background: "rgba(255,59,59,0.10)",
                    border: "1px solid rgba(255,59,59,0.18)",
                    color: "rgba(255,220,220,0.92)",
                  }}
                >
                  ⏳ {featured.urgency}
                </span>
              ) : null}
            </div>

            <p className="mt-1 text-sm font-semibold text-white/65">
              Ouvre la glacière: promos, boosts, cadeaux. Ça tombe et ça fond vite.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenFeatured}
            className={[
              "group relative w-full rounded-2xl px-4 py-3 text-sm font-black text-[#0B0B12] active:scale-[0.99] md:w-[320px]",
              shake ? "cooler-shake" : "",
            ].join(" ")}
            style={{
              background:
                "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
              boxShadow: "0 16px 44px rgba(0,0,0,0.38)",
            }}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <span className="cooler-ice" aria-hidden="true">
                🧊
              </span>
              Ouvrir ❄️
            </span>

            <span className="pointer-events-none absolute inset-0 rounded-2xl cooler-sheen" />
          </button>
        </div>

        {/* featured offer card */}
        <div className="relative z-[1] mt-4 overflow-hidden rounded-3xl border border-white/10 bg-black/30">
          <div className="grid gap-0 md:grid-cols-[1.05fr,0.95fr]">
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                {featured.badge ? (
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-black"
                    style={{
                      background: "rgba(34,197,94,0.12)",
                      border: "1px solid rgba(34,197,94,0.18)",
                      color: "rgba(210,255,225,0.92)",
                    }}
                  >
                    {featured.badge}
                  </span>
                ) : null}

                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-black text-white/75">
                  Offre du jour
                </span>
              </div>

              <div className="mt-3 text-base font-black text-white/92">
                {featured.title}
              </div>

              {featured.subtitle ? (
                <div className="mt-2 text-sm font-semibold text-white/65">
                  {featured.subtitle}
                </div>
              ) : null}

              {(featured.priceLabel || featured.oldPriceLabel) && (
                <div className="mt-4 flex items-end gap-3">
                  {featured.oldPriceLabel ? (
                    <span className="text-sm font-black text-white/45 line-through">
                      {featured.oldPriceLabel}
                    </span>
                  ) : null}
                  {featured.priceLabel ? (
                    <span className="text-lg font-black text-white/92">
                      {featured.priceLabel}
                    </span>
                  ) : null}
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                <Pill label="✨ Boost visibilité" />
                <Pill label="🎁 Bonus surprises" />
                <Pill label="⚡ Activation instant" />
              </div>

              <button
                type="button"
                onClick={() => open(featured)}
                className="mt-5 w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-xs font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
              >
                Voir l’offre
              </button>
            </div>

            {/* right visual */}
            <div className="relative min-h-[220px] overflow-hidden border-t border-white/10 md:border-l md:border-t-0">
              <div className="pointer-events-none absolute inset-0 cooler-visual" />

              {featured.imageUrl ? (
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-90"
                  loading="lazy"
                />
              ) : null}

              {/* frosty overlay */}
              <div className="pointer-events-none absolute inset-0 cooler-visual-overlay" />

              <div className="relative z-[1] flex h-full flex-col justify-between p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] font-black text-white/90">
                    ❄️ Glacière
                  </span>

                  <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] font-black text-white/90">
                    🧊 Premium
                  </span>
                </div>

                <div className="mt-8">
                  <div className="text-sm font-black text-white/92">
                    Ouvre. Profite. Recommence.
                  </div>
                  <div className="mt-1 text-[12px] font-semibold text-white/70">
                    Les offres tournent, certaines disparaissent sans prévenir.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenFeatured}
                  className="mt-4 rounded-2xl px-4 py-3 text-sm font-black text-[#0B0B12] active:scale-[0.99]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
                  }}
                >
                  Ouvrir maintenant
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* other offers strip */}
        {rest.length > 0 ? (
          <div className="relative z-[1] mt-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-black text-white/85">Autres offres</div>
              <button
                type="button"
                onClick={() => navigate("/magic-cooler")}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-black text-white/80 hover:bg-white/10"
              >
                Tout voir
              </button>
            </div>

            <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
              {rest.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => open(o)}
                  className="w-[240px] shrink-0 rounded-3xl border border-white/10 bg-black/25 p-4 text-left hover:bg-white/7 active:scale-[0.99]"
                  aria-label={`Ouvrir offre: ${o.title}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-black text-white/90 line-clamp-2">
                        {o.title}
                      </div>
                      {o.subtitle ? (
                        <div className="mt-2 text-[12px] font-semibold text-white/60 line-clamp-2">
                          {o.subtitle}
                        </div>
                      ) : (
                        <div className="mt-2 text-[12px] font-semibold text-white/55">
                          Offre exclusive
                        </div>
                      )}

                      <div className="mt-3 flex flex-wrap gap-2">
                        {o.badge ? (
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-black"
                            style={{
                              background: "rgba(34,197,94,0.12)",
                              border: "1px solid rgba(34,197,94,0.18)",
                              color: "rgba(210,255,225,0.92)",
                            }}
                          >
                            {o.badge}
                          </span>
                        ) : null}
                        {o.urgency ? (
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-black"
                            style={{
                              background: "rgba(255,59,59,0.10)",
                              border: "1px solid rgba(255,59,59,0.18)",
                              color: "rgba(255,220,220,0.92)",
                            }}
                          >
                            ⏳ {o.urgency}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg">
                      ❄️
                    </div>
                  </div>

                  {(o.priceLabel || o.oldPriceLabel) && (
                    <div className="mt-4 flex items-end gap-2">
                      {o.oldPriceLabel ? (
                        <span className="text-[12px] font-black text-white/45 line-through">
                          {o.oldPriceLabel}
                        </span>
                      ) : null}
                      {o.priceLabel ? (
                        <span className="text-[14px] font-black text-white/92">
                          {o.priceLabel}
                        </span>
                      ) : null}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default MagicCoolerInline;

/* ---------------------------------- */

const Pill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black text-white/80">
    {label}
  </span>
);

const defaultOffer: MagicCoolerOffer = {
  id: "offer-of-day",
  title: "Offre exclusive aujourd’hui: VIP -30%",
  subtitle: "Passe VIP maintenant et gagne un boost de visibilité immédiat.",
  badge: "VIP Deal",
  urgency: "Aujourd’hui seulement",
  priceLabel: "4 900 FCFA",
  oldPriceLabel: "6 900 FCFA",
  actionPath: "/shop",
};

const css = `
.cooler-glow-ice{
  background: radial-gradient(circle, rgba(140,200,255,0.14), transparent 72%);
}
.cooler-glow-rose{
  background: radial-gradient(circle, rgba(232,162,182,0.12), transparent 72%);
}

.cooler-frost{
  background:
    radial-gradient(520px 220px at 18% 18%, rgba(255,255,255,0.20), transparent 60%),
    radial-gradient(520px 240px at 82% 20%, rgba(140,200,255,0.14), transparent 62%),
    linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.16) 18%, transparent 36%);
  transform: translateX(-55%) skewX(-12deg);
  animation: aykCoolerFrost 7.2s ease-in-out infinite;
}

@keyframes aykCoolerFrost{
  0% { transform: translateX(-60%) skewX(-12deg); opacity: 0.00; }
  10%{ opacity: 0.14; }
  46%{ transform: translateX(130%) skewX(-12deg); opacity: 0.00; }
  100%{ transform: translateX(130%) skewX(-12deg); opacity: 0.00; }
}

.cooler-sheen{
  background: linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.22) 18%, transparent 36%);
  transform: translateX(-55%) skewX(-12deg);
  opacity: 0;
  transition: opacity 200ms ease;
}
button:hover .cooler-sheen{ opacity: 0.16; }

.cooler-ice{
  display: inline-flex;
  animation: aykIceFloat 2.6s ease-in-out infinite;
}
@keyframes aykIceFloat{
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(-2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

.cooler-shake{
  animation: aykCoolerShake 0.65s ease-in-out;
}
@keyframes aykCoolerShake{
  0%{ transform: translateX(0); }
  14%{ transform: translateX(-3px) rotate(-0.5deg); }
  30%{ transform: translateX(4px) rotate(0.6deg); }
  46%{ transform: translateX(-3px) rotate(-0.4deg); }
  62%{ transform: translateX(3px) rotate(0.4deg); }
  78%{ transform: translateX(-2px) rotate(-0.3deg); }
  100%{ transform: translateX(0) rotate(0deg); }
}

.cooler-visual{
  background:
    radial-gradient(520px 240px at 20% 20%, rgba(140,200,255,0.18), transparent 62%),
    radial-gradient(520px 260px at 80% 20%, rgba(232,162,182,0.14), transparent 62%),
    linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%);
}
.cooler-visual-overlay{
  background:
    radial-gradient(120px 120px at 30% 38%, rgba(255,255,255,0.18), transparent 60%),
    radial-gradient(140px 140px at 68% 42%, rgba(255,255,255,0.10), transparent 62%);
  mix-blend-mode: screen;
  opacity: 0.6;
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
