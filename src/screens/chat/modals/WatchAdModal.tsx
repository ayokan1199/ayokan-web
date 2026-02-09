// src/screens/chat/modals/WatchAdModal.tsx

import React, { useEffect, useMemo, useRef, useState } from "react";

type WatchAdModalProps = {
  open: boolean;
  onClose: () => void;

  /**
   * Progression pub: ex 6/10
   */
  adsWatched: number;
  adsRequired: number;

  /**
   * 1 pub = 1 crédit. Quand adsWatched atteint adsRequired => débloque messages.
   * Cette fonction DOIT déclencher la pub (ou une simulation) puis retourner true si “vue”.
   */
  onWatchAd: () => Promise<boolean> | boolean;

  /**
   * Called when adsWatched atteint adsRequired après une pub validée.
   * (ex: +25 messages)
   */
  onUnlocked?: () => void;

  /**
   * Texte optionnel
   */
  title?: string;
  subtitle?: string;

  className?: string;
};

const WatchAdModal: React.FC<WatchAdModalProps> = ({
  open,
  onClose,
  adsWatched,
  adsRequired,
  onWatchAd,
  onUnlocked,
  title = "📺 Regarde une pub",
  subtitle = "Une pub = 1 crédit. 10 pubs = +25 messages.",
  className,
}) => {
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [localPulse, setLocalPulse] = useState(0);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const pct = useMemo(() => {
    const safeReq = Math.max(1, adsRequired || 1);
    const safeWatched = Math.max(0, Math.min(adsWatched || 0, safeReq));
    return Math.round((safeWatched / safeReq) * 100);
  }, [adsWatched, adsRequired]);

  useEffect(() => {
    if (!open) return;
    setToast(null);
    setBusy(false);
    setLocalPulse((x) => x + 1);
    setTimeout(() => closeBtnRef.current?.focus(), 0);
  }, [open]);

  const close = () => {
    if (busy) return;
    onClose();
  };

  const handleWatch = async () => {
    if (busy) return;
    setToast(null);
    setBusy(true);

    try {
      const ok = await onWatchAd();
      if (!ok) {
        setToast("Pub non validée. Réessaie.");
        setBusy(false);
        return;
      }

      setToast("✅ Pub validée");
      setLocalPulse((x) => x + 1);

      // Si après cette pub, on atteint le seuil: onUnlocked()
      const nextWatched = (adsWatched || 0) + 1;
      if (nextWatched >= adsRequired) {
        setToast("🎉 +25 messages débloqués !");
        if (onUnlocked) onUnlocked();
        setTimeout(() => close(), 700);
        return;
      }

      setBusy(false);
    } catch (e: any) {
      setToast(e?.message || "Erreur pub. Réessaie.");
      setBusy(false);
    }
  };

  if (!open) return null;

  return (
    <div className={["ayk-adm-overlay", className ?? ""].join(" ")} role="dialog" aria-modal="true">
      <style>{css}</style>

      <button type="button" className="ayk-adm-backdrop" onClick={close} aria-label="Fermer" />

      <div className="ayk-adm-card">
        <div className="ayk-adm-glow ayk-adm-glow--rose" />
        <div className="ayk-adm-glow ayk-adm-glow--gold" />

        <div className="ayk-adm-head">
          <div className="ayk-adm-titleWrap">
            <div className="ayk-adm-title">{title}</div>
            <div className="ayk-adm-sub">{subtitle}</div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="ayk-adm-x"
            onClick={close}
            aria-label="Fermer"
            disabled={busy}
            style={{ opacity: busy ? 0.65 : 1 }}
          >
            ✕
          </button>
        </div>

        {toast ? <div className="ayk-adm-toast">{toast}</div> : null}

        <div className="ayk-adm-progressWrap" aria-label="Progression pubs">
          <div className="ayk-adm-progressTop">
            <div className="ayk-adm-progressLabel">
              Pub regardée :{" "}
              <span className="ayk-adm-strong">
                {Math.max(0, adsWatched)} / {Math.max(1, adsRequired)}
              </span>
            </div>
            <div className="ayk-adm-chip">{pct}%</div>
          </div>

          <div className="ayk-adm-bar" key={localPulse}>
            <div className="ayk-adm-barFill" style={{ width: `${pct}%` }} />
          </div>

          <div className="ayk-adm-hint">
            Les pubs ne s’affichent jamais dans la conversation. Tu débloques quand tu veux.
          </div>
        </div>

        <div className="ayk-adm-actions">
          <button type="button" className="ayk-btn ayk-btn--ghost" onClick={close} disabled={busy}>
            Plus tard
          </button>

          <button
            type="button"
            className="ayk-btn ayk-btn--primary"
            onClick={() => void handleWatch()}
            disabled={busy}
            style={{ opacity: busy ? 0.7 : 1 }}
          >
            {busy ? "Lecture…" : "Regarder une pub"}
          </button>
        </div>

        <div className="ayk-adm-foot">
          Astuce: après <span className="ayk-adm-strong">{adsRequired}</span> pubs, tu gagnes{" "}
          <span className="ayk-adm-strong">+25 messages</span>.
        </div>
      </div>
    </div>
  );
};

