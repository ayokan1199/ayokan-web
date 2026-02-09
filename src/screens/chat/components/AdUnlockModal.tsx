// src/screens/chat/components/AdUnlockModal.tsx

import React, { useEffect, useMemo, useState } from "react";
import type { MessageLimiterStatus } from "../services/messageLimiter";
import type { AdRewardManager } from "../services/adRewardManager";

type AdUnlockModalProps = {
  open: boolean;
  onClose: () => void;

  /** Manager pub (1 pub = 1 crédit, 10 pubs = +25 messages) */
  adManager: AdRewardManager;

  /** Statut actuel (pour afficher compteurs) */
  status: MessageLimiterStatus;

  /** Callback pour remonter le nouveau status après pub */
  onStatusChange: (next: MessageLimiterStatus) => void;

  /** CTA secondaire premium */
  onUpgrade?: () => void;

  title?: string;
};

const AdUnlockModal: React.FC<AdUnlockModalProps> = ({
  open,
  onClose,
  adManager,
  status,
  onStatusChange,
  onUpgrade,
  title = "🔓 Débloquer des messages",
}) => {
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const progress = useMemo(() => {
    const watched = status.adsWatchedToday ?? 0;
    const required = status.adsRequiredToUnlock ?? 10;
    const pct = Math.max(0, Math.min(100, Math.round((watched / required) * 100)));
    return { watched, required, pct };
  }, [status.adsWatchedToday, status.adsRequiredToUnlock]);

  const unlockedLabel = useMemo(() => {
    const unlocked = status.unlockedMessagesAvailable ?? 0;
    const pack = status.unlockPackSize ?? 25;
    return `${unlocked} / ${pack}`;
  }, [status.unlockedMessagesAvailable, status.unlockPackSize]);

  useEffect(() => {
    if (!open) {
      setBusy(false);
      setToast(null);
    }
  }, [open]);

  const watchAd = async () => {
    setToast(null);
    setBusy(true);

    try {
      const res = await adManager.watchRewardedAd();

      if (!res.ok) {
        setToast(res.message);
        return;
      }

      onStatusChange(res.status);

      if (res.unlockedNow) {
        setToast("🎉 +25 messages débloqués !");
      } else {
        setToast(`✅ Pub validée (${res.status.adsWatchedToday}/${res.status.adsRequiredToUnlock})`);
      }
    } finally {
      setBusy(false);
    }
  };

  if (!open) return null;

  return (
    <div style={styles.backdrop} role="dialog" aria-modal="true" aria-label="Débloquer messages">
      <style>{css}</style>

      <div style={styles.card}>
        {/* header */}
        <div style={styles.header}>
          <div style={styles.titleRow}>
            <span style={styles.title}>{title}</span>
            <button type="button" onClick={onClose} style={styles.closeBtn} aria-label="Fermer">
              ✕
            </button>
          </div>

          <p style={styles.subtitle}>
            Regarde des pubs volontairement (jamais injectées dans la conversation) pour débloquer des messages ❤️
          </p>
        </div>

        {/* progress */}
        <div style={styles.panel}>
          <div style={styles.panelTop}>
            <span style={styles.panelTitle}>Progression pubs</span>
            <span style={styles.panelValue}>
              {progress.watched} / {progress.required}
            </span>
          </div>

          <div style={styles.progressTrack} aria-hidden="true">
            <div style={{ ...styles.progressFill, width: `${progress.pct}%` }} />
          </div>

          <div style={styles.hintRow}>
            <span style={styles.hint}>
              {progress.watched >= progress.required
                ? "✅ Pack débloqué. Une pub de plus déclenche le prochain pack."
                : "🎯 Objectif: 10 pubs = +25 messages"}
            </span>
          </div>
        </div>

        {/* unlocked messages */}
        <div style={styles.panel}>
          <div style={styles.panelTop}>
            <span style={styles.panelTitle}>Messages débloqués</span>
            <span style={styles.panelValue}>{unlockedLabel}</span>
          </div>

          <div style={styles.kpiRow}>
            <div style={styles.kpiBox}>
              <div style={styles.kpiBig}>{status.remainingToday}</div>
              <div style={styles.kpiSmall}>restants aujourd’hui</div>
            </div>

            <div style={styles.kpiBox}>
              <div style={styles.kpiBig}>{status.dailyLimit}</div>
              <div style={styles.kpiSmall}>limite basic</div>
            </div>

            <div style={styles.kpiBox}>
              <div style={styles.kpiBig}>{status.sentToday}</div>
              <div style={styles.kpiSmall}>envoyés</div>
            </div>
          </div>
        </div>

        {/* toast */}
        {toast ? <div style={styles.toast}>{toast}</div> : null}

        {/* actions */}
        <div style={styles.actions}>
          <button
            type="button"
            onClick={watchAd}
            disabled={busy || adManager.isBusy()}
            style={{
              ...styles.primaryBtn,
              opacity: busy || adManager.isBusy() ? 0.7 : 1,
              cursor: busy || adManager.isBusy() ? "not-allowed" : "pointer",
            }}
          >
            {busy ? "Lecture de la pub..." : "📺 Regarder une pub"}
          </button>

          <button
            type="button"
            onClick={onUpgrade}
            style={{
              ...styles.secondaryBtn,
              opacity: onUpgrade ? 1 : 0.55,
              cursor: onUpgrade ? "pointer" : "not-allowed",
            }}
            disabled={!onUpgrade}
          >
            💎 Passer Premium
          </button>

          <button type="button" onClick={onClose} style={styles.linkBtn}>
            Continuer plus tard
          </button>
        </div>

        {/* footnote */}
        <div style={styles.foot}>
          <span style={styles.footText}>
            Astuce: Premium/VIP/Gold = messages illimités + zéro pub.
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdUnlockModal;

/* ===================== STYLES ===================== */

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.72)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    zIndex: 9999,
  },

  card: {
    width: "min(520px, 100%)",
    borderRadius: 22,
    border: "1px solid rgba(255,255,255,0.12)",
    background:
      "radial-gradient(260px 180px at 18% 10%, rgba(232,162,182,0.16), transparent 62%)," +
      "radial-gradient(260px 180px at 82% 12%, rgba(215,178,124,0.12), transparent 62%)," +
      "rgba(255,255,255,0.06)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 18px 60px rgba(0,0,0,0.65)",
    overflow: "hidden",
  },

  header: {
    padding: "18px 18px 10px",
  },

  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: 900,
    color: "rgba(255,255,255,0.92)",
    letterSpacing: -0.2,
  },

  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.9)",
    fontWeight: 900,
    cursor: "pointer",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 1.5,
    color: "rgba(255,255,255,0.70)",
  },

  panel: {
    margin: "10px 18px",
    padding: 14,
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.25)",
  },

  panelTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },

  panelTitle: {
    fontSize: 12.5,
    fontWeight: 900,
    color: "rgba(255,255,255,0.90)",
  },

  panelValue: {
    fontSize: 12,
    fontWeight: 900,
    color: "rgba(255,255,255,0.80)",
  },

  progressTrack: {
    height: 10,
    borderRadius: 999,
    background: "rgba(255,255,255,0.10)",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
    background: "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
    boxShadow: "0 12px 26px rgba(0,0,0,0.35)",
  },

  hintRow: { marginTop: 10 },

  hint: {
    fontSize: 12,
    fontWeight: 700,
    color: "rgba(255,255,255,0.65)",
  },

  kpiRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 10,
  },

  kpiBox: {
    padding: "10px 10px",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.06)",
    textAlign: "center",
  },

  kpiBig: {
    fontSize: 16,
    fontWeight: 900,
    color: "rgba(255,255,255,0.92)",
  },

  kpiSmall: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: 800,
    color: "rgba(255,255,255,0.60)",
  },

  toast: {
    margin: "10px 18px 0",
    padding: "10px 12px",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.88)",
    fontWeight: 900,
    textAlign: "center",
    fontSize: 12.5,
  },

  actions: {
    padding: 18,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  primaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
    color: "#140F16",
    fontWeight: 950,
    cursor: "pointer",
  },

  secondaryBtn: {
    width: "100%",
    padding: 13,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.92)",
    fontWeight: 950,
  },

  linkBtn: {
    width: "100%",
    padding: 10,
    borderRadius: 14,
    border: "none",
    background: "transparent",
    color: "rgba(232,162,182,0.95)",
    textDecoration: "underline",
    textUnderlineOffset: 3,
    fontWeight: 900,
    cursor: "pointer",
  },

  foot: {
    padding: "0 18px 16px",
    textAlign: "center",
  },

  footText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
    fontWeight: 700,
  },
};

const css = `
@media (max-width: 420px){
  .ad-grid-3 { grid-template-columns: 1fr; }
}
`;
