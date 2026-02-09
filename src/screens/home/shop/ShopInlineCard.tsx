// src/home/shop/ShopInlineCard.tsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export type ShopInlineItem = {
  id: string;

  title: string;
  subtitle?: string;

  // visual
  imageUrl?: string;

  // pricing
  priceLabel?: string; // "4 900 FCFA"
  oldPriceLabel?: string; // "6 900 FCFA"

  // badges / tags
  badge?: string; // "VIP", "Gold", "Boost", "Hot"
  isVip?: boolean;
  isGold?: boolean;

  // routing
  actionPath?: string; // "/shop/product/.."
};

type ShopInlineCardProps = {
  title?: string;
  subtitle?: string;

  featured?: ShopInlineItem;
  items?: ShopInlineItem[];

  onOpen?: (itemId?: string) => void;
  className?: string;
};

const ShopInlineCard: React.FC<ShopInlineCardProps> = ({
  title = "🛍️ Shop",
  subtitle = "Produits populaires, boosts et abonnements. Tout est cliquable.",
  featured,
  items,
  onOpen,
  className,
}) => {
  const navigate = useNavigate();

  const all = useMemo(() => {
    const arr = (items ?? []).filter(Boolean);
    if (featured) return [featured, ...arr.filter((x) => x.id !== featured.id)];
    return arr;
  }, [featured, items]);

  const hero = all[0] ?? defaultFeatured;
  const rest = all.slice(1, 9);

  const open = (it?: ShopInlineItem) => {
    if (onOpen) return onOpen(it?.id);
    if (it?.actionPath) return navigate(it.actionPath);
    navigate("/shop");
  };

  return (
    <section className={["mt-6", className ?? ""].join(" ")} aria-label="Shop">
      <style>{css}</style>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
        {/* glows */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full blur-3xl shop-glow-rose" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-[360px] w-[360px] rounded-full blur-3xl shop-glow-gold" />

        <div className="relative z-[1] flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-black text-white/92">{title}</h2>
            <p className="mt-1 text-sm font-semibold text-white/65">{subtitle}</p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-xs font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
          >
            Voir le shop
          </button>
        </div>

        {/* Featured */}
        <div className="relative z-[1] mt-4 overflow-hidden rounded-3xl border border-white/10 bg-black/30">
          <div className="grid gap-0 md:grid-cols-[1.05fr,0.95fr]">
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-black text-white/75">
                  Produit du moment
                </span>

                {hero.isGold ? (
                  <Tag
                    label="💎 Gold"
                    style={{
                      background: "rgba(34,197,94,0.16)",
                      border: "1px solid rgba(34,197,94,0.24)",
                      color: "rgba(210,255,225,0.95)",
                    }}
                  />
                ) : null}

                {hero.isVip ? (
                  <Tag
                    label="VIP"
                    style={{
                      background: "rgba(215,178,124,0.18)",
                      border: "1px solid rgba(215,178,124,0.26)",
                      color: "rgba(255,230,190,0.92)",
                    }}
                  />
                ) : null}

                {hero.badge && !hero.isVip && !hero.isGold ? (
                  <Tag
                    label={hero.badge}
                    style={{
                      background: "rgba(232,162,182,0.16)",
                      border: "1px solid rgba(232,162,182,0.22)",
                      color: "rgba(255,235,245,0.92)",
                    }}
                  />
                ) : null}
              </div>

              <div className="mt-3 text-base font-black text-white/92">{hero.title}</div>

              {hero.subtitle ? (
                <div className="mt-2 text-sm font-semibold text-white/65">{hero.subtitle}</div>
              ) : null}

              {(hero.priceLabel || hero.oldPriceLabel) && (
                <div className="mt-4 flex items-end gap-3">
                  {hero.oldPriceLabel ? (
                    <span className="text-sm font-black text-white/45 line-through">
                      {hero.oldPriceLabel}
                    </span>
                  ) : null}
                  {hero.priceLabel ? (
                    <span className="text-lg font-black text-white/92">{hero.priceLabel}</span>
                  ) : null}
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                <Pill label="⚡ Activation instant" />
                <Pill label="🎁 Bonus inclus" />
                <Pill label="🔒 Paiement sécurisé" />
              </div>

              <button
                type="button"
                onClick={() => open(hero)}
                className="mt-5 w-full rounded-2xl px-4 py-3 text-sm font-black text-[#0B0B12] active:scale-[0.99]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
                }}
              >
                Acheter / Activer
              </button>
            </div>

            {/* visual */}
            <div className="relative min-h-[220px] overflow-hidden border-t border-white/10 md:border-l md:border-t-0">
              <div className="pointer-events-none absolute inset-0 shop-visual" />

              {hero.imageUrl ? (
                <img
                  src={hero.imageUrl}
                  alt={hero.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-90"
                  loading="lazy"
                />
              ) : (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="shop-bubble text-5xl">🛍️</div>
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 shop-visual-overlay" />

              <div className="relative z-[1] flex h-full flex-col justify-between p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] font-black text-white/90">
                    Shop
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] font-black text-white/90">
                    Premium
                  </span>
                </div>

                <div className="mt-8">
                  <div className="text-sm font-black text-white/92">Boosts & abonnements</div>
                  <div className="mt-1 text-[12px] font-semibold text-white/70">
                    Plus de visibilité, plus d’accès, plus d’étincelles.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => open(hero)}
                  className="mt-4 rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
                >
                  Voir détails
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* strip */}
        {rest.length > 0 ? (
          <div className="relative z-[1] mt-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-black text-white/85">Populaires</div>
              <button
                type="button"
                onClick={() => navigate("/shop")}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-black text-white/80 hover:bg-white/10"
              >
                Tout voir
              </button>
            </div>

            <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
              {rest.map((it) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => open(it)}
                  className="w-[240px] shrink-0 rounded-3xl border border-white/10 bg-black/25 p-4 text-left hover:bg-white/7 active:scale-[0.99]"
                  aria-label={`Ouvrir produit: ${it.title}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-black text-white/90 line-clamp-2">{it.title}</div>
                      {it.subtitle ? (
                        <div className="mt-2 text-[12px] font-semibold text-white/60 line-clamp-2">
                          {it.subtitle}
                        </div>
                      ) : (
                        <div className="mt-2 text-[12px] font-semibold text-white/55">Produit premium</div>
                      )}

                      <div className="mt-3 flex flex-wrap gap-2">
                        {it.isGold ? (
                          <Tag
                            label="💎 Gold"
                            style={{
                              background: "rgba(34,197,94,0.16)",
                              border: "1px solid rgba(34,197,94,0.24)",
                              color: "rgba(210,255,225,0.95)",
                            }}
                          />
                        ) : null}
                        {it.isVip ? (
                          <Tag
                            label="VIP"
                            style={{
                              background: "rgba(215,178,124,0.18)",
                              border: "1px solid rgba(215,178,124,0.26)",
                              color: "rgba(255,230,190,0.92)",
                            }}
                          />
                        ) : null}
                        {it.badge && !it.isVip && !it.isGold ? (
                          <Tag
                            label={it.badge}
                            style={{
                              background: "rgba(232,162,182,0.16)",
                              border: "1px solid rgba(232,162,182,0.22)",
                              color: "rgba(255,235,245,0.92)",
                            }}
                          />
                        ) : null}
                      </div>
                    </div>

                    <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                      {it.imageUrl ? (
                        <img
                          src={it.imageUrl}
                          alt={it.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xl">✨</div>
                      )}
                    </div>
                  </div>

                  {(it.priceLabel || it.oldPriceLabel) && (
                    <div className="mt-4 flex items-end gap-2">
                      {it.oldPriceLabel ? (
                        <span className="text-[12px] font-black text-white/45 line-through">
                          {it.oldPriceLabel}
                        </span>
                      ) : null}
                      {it.priceLabel ? (
                        <span className="text-[14px] font-black text-white/92">{it.priceLabel}</span>
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

export default ShopInlineCard;

/* ---------------------------------- */

const Pill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black text-white/80">
    {label}
  </span>
);

const Tag: React.FC<{ label: string; style: React.CSSProperties }> = ({ label, style }) => (
  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black" style={style}>
    {label}
  </span>
);

const defaultFeatured: ShopInlineItem = {
  id: "vip-subscription",
  title: "Abonnement VIP (mensuel)",
  subtitle: "Priorité feed, visibilité boostée, accès features premium.",
  badge: "VIP",
  isVip: true,
  priceLabel: "4 900 FCFA",
  oldPriceLabel: "6 900 FCFA",
  actionPath: "/shop",
};

const css = `
.shop-glow-rose{
  background: radial-gradient(circle, rgba(232,162,182,0.14), transparent 72%);
}
.shop-glow-gold{
  background: radial-gradient(circle, rgba(215,178,124,0.12), transparent 72%);
}

.shop-visual{
  background:
    radial-gradient(520px 240px at 20% 20%, rgba(232,162,182,0.18), transparent 62%),
    radial-gradient(520px 260px at 80% 22%, rgba(215,178,124,0.12), transparent 62%),
    linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%);
}
.shop-visual-overlay{
  background:
    radial-gradient(140px 140px at 30% 38%, rgba(255,255,255,0.16), transparent 60%),
    radial-gradient(160px 160px at 68% 42%, rgba(255,255,255,0.10), transparent 62%),
    linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.10) 18%, transparent 36%);
  mix-blend-mode: screen;
  opacity: 0.55;
}

.shop-bubble{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  border-radius: 32px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  box-shadow: 0 18px 60px rgba(0,0,0,0.45);
  animation: aykFloat 3.2s ease-in-out infinite;
}
@keyframes aykFloat{
  0% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(0px); }
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
