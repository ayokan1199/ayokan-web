// src/screens/chat/modals/BlockReportModal.tsx

import React, { useMemo, useState } from "react";

export type BlockReportReason =
  | "spam"
  | "harassment"
  | "nudity"
  | "scam"
  | "hate"
  | "violence"
  | "minor"
  | "other";

type BlockReportModalProps = {
  open: boolean;
  onClose: () => void;

  // identity/context
  targetUserId: string;
  targetName?: string;

  // actions
  onBlock: (targetUserId: string) => void | Promise<void>;
  onReport: (payload: {
    targetUserId: string;
    reason: BlockReportReason;
    details?: string;
  }) => void | Promise<void>;

  // optional UX
  canBlock?: boolean; // default true
  canReport?: boolean; // default true
  className?: string;
};

const BlockReportModal: React.FC<BlockReportModalProps> = ({
  open,
  onClose,
  targetUserId,
  targetName,
  onBlock,
  onReport,
  canBlock = true,
  canReport = true,
  className,
}) => {
  const [tab, setTab] = useState<"report" | "block">("report");
  const [reason, setReason] = useState<BlockReportReason>("harassment");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const title = useMemo(() => {
    const n = targetName?.trim();
    return n ? `Gérer ${n}` : "Bloquer / Signaler";
  }, [targetName]);

  const reasons: Array<{ key: BlockReportReason; label: string; hint: string }> = [
    { key: "spam", label: "Spam", hint: "Messages répétitifs, pub, flood." },
    { key: "harassment", label: "Harcèlement", hint: "Insultes, intimidation, pression." },
    { key: "nudity", label: "Nudité", hint: "Contenu sexuel explicite non sollicité." },
    { key: "scam", label: "Arnaque", hint: "Tentative de fraude, argent, liens suspects." },
    { key: "hate", label: "Discours haineux", hint: "Racisme, discrimination, incitation." },
    { key: "violence", label: "Violence", hint: "Menaces, violence graphique." },
    { key: "minor", label: "Mineur", hint: "Utilisateur suspecté mineur." },
    { key: "other", label: "Autre", hint: "Explique brièvement ci-dessous." },
  ];

  const hint = useMemo(() => reasons.find((r) => r.key === reason)?.hint ?? "", [reason]);

  const close = () => {
    setToast(null);
    setLoading(false);
    setDetails("");
    setReason("harassment");
    setTab("report");
    onClose();
  };

  const doReport = async () => {
    if (!canReport) return;
    setToast(null);

    if (reason === "other" && details.trim().length < 6) {
      setToast("Ajoute un petit détail (min 6 caractères).");
      return;
    }

    setLoading(true);
    try {
      await onReport({
        targetUserId,
        reason,
        details: details.trim() ? details.trim() : undefined,
      });
      setToast("Signalement envoyé ✅");
      setTimeout(() => close(), 650);
    } catch (e: any) {
      setToast(e?.message || "Impossible d’envoyer le signalement.");
      setLoading(false);
    }
  };

  const doBlock = async () => {
    if (!canBlock) return;
    setToast(null);

    setLoading(true);
    try {
      await onBlock(targetUserId);
      setToast("Utilisateur bloqué ✅");
      setTimeout(() => close(), 650);
    } catch (e: any) {
      setToast(e?.message || "Impossible de bloquer l’utilisateur.");
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className={["ayk-br-overlay", className ?? ""].join(" ")} role="dialog" aria-modal="true">
      <style>{css}</style>

      <button type="button" className="ayk-br-backdrop" onClick={close} aria-label="Fermer" />

      <div className="ayk-br-card">
        <div className="ayk-br-glow ayk-br-glow--rose" />
        <div className="ayk-br-glow ayk-br-glow--gold" />

        <div className="ayk-br-head">
          <div className="ayk-br-titleWrap">
            <div className="ayk-br-title">{title}</div>
            <div className="ayk-br-sub">
              Choisis une action. On garde ça propre et sécurisé.
            </div>
          </div>

          <button type="button" className="ayk-br-x" onClick={close} aria-label="Fermer">
            ✕
          </button>
        </div>

        <div className="ayk-br-tabs" role="tablist" aria-label="Options">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "report"}
            className={["ayk-br-tab", tab === "report" ? "ayk-br-tab--on" : ""].join(" ")}
            onClick={() => setTab("report")}
            disabled={!canReport}
          >
            Signaler
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={tab === "block"}
            className={["ayk-br-tab", tab === "block" ? "ayk-br-tab--on" : ""].join(" ")}
            onClick={() => setTab("block")}
            disabled={!canBlock}
          >
            Bloquer
          </button>
        </div>

        {toast ? <div className="ayk-br-toast">{toast}</div> : null}

        {tab === "report" ? (
          <div className="ayk-br-body">
            <div className="ayk-br-label">Motif</div>

            <div className="ayk-br-reasons">
              {reasons.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  className={["ayk-br-reason", reason === r.key ? "ayk-br-reason--on" : ""].join(" ")}
                  onClick={() => setReason(r.key)}
                >
                  <span className="ayk-br-dot" aria-hidden="true" />
                  <span className="ayk-br-reasonText">{r.label}</span>
                </button>
              ))}
            </div>

            <div className="ayk-br-hint">{hint}</div>

            <textarea
              className="ayk-br-textarea"
              placeholder="Détails (optionnel)…"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              maxLength={400}
            />

            <div className="ayk-br-actions">
              <button type="button" className="ayk-btn ayk-btn--ghost" onClick={close}>
                Annuler
              </button>

              <button
                type="button"
                className="ayk-btn ayk-btn--primary"
                onClick={() => void doReport()}
                disabled={loading || !canReport}
                style={{ opacity: loading || !canReport ? 0.65 : 1 }}
              >
                {loading ? "Envoi…" : "Envoyer le signalement"}
              </button>
            </div>

            <div className="ayk-br-foot">
              Si tu es en danger immédiat, contacte les services d’urgence de ta région.
            </div>
          </div>
        ) : (
          <div className="ayk-br-body">
            <div className="ayk-br-blockBox">
              <div className="ayk-br-blockTitle">Bloquer cet utilisateur</div>
              <div className="ayk-br-blockText">
                Tu ne recevras plus ses messages et il ne pourra plus te contacter.
              </div>

              <div className="ayk-br-actions">
                <button type="button" className="ayk-btn ayk-btn--ghost" onClick={close}>
                  Annuler
                </button>

                <button
                  type="button"
                  className="ayk-btn ayk-btn--danger"
                  onClick={() => void doBlock()}
                  disabled={loading || !canBlock}
                  style={{ opacity: loading || !canBlock ? 0.65 : 1 }}
                >
                  {loading ? "Blocage…" : "Bloquer"}
                </button>
              </div>
            </div>

            <div className="ayk-br-foot">
              Le blocage peut être retiré plus tard dans les paramètres.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockReportModal;

/* ===================== CSS ===================== */

const css = `
.ayk-br-overlay{
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  padding: 18px;
}
.ayk-br-backdrop{
  position: absolute;
  inset: 0;
  border: none;
  background: rgba(0,0,0,0.66);
  cursor: pointer;
}
.ayk-br-card{
  position: relative;
  width: min(640px, 100%);
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
.ayk-br-glow{
  position:absolute;
  width: 520px;
  height: 520px;
  border-radius: 999px;
  filter: blur(26px);
  pointer-events: none;
  opacity: 0.55;
}
.ayk-br-glow--rose{
  left: -240px;
  top: -280px;
  background: radial-gradient(circle, rgba(232,162,182,0.26), transparent 70%);
}
.ayk-br-glow--gold{
  right: -260px;
  bottom: -300px;
  background: radial-gradient(circle, rgba(215,178,124,0.22), transparent 72%);
}

.ayk-br-head{
  display:flex;
  align-items:flex-start;
  justify-content: space-between;
  gap: 10px;
}
.ayk-br-titleWrap{ min-width: 0; }
.ayk-br-title{
  font-size: 16px;
  font-weight: 950;
}
.ayk-br-sub{
  margin-top: 4px;
  font-size: 12.5px;
  font-weight: 750;
  color: rgba(255,255,255,0.68);
  line-height: 1.4;
}
.ayk-br-x{
  width: 40px;
  height: 40px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.92);
  cursor: pointer;
  font-weight: 900;
}

.ayk-br-tabs{
  margin-top: 12px;
  display:flex;
  gap: 10px;
}
.ayk-br-tab{
  flex: 1;
  padding: 12px 12px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.86);
  font-weight: 950;
  cursor: pointer;
}
.ayk-br-tab--on{
  border-color: rgba(232,162,182,0.30);
  background:
    radial-gradient(220px 140px at 18% 12%, rgba(232,162,182,0.16), transparent 62%),
    radial-gradient(220px 140px at 82% 10%, rgba(215,178,124,0.12), transparent 62%),
    rgba(255,255,255,0.06);
}
.ayk-br-tab:disabled{
  opacity: 0.45;
  cursor: not-allowed;
}

.ayk-br-toast{
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 16px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  font-weight: 900;
  font-size: 12.5px;
}

.ayk-br-body{ margin-top: 12px; }
.ayk-br-label{
  font-size: 12px;
  font-weight: 950;
  color: rgba(255,255,255,0.78);
  margin-bottom: 10px;
}

.ayk-br-reasons{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
@media (max-width: 560px){
  .ayk-br-reasons{ grid-template-columns: 1fr; }
}

.ayk-br-reason{
  padding: 12px 12px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.88);
  cursor: pointer;
  display:flex;
  align-items:center;
  gap: 10px;
  text-align:left;
  font-weight: 900;
}
.ayk-br-reason--on{
  border-color: rgba(232,162,182,0.28);
  background: rgba(232,162,182,0.10);
}
.ayk-br-dot{
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: rgba(215,178,124,0.65);
  box-shadow: 0 0 14px rgba(215,178,124,0.45);
}
.ayk-br-reasonText{ font-size: 12.5px; }

.ayk-br-hint{
  margin-top: 10px;
  font-size: 12px;
  font-weight: 750;
  color: rgba(255,255,255,0.62);
  line-height: 1.45;
}

.ayk-br-textarea{
  margin-top: 10px;
  width: 100%;
  min-height: 92px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.92);
  padding: 12px 12px;
  outline: none;
  resize: none;
  font-weight: 750;
}

.ayk-br-blockBox{
  margin-top: 2px;
  padding: 12px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.05);
}
.ayk-br-blockTitle{
  font-weight: 950;
  font-size: 13.5px;
}
.ayk-br-blockText{
  margin-top: 6px;
  font-weight: 750;
  font-size: 12.5px;
  color: rgba(255,255,255,0.70);
  line-height: 1.45;
}

.ayk-br-actions{
  margin-top: 12px;
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
.ayk-btn--danger{
  background: rgba(255,59,59,0.16);
  border: 1px solid rgba(255,59,59,0.28);
  color: rgba(255,255,255,0.92);
}

.ayk-br-foot{
  margin-top: 12px;
  font-size: 11.5px;
  font-weight: 750;
  color: rgba(255,255,255,0.55);
  line-height: 1.45;
}
`;
