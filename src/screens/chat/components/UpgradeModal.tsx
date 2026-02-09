// src/screens/chat/components/UpgradeModal.tsx

import React, { useMemo } from "react";

export type UpgradePlan = "premium" | "vip" | "gold";

export type UpgradeReason =
  | "limit_reached"
  | "priority_chat"
  | "no_ads"
  | "boost_visibility"
  | "unlock_more_messages";

type UpgradeModalProps = {
  open: boolean;
  onClose: () => void;

  // actions
  onChoosePlan: (plan: UpgradePlan) => void | Promise<void>;

  // optional secondary action
  onWatchAdInstead?: () => void | Promise<void>;

  // context (optional)
  remainingMessages?: number; // basic counter
  limitPerDay?: number;
  adsWatchedToday?: number;
  adsRequired?: number;

  highlightPlan?: UpgradePlan; // default button emphasis
  reason?: UpgradeReason;

  className?: string;
};

const UpgradeModal: React.FC<UpgradeModalProps> = ({
  open,
  onClose,
  onChoosePlan,
  onWatchAdInstead,
  remainingMessages,
  limitPerDay,
  adsWatchedToday,
  adsRequired,
  highlightPlan = "premium",
  reason = "limit_reached",
  className,
}) => {
  const headline = useMemo(() => {
    if (reason === "priority_chat") return "Passe en priorité 💬";
    if (reason === "no_ads") return "Zéro pub, zéro friction";
    if (reason === "boost_visibility") return "Boost visibilité + chat";
    if (reason === "unlock_more_messages") return "Débloque plus de messages";
    return "Continue la discussion ❤️";
  }, [reason]);

  const subline = useMemo(() => {
    if (typeof remainingMessages === "number" && typeof limitPerDay === "number") {
      return `Messages restants: ${Math.max(0, remainingMessages)} / ${Math.max(0, limitPerDay)} (Basic)`;
    }
    return "Choisis une option pour débloquer l’expérience complète.";
  }, [remainingMessages, limitPerDay]);

  const adLine = useMemo(() => {
    if (typeof adsWatchedToday === "number" && typeof adsRequired === "number") {
      return `Pubs vues: ${Math.max(0, adsWatchedToday)} / ${Math.max(0, adsRequired)} (déblocage)`;
    }
    return null;
  }, [adsWatchedToday, adsRequired]);

  if (!open) return null;

  return (
    <div className={["ayk-upgrade-overlay", className ?? ""].join(" ")} role="dialog" aria-modal="true">
      <style>{css}</style>

      <button
        type="button"
        className="ayk-upgrade-backdrop"
        aria-label="Fermer"
        onClick={onClose}
      />

      <div className="ayk-upgrade-card">
        {/* glows */}
        <div className="ayk-upgrade-glow ayk-upgrade-glow--rose" />
        <div className="ayk-upgrade-glow ayk-upgrade-glow--gold" />

        <div className="ayk-upgrade-head">
          <div className="ayk-brand">
            <span className="ayk-mark" aria-hidden="true" />
            <span className="ayk-title">AYOKAN</span>
          </div>

          <button type="button" className="ayk-x" onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </div>

        <h2 className="ayk-h2">{headline}</h2>
        <p className="ayk-sub">{subline}</p>
        {adLine ? <p className="ayk-sub ayk-sub--small">{adLine}</p> : null}

        <div className="ayk-plans">
          <PlanCard
            plan="premium"
            title="Premium"
            priceHint="Messages illimités"
            perks={["Aucune pub", "Illimité", "Plus de confort"]}
            highlight={highlightPlan === "premium"}
            onPick={() => onChoosePlan("premium")}
          />

          <PlanCard
            plan="vip"
            title="VIP"
            priceHint="Priorité + visibilité"
            perks={["Aucune pub", "Illimité", "Priorité chat", "Boost feed"]}
            highlight={highlightPlan === "vip"}
            onPick={() => onChoosePlan("vip")}
          />

          <PlanCard
            plan="gold"
            title="Gold 💎"
            priceHint="Max: priorités + prestige"
            perks={["Aucune pub", "Illimité", "Top priorité", "Badge diamant"]}
            highlight={highlightPlan === "gold"}
            onPick={() => onChoosePlan("gold")}
          />
        </div>

        <div className="ayk-divider" />

        <div className="ayk-actions">
          {onWatchAdInstead ? (
            <button type="button" className="ayk-btn ayk-btn--ghost" onClick={() => void onWatchAdInstead()}>
              Regarder une pub (débloquer)
            </button>
          ) : null}

          <button type="button" className="ayk-btn ayk-btn--dark" onClick={onClose}>
            Plus tard
          </button>
        </div>

        <p className="ayk-foot">
          Paiements sécurisés. Tu peux annuler quand tu veux. Le chat reste propre: aucune pub injectée dans la discussion.
        </p>
      </div>
    </div>
  );
};

export default UpgradeModal;

/* ===================== */

