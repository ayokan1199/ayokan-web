// src/screens/chat/components/LimitReachedBanner.tsx

import React from "react";

type LimitReachedBannerProps = {
  remainingAds?: number; // ex: 4 pubs restantes à regarder
  onWatchAd: () => void;
  onUpgrade: () => void;
  className?: string;
};

const LimitReachedBanner: React.FC<LimitReachedBannerProps> = ({
  remainingAds = 10,
  onWatchAd,
  onUpgrade,
  className,
}) => {
  return (
    <div className={["ayk-limit-banner", className ?? ""].join(" ")}>
      <style>{css}</style>

      <div className="ayk-limit-banner__content">
        <div className="ayk-limit-banner__text">
          <div className="ayk-limit-banner__title">🔥 Limite atteinte</div>
          <div className="ayk-limit-banner__subtitle">
            Regarde {remainingAds} pubs pour débloquer +25 messages
          </div>
        </div>

        <div className="ayk-limit-banner__actions">
          <button
            type="button"
            className="ayk-btn ayk-btn--soft"
            onClick={onWatchAd}
          >
            Regarder une pub
          </button>

          <button
            type="button"
            className="ayk-btn ayk-btn--primary"
            onClick={onUpgrade}
          >
            Passer Premium 💎
          </button>
        </div>
      </div>
    </div>
  );
};

export default LimitReachedBanner;

/* ================= CSS ================= */

const css = `
.ayk-limit-banner{
  margin: 12px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.12);
  background:
    radial-gradient(220px 140px at 20% 0%, rgba(232,162,182,0.14), transparent 60%),
    radial-gradient(220px 140px at 80% 0%, rgba(215,178,124,0.12), transparent 60%),
    rgba(255,255,255,0.06);
  backdrop-filter: blur(16px);
  box-shadow: 0 18px 44px rgba(0,0,0,0.45);
}

.ayk-limit-banner__content{
  padding: 14px 16px;
  display: grid;
  gap: 12px;
}

.ayk-limit-banner__title{
  font-weight: 950;
  font-size: 15px;
  color: rgba(255,255,255,0.95);
}

.ayk-limit-banner__subtitle{
  font-size: 12px;
  font-weight: 800;
  color: rgba(255,255,255,0.65);
}

.ayk-limit-banner__actions{
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.ayk-btn{
  border-radius: 14px;
  padding: 10px 14px;
  font-weight: 950;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.12);
}

.ayk-btn--soft{
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.92);
}
.ayk-btn--soft:hover{ background: rgba(255,255,255,0.10); }

.ayk-btn--primary{
  border: none;
  background: linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1));
  color: #140F16;
  box-shadow: 0 14px 34px rgba(0,0,0,0.35);
}
.ayk-btn:active{ transform: scale(0.99); }
`;