export default WatchAdModal;

const css = `
.ayk-adm-overlay{
  position: fixed;
  inset: 0;
  z-index: 70;
  display: grid;
  place-items: center;
  padding: 18px;
}
.ayk-adm-backdrop{
  position: absolute;
  inset: 0;
  border: none;
  background: rgba(0,0,0,0.66);
  cursor: pointer;
}
.ayk-adm-card{
  position: relative;
  width: min(520px, 100%);
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
.ayk-adm-glow{
  position:absolute;
  width: 520px;
  height: 520px;
  border-radius: 999px;
  filter: blur(28px);
  pointer-events: none;
  opacity: 0.55;
}
.ayk-adm-glow--rose{
  left: -260px;
  top: -300px;
  background: radial-gradient(circle, rgba(232,162,182,0.26), transparent 70%);
}
.ayk-adm-glow--gold{
  right: -280px;
  bottom: -320px;
  background: radial-gradient(circle, rgba(215,178,124,0.22), transparent 72%);
}

.ayk-adm-head{
  display:flex;
  align-items:flex-start;
  justify-content: space-between;
  gap: 10px;
}
.ayk-adm-titleWrap{ min-width: 0; }
.ayk-adm-title{
  font-size: 16px;
  font-weight: 950;
}
.ayk-adm-sub{
  margin-top: 4px;
  font-size: 12.5px;
  font-weight: 750;
  color: rgba(255,255,255,0.68);
  line-height: 1.4;
}
.ayk-adm-x{
  width: 40px;
  height: 40px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.92);
  cursor: pointer;
  font-weight: 900;
}

.ayk-adm-toast{
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 16px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  font-weight: 900;
  font-size: 12.5px;
}

.ayk-adm-progressWrap{
  margin-top: 12px;
  padding: 12px;
  border-radius: 18px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.10);
}
.ayk-adm-progressTop{
  display:flex;
  align-items:center;
  justify-content: space-between;
  gap: 10px;
}
.ayk-adm-progressLabel{
  font-weight: 900;
  font-size: 12.5px;
  color: rgba(255,255,255,0.78);
}
.ayk-adm-chip{
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.12);
  font-weight: 950;
  font-size: 12px;
}

.ayk-adm-bar{
  margin-top: 10px;
  height: 10px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.10);
}
.ayk-adm-barFill{
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1));
  box-shadow: 0 14px 34px rgba(0,0,0,0.35);
  transition: width .28s ease;
}

.ayk-adm-hint{
  margin-top: 10px;
  font-size: 11.5px;
  font-weight: 750;
  color: rgba(255,255,255,0.55);
  line-height: 1.45;
}

.ayk-adm-actions{
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

.ayk-adm-foot{
  margin-top: 12px;
  font-size: 11.5px;
  font-weight: 750;
  color: rgba(255,255,255,0.55);
  line-height: 1.45;
}
.ayk-adm-strong{
  color: rgba(255,255,255,0.92);
  font-weight: 950;
}
`;