const PlanCard: React.FC<{
  plan: UpgradePlan;
  title: string;
  priceHint: string;
  perks: string[];
  highlight: boolean;
  onPick: () => void | Promise<void>;
}> = ({ title, priceHint, perks, highlight, onPick }) => {
  return (
    <div className={["ayk-plan", highlight ? "ayk-plan--hi" : ""].join(" ")}>
      <div className="ayk-plan-top">
        <div>
          <div className="ayk-plan-title">{title}</div>
          <div className="ayk-plan-hint">{priceHint}</div>
        </div>

        <span className="ayk-pill" aria-hidden="true">
          ✨
        </span>
      </div>

      <ul className="ayk-plan-list">
        {perks.map((p) => (
          <li key={p} className="ayk-plan-li">
            <span className="ayk-check" aria-hidden="true">
              ✓
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={["ayk-btn", highlight ? "ayk-btn--primary" : "ayk-btn--soft"].join(" ")}
        onClick={() => void onPick()}
      >
        Choisir {title}
      </button>
    </div>
  );
};

/* ===================== CSS ===================== */

const css = `
.ayk-upgrade-overlay{
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  padding: 18px;
}
.ayk-upgrade-backdrop{
  position: absolute;
  inset: 0;
  border: none;
  background: rgba(0,0,0,0.65);
  cursor: pointer;
}
.ayk-upgrade-card{
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
  padding: 18px;
  color: rgba(255,255,255,0.92);
  overflow: hidden;
  z-index: 1;
}
.ayk-upgrade-glow{
  position:absolute;
  width: 520px;
  height: 520px;
  border-radius: 999px;
  filter: blur(26px);
  pointer-events: none;
  opacity: 0.55;
}
.ayk-upgrade-glow--rose{
  left: -240px;
  top: -280px;
  background: radial-gradient(circle, rgba(232,162,182,0.26), transparent 70%);
}
.ayk-upgrade-glow--gold{
  right: -260px;
  bottom: -300px;
  background: radial-gradient(circle, rgba(215,178,124,0.22), transparent 72%);
}

.ayk-upgrade-head{
  display:flex;
  align-items:center;
  justify-content: space-between;
  gap: 10px;
}
.ayk-brand{
  display:flex;
  align-items:center;
  gap: 10px;
}
.ayk-mark{
  width: 30px;
  height: 30px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1));
  box-shadow: 0 0 0 1px rgba(255,255,255,0.10), 0 18px 44px rgba(0,0,0,0.45);
}
.ayk-title{
  font-weight: 900;
  letter-spacing: 0.22em;
  font-size: 12px;
  color: rgba(255,255,255,0.92);
}
.ayk-x{
  width: 40px;
  height: 40px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.92);
  cursor: pointer;
  font-weight: 900;
}

.ayk-h2{
  margin: 12px 0 6px 0;
  font-size: 20px;
  font-weight: 950;
}
.ayk-sub{
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: rgba(255,255,255,0.70);
  line-height: 1.5;
}
.ayk-sub--small{
  margin-top: 6px;
  font-size: 12px;
  color: rgba(255,255,255,0.60);
}

.ayk-plans{
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
@media (max-width: 820px){
  .ayk-plans{ grid-template-columns: 1fr; }
}

.ayk-plan{
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.05);
  padding: 12px;
}
.ayk-plan--hi{
  border-color: rgba(232,162,182,0.35);
  background:
    radial-gradient(220px 140px at 18% 12%, rgba(232,162,182,0.16), transparent 62%),
    radial-gradient(220px 140px at 82% 10%, rgba(215,178,124,0.12), transparent 62%),
    rgba(255,255,255,0.05);
}
.ayk-plan-top{
  display:flex;
  align-items:flex-start;
  justify-content: space-between;
  gap: 10px;
}
.ayk-plan-title{
  font-weight: 950;
  font-size: 14px;
}
.ayk-plan-hint{
  margin-top: 2px;
  font-size: 12px;
  font-weight: 800;
  color: rgba(255,255,255,0.68);
}
.ayk-pill{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width: 34px;
  height: 34px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(0,0,0,0.25);
}

.ayk-plan-list{
  list-style: none;
  padding: 0;
  margin: 10px 0 12px 0;
  display:flex;
  flex-direction: column;
  gap: 8px;
}
.ayk-plan-li{
  display:flex;
  align-items:center;
  gap: 8px;
  font-size: 12px;
  font-weight: 800;
  color: rgba(255,255,255,0.78);
}
.ayk-check{
  width: 18px;
  height: 18px;
  border-radius: 8px;
  display:grid;
  place-items:center;
  background: rgba(34,197,94,0.16);
  border: 1px solid rgba(34,197,94,0.22);
  color: rgba(210,255,225,0.95);
  font-weight: 950;
}

.ayk-divider{
  margin-top: 14px;
  height: 1px;
  background: rgba(255,255,255,0.10);
}

.ayk-actions{
  margin-top: 12px;
  display:flex;
  justify-content: flex-end;
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
.ayk-btn--soft{
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.92);
}
.ayk-btn--ghost{
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(232,162,182,0.26);
  color: rgba(255,255,255,0.92);
}
.ayk-btn--dark{
  background: rgba(0,0,0,0.35);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.90);
}

.ayk-foot{
  margin: 12px 2px 0 2px;
  font-size: 11.5px;
  font-weight: 750;
  color: rgba(255,255,255,0.55);
  line-height: 1.45;
}
`;
