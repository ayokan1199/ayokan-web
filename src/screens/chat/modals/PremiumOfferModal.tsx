// src/screens/chat/modals/PremiumOfferModal.tsx

import React, { useMemo, useState } from "react";

export type AccountTier = "basic" | "premium" | "vip" | "gold";

type PremiumOfferModalProps = {
  open: boolean;
  onClose: () => void;

  // context
  currentTier?: AccountTier; // default basic

  // actions
  onChoosePlan: (plan: Exclude<AccountTier, "basic">) => void | Promise<void>;

  // optional: show an extra "continue with ads" path (for chat limiter flow)
  showKeepFreeOption?: boolean;
  onKeepFree?: () => void;

  className?: string;
};

const PremiumOfferModal: React.FC<PremiumOfferModalProps> = ({
  open,
  onClose,
  currentTier = "basic",
  onChoosePlan,
  showKeepFreeOption = true,
  onKeepFree,
  className,
}) => {
  const [selected, setSelected] = useState<Exclude<AccountTier, "basic">>("premium");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const plans = useMemo(
    () =>
      [
        {
          key: "premium" as const,
          title: "Premium",
          badge: "⭐",
          price: "Illimité",
          perks: ["Messages illimités", "Aucune pub", "Expérience fluide"],
        },
        {
          key: "vip" as const,
          title: "VIP",
          badge: "👑",
          price: "Illimité",
          perks: ["Messages illimités", "Priorité chat", "Boost visibilité"],
        },
        {
          key: "gold" as const,
          title: "Gold",
          badge: "💎",
          price: "Illimité",
          perks: ["Messages illimités", "Priorité maximale", "Statut Gold"],
        },
      ].filter((p) => p.key !== currentTier),
    [currentTier]
  );

  const close = () => {
    setToast(null);
    setLoading(false);
    onClose();
  };

  const confirm = async () => {
    setToast(null);
    setLoading(true);
    try {
      await onChoosePlan(selected);
      setToast("Parfait ✅");
      setTimeout(() => close(), 650);
    } catch (e: any) {
      setToast(e?.message || "Impossible de continuer. Réessaie.");
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className={["ayk-po-overlay", className ?? ""].join(" ")} role="dialog" aria-modal="true">
      <style>{css}</style>

      <button type="button" className="ayk-po-backdrop" onClick={close} aria-label="Fermer" />

      <div className="ayk-po-card">
        <div className="ayk-po-glow ayk-po-glow--rose" />
        <div className="ayk-po-glow ayk-po-glow--gold" />

        <div className="ayk-po-head">
          <div className="ayk-po-titleWrap">
            <div className="ayk-po-title">Passe Premium</div>
            <div className="ayk-po-sub">
              Messages illimités, zéro pub, et une présence plus visible.
            </div>
          </div>

          <button type="button" className="ayk-po-x" onClick={close} aria-label="Fermer">
            ✕
          </button>
        </div>

        {toast ? <div className="ayk-po-toast">{toast}</div> : null}

        <div className="ayk-po-grid" aria-label="Plans">
          {plans.map((p) => (
            <button
              key={p.key}
              type="button"
              className={["ayk-po-plan", selected === p.key ? "ayk-po-plan--on" : ""].join(" ")}
              onClick={() => setSelected(p.key)}
            >
              <div className="ayk-po-planTop">
                <div className="ayk-po-badge" aria-hidden="true">
                  {p.badge}
                </div>
                <div className="ayk-po-planTitle">{p.title}</div>
                <div className="ayk-po-price">{p.price}</div>
              </div>

              <div className="ayk-po-perks">
                {p.perks.map((x) => (
                  <div key={x} className="ayk-po-perk">
                    <span className="ayk-po-check" aria-hidden="true">
                      ✓
                    </span>
                    <span className="ayk-po-perkText">{x}</span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="ayk-po-actions">
          {showKeepFreeOption ? (
            <button
              type="button"
              className="ayk-btn ayk-btn--ghost"
              onClick={() => {
                if (onKeepFree) onKeepFree();
                close();
              }}
              disabled={loading}
              style={{ opacity: loading ? 0.65 : 1 }}
            >
              Rester gratuit (avec pubs)
            </button>
          ) : (
            <button type="button" className="ayk-btn ayk-btn--ghost" onClick={close} disabled={loading}>
              Plus tard
            </button>
          )}

          <button
            type="button"
            className="ayk-btn ayk-btn--primary"
            onClick={() => void confirm()}
            disabled={loading}
            style={{ opacity: loading ? 0.65 : 1 }}
          >
            {loading ? "Activation…" : `Choisir ${labelFor(selected)}`}
          </button>
        </div>

        <div className="ayk-po-foot">
          Aucun spam: les pubs ne sont jamais injectées dans tes messages. Tu choisis quand débloquer.
        </div>
      </div>
    </div>
  );
};

export default PremiumOfferModal;

function labelFor(t: Exclude<AccountTier, "basic">) {
  if (t === "premium") return "Premium";
  if (t === "vip") return "VIP";
  return "Gold";
}

const css = `
.ayk-po-overlay{
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  padding: 18px;
}
.ayk-po-backdrop{
  position: absolute;
  inset: 0;
  border: none;
  background: rgba(0,0,0,0.66);
  cursor: pointer;
}
.ayk-po-card{
  position: relative;
  width: min(720px, 100%);
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,0.12);
  background:
    radial-gradient(260px 180px at 18% 12%, rgba(232,162,182,0.16), transparent 62%),
    radial-gradient(260px 180px at 82% 10%, rgba(215,178,124,0.12), transparent 62%),
    rgba(12,10,16,0.92);
  backdrop-filter: blur(18px);
  box-shadow: 0 28px 80px rgba(0,0,0,0.65);
  padding: 16px;
  color: rgba(255,255,255,0.92);
  overflow: hidden;
  z-index: 1;
}
.ayk-po-glow{
  position:absolute;
  width: 560px;
  height: 560px;
  border-radius: 999px;
  filter: blur(28px);
  pointer-events: none;
  opacity: 0.55;
}
.ayk-po-glow--rose{
  left: -260px;
  top: -300px;
  background: radial-gradient(circle, rgba(232,162,182,0.26), transparent 70%);
}
.ayk-po-glow--gold{
  right: -280px;
  bottom: -320px;
  background: radial-gradient(circle, rgba(215,178,124,0.22), transparent 72%);
}

.ayk-po-head{
  display:flex;
  align-items:flex-start;
  justify-content: space-between;
  gap: 10px;
}
.ayk-po-titleWrap{ min-width: 0; }
.ayk-po-title{
  font-size: 16px;
  font-weight: 950;
}
.ayk-po-sub{
  margin-top: 4px;
  font-size: 12.5px;
  font-weight: 750;
  color: rgba(255,255,255,0.68);
  line-height: 1.4;
}
.ayk-po-x{
  width: 40px;
  height: 40px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.92);
  cursor: pointer;
  font-weight: 900;
}

.ayk-po-toast{
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 16px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  font-weight: 900;
  font-size: 12.5px;
}

.ayk-po-grid{
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}
@media (max-width: 720px){
  .ayk-po-grid{ grid-template-columns: 1fr; }
}

.ayk-po-plan{
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  padding: 14px;
  cursor: pointer;
  text-align: left;
  color: rgba(255,255,255,0.92);
}
.ayk-po-plan--on{
  border-color: rgba(232,162,182,0.32);
  background:
    radial-gradient(220px 140px at 18% 12%, rgba(232,162,182,0.16), transparent 62%),
    radial-gradient(220px 140px at 82% 10%, rgba(215,178,124,0.12), transparent 62%),
    rgba(255,255,255,0.06);
}

.ayk-po-planTop{
  display:flex;
  align-items:center;
  gap: 10px;
}
.ayk-po-badge{
  width: 36px;
  height: 36px;
  display:grid;
  place-items:center;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(0,0,0,0.25);
  font-size: 16px;
}
.ayk-po-planTitle{
  font-weight: 950;
  font-size: 13.5px;
}
.ayk-po-price{
  margin-left: auto;
  font-weight: 950;
  font-size: 12px;
  color: rgba(255,255,255,0.72);
}

.ayk-po-perks{
  margin-top: 10px;
  display:flex;
  flex-direction: column;
  gap: 8px;
}
.ayk-po-perk{
  display:flex;
  align-items:center;
  gap: 8px;
}
.ayk-po-check{
  width: 18px;
  height: 18px;
  border-radius: 8px;
  display:grid;
  place-items:center;
  background: rgba(215,178,124,0.18);
  border: 1px solid rgba(215,178,124,0.28);
  color: rgba(255,230,190,0.92);
  font-weight: 950;
  font-size: 12px;
}
.ayk-po-perkText{
  font-weight: 800;
  font-size: 12.5px;
  color: rgba(255,255,255,0.80);
}

.ayk-po-actions{
  margin-top: 14px;
  display:flex;
  justify-content:flex-end;
  gap: 10px;
  flex-wrap: wrap;
}

.ayk-btn{
  padding: 12px 14px;
  border-radius: 14px;
  border: none;
  font-weight: 950;
  cursor: pointer;
}
.ayk-btn--primary{
  background: linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1));
  color: #140F16;
}
.ayk-btn--ghost{
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.92);
}

.ayk-po-foot{
  margin-top: 12px;
  font-size: 11.5px;
  font-weight: 750;
  color: rgba(255,255,255,0.55);
  line-height: 1.45;
}
`;
