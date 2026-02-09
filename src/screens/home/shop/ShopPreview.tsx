// src/home/shop/ShopPreview.tsx
import React from "react";

export type ShopItem = {
  id: string;
  title: string;
  priceLabel: string; // ex: "4 900 FCFA", "€9.99"
  imageUrl: string;
  tag?: "Populaire" | "VIP" | "Gold" | "Nouveau";
};

type ShopPreviewProps = {
  items: ShopItem[];
  onOpenShop: () => void;
  onOpenItem: (id: string) => void;
  onBuyVip?: () => void;
  onBuyGold?: () => void;
};

const ShopPreview: React.FC<ShopPreviewProps> = ({
  items,
  onOpenShop,
  onOpenItem,
  onBuyVip,
  onBuyGold,
}) => {
  return (
    <section className="mt-6" aria-label="Shop Preview">
      <style>{css}</style>

      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-white/90">🛍️ Shop</h2>
          <p className="text-sm font-semibold text-white/60">
            Boost, cadeaux, abonnements. Rien d’agressif, tout est clean.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenShop}
          className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-white/80 hover:bg-white/10"
        >
          Voir le shop
        </button>
      </div>

      {/* Offers */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* VIP Offer */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
          <Glow left />
          <div className="relative z-[1]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] font-black text-white/80">
              ⭐ VIP
              <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
              visibilité + gifts
            </div>

            <h3 className="mt-3 text-xl font-black text-white/95">
              Pack VIP Premium
            </h3>
            <p className="mt-2 text-sm font-semibold text-white/70">
              Priorité feed, badge VIP doré, accès features premium.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Pill label="🔔 Priorité" />
              <Pill label="🎁 Gifts" />
              <Pill label="⭐ Badge VIP" />
            </div>

            <button
              type="button"
              onClick={onBuyVip ?? onOpenShop}
              className="mt-4 w-full rounded-2xl px-4 py-3 text-sm font-black text-[#120A12] active:scale-[0.99]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
              }}
            >
              Acheter VIP
            </button>
          </div>
        </div>

        {/* GOLD Offer */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
          <Glow />
          <div className="relative z-[1]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] font-black text-white/80">
              💚 GOLD
              <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
              boost discret
            </div>

            <h3 className="mt-3 text-xl font-black text-white/95">
              Pack Gold
            </h3>
            <p className="mt-2 text-sm font-semibold text-white/70">
              Badge Gold vert, mise en avant intelligente, plus de matchs.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Pill label="💚 Badge Gold" />
              <Pill label="🔥 Boost feed" />
              <Pill label="⚡ Étincelles" />
            </div>

            <button
              type="button"
              onClick={onBuyGold ?? onOpenShop}
              className="mt-4 w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
            >
              Acheter Gold
            </button>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="mt-4 flex items-center justify-between">
        <h3 className="text-sm font-black text-white/85">Produits populaires</h3>
        <button
          type="button"
          onClick={onOpenShop}
          className="text-xs font-black text-pink-300 hover:underline"
        >
          Tout voir
        </button>
      </div>

      <div className="mt-3 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:pb-0">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            onClick={() => onOpenItem(it.id)}
            className="group min-w-[220px] md:min-w-0"
            aria-label={`Ouvrir produit ${it.title}`}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 transition hover:bg-white/7">
              <div className="relative">
                <img
                  src={it.imageUrl}
                  alt={it.title}
                  className="h-[170px] w-full object-cover transition group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {it.tag ? (
                  <span
                    className="absolute left-3 top-3 rounded-full px-2 py-1 text-[10px] font-black"
                    style={tagStyle(it.tag)}
                  >
                    {tagEmoji(it.tag)} {it.tag}
                  </span>
                ) : null}
              </div>

              <div className="p-4">
                <div className="truncate text-sm font-black text-white/90">
                  {it.title}
                </div>
                <div className="mt-1 text-xs font-semibold text-white/60">
                  {it.priceLabel}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenItem(it.id);
                  }}
                  className="mt-3 w-full rounded-2xl px-4 py-2 text-xs font-black text-[#120A12] active:scale-[0.99]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                  }}
                >
                  Voir
                </button>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ShopPreview;

/* ---------------------------------- */

const Glow: React.FC<{ left?: boolean }> = ({ left }) => {
  return (
    <>
      <div
        className="pointer-events-none absolute -top-24 h-[260px] w-[260px] rounded-full blur-3xl"
        style={{
          left: left ? -90 : "auto",
          right: left ? "auto" : -90,
          background: left
            ? "radial-gradient(circle, rgba(232,162,182,0.14), transparent 72%)"
            : "radial-gradient(circle, rgba(215,178,124,0.12), transparent 72%)",
        }}
      />
    </>
  );
};

const Pill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black text-white/80">
    {label}
  </span>
);

function tagEmoji(tag: ShopItem["tag"]) {
  switch (tag) {
    case "Populaire":
      return "🔥";
    case "VIP":
      return "⭐";
    case "Gold":
      return "💚";
    case "Nouveau":
      return "🆕";
    default:
      return "✨";
  }
}

function tagStyle(tag: ShopItem["tag"]): React.CSSProperties {
  if (tag === "VIP") {
    return {
      background: "rgba(215,178,124,0.18)",
      border: "1px solid rgba(215,178,124,0.26)",
      color: "rgba(255,230,190,0.92)",
    };
  }
  if (tag === "Gold") {
    return {
      background: "rgba(34,197,94,0.16)",
      border: "1px solid rgba(34,197,94,0.24)",
      color: "rgba(210,255,225,0.95)",
    };
  }
  if (tag === "Populaire") {
    return {
      background: "rgba(170,90,255,0.16)",
      border: "1px solid rgba(170,90,255,0.22)",
      color: "rgba(235,220,255,0.92)",
    };
  }
  return {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.14)",
    color: "rgba(255,255,255,0.92)",
  };
}

const css = `
/* pas de CSS global requis */
`;
