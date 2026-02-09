// src/screens/chat/components/InputBar.tsx

import React, { useMemo, useState } from "react";

export type InputBarAccountType = "basic" | "basic_plus_pub" | "premium" | "vip" | "gold";

export type InputBarCounters = {
  remainingToday: number; // ex: 7 (messages restants aujourd’hui)
  dailyLimit: number;     // ex: 10
  unlockedPool?: number;  // ex: 25 (messages débloqués via pubs)
  unlockedUsed?: number;  // ex: 3
};

type InputBarProps = {
  accountType: InputBarAccountType;

  counters: InputBarCounters;

  disabled?: boolean;
  placeholder?: string;

  onSend: (text: string) => void | Promise<void>;

  // si basic et limite atteinte -> ouvrir modal pub
  onOpenAdUnlock?: () => void;

  // upsell direct
  onOpenUpgrade?: () => void;

  className?: string;
};

const InputBar: React.FC<InputBarProps> = ({
  accountType,
  counters,
  disabled = false,
  placeholder = "💬 Tape ton message…",
  onSend,
  onOpenAdUnlock,
  onOpenUpgrade,
  className,
}) => {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const isUnlimited = accountType === "premium" || accountType === "vip" || accountType === "gold";

  const unlockedLeft = useMemo(() => {
    const pool = counters.unlockedPool ?? 0;
    const used = counters.unlockedUsed ?? 0;
    return Math.max(0, pool - used);
  }, [counters.unlockedPool, counters.unlockedUsed]);

  const canSend = useMemo(() => {
    if (disabled || sending) return false;
    if (isUnlimited) return true;

    // basic / basic_plus_pub
    if (counters.remainingToday > 0) return true;
    if (unlockedLeft > 0) return true;

    return false;
  }, [disabled, sending, isUnlimited, counters.remainingToday, unlockedLeft]);

  const isLocked = !isUnlimited && counters.remainingToday <= 0 && unlockedLeft <= 0;

  const counterLabel = useMemo(() => {
    if (isUnlimited) return "∞ illimité";

    // priorise pool débloqué quand la limite free est vide
    if (counters.remainingToday > 0) return `${counters.remainingToday} / ${counters.dailyLimit} messages`;
    if (unlockedLeft > 0) return `${unlockedLeft} / ${(counters.unlockedPool ?? 0)} messages débloqués`;

    return `0 / ${counters.dailyLimit} messages`;
  }, [isUnlimited, counters.remainingToday, counters.dailyLimit, unlockedLeft, counters.unlockedPool]);

  const handleSend = async () => {
    const v = text.trim();
    if (!v) return;

    if (!canSend) {
      // friction intelligente
      if (isLocked && onOpenAdUnlock) onOpenAdUnlock();
      else if (onOpenUpgrade) onOpenUpgrade();
      return;
    }

    setSending(true);
    try {
      await onSend(v);
      setText("");
    } finally {
      setSending(false);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <div className={["ayk-inputbar", className ?? ""].join(" ")}>
      <style>{css}</style>

      {/* Banner friction quand bloqué */}
      {isLocked ? (
        <div className="ayk-lockbar" role="status" aria-label="Limite atteinte">
          <div className="ayk-lockbar__text">
            <span className="ayk-lockbar__title">🔥 Limite atteinte</span>
            <span className="ayk-lockbar__sub">
              Regarde 10 pubs pour débloquer +25 messages, ou passe Premium.
            </span>
          </div>

          <div className="ayk-lockbar__actions">
            <button
              type="button"
              className="ayk-btn ayk-btn--soft"
              onClick={() => onOpenAdUnlock?.()}
            >
              Regarder une pub
            </button>

            <button
              type="button"
              className="ayk-btn ayk-btn--primary"
              onClick={() => onOpenUpgrade?.()}
            >
              Passer Premium 💎
            </button>
          </div>
        </div>
      ) : null}

      <div className="ayk-inputbar__row">
        <div className="ayk-inputwrap">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="ayk-input"
            aria-label="Message"
          />

          <div className="ayk-counter" aria-label="Compteur messages">
            {counterLabel}
          </div>
        </div>

        <button
          type="button"
          className="ayk-send"
          onClick={() => void handleSend()}
          disabled={disabled || sending || text.trim().length === 0}
          aria-label="Envoyer"
          title="Envoyer"
        >
          {sending ? "…" : "➤"}
        </button>
      </div>

      {/* Micro note upsell discret si basic */}
      {!isUnlimited ? (
        <div className="ayk-hint">
          Astuce: Premium = messages illimités, zéro pub.
          <button type="button" className="ayk-hint__link" onClick={() => onOpenUpgrade?.()}>
            Voir Premium
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default InputBar;

/* ===================== CSS ===================== */

const css = `
.ayk-inputbar{
  position: sticky;
  bottom: 0;
  z-index: 40;
  padding: 10px 12px 12px;
  background:
    radial-gradient(260px 180px at 18% 0%, rgba(232,162,182,0.12), transparent 62%),
    radial-gradient(260px 180px at 82% 0%, rgba(215,178,124,0.10), transparent 62%),
    rgba(0,0,0,0.68);
  border-top: 1px solid rgba(255,255,255,0.10);
  backdrop-filter: blur(18px);
}

.ayk-lockbar{
  margin-bottom: 10px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  padding: 12px;
}
.ayk-lockbar__text{
  display: grid;
  gap: 4px;
}
.ayk-lockbar__title{
  color: rgba(255,255,255,0.92);
  font-weight: 950;
}
.ayk-lockbar__sub{
  color: rgba(255,255,255,0.65);
  font-weight: 800;
  font-size: 12px;
  line-height: 1.35;
}
.ayk-lockbar__actions{
  display: flex;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.ayk-inputbar__row{
  display: flex;
  gap: 10px;
  align-items: flex-end;
}

.ayk-inputwrap{
  flex: 1;
  min-width: 0;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  padding: 10px 12px 8px;
}

.ayk-input{
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: rgba(255,255,255,0.92);
  font-weight: 800;
  font-size: 14px;
}

.ayk-counter{
  margin-top: 6px;
  font-size: 11px;
  font-weight: 900;
  color: rgba(255,255,255,0.55);
}

.ayk-send{
  width: 48px;
  height: 48px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.12);
  background: linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1));
  color: #140F16;
  font-weight: 1000;
  cursor: pointer;
  box-shadow: 0 18px 44px rgba(0,0,0,0.45);
}
.ayk-send:disabled{
  opacity: 0.55;
  cursor: not-allowed;
  box-shadow: none;
}

.ayk-btn{
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 14px;
  padding: 10px 12px;
  font-weight: 950;
  cursor: pointer;
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
}
.ayk-btn:active{ transform: scale(0.99); }

.ayk-hint{
  margin-top: 8px;
  font-size: 12px;
  font-weight: 800;
  color: rgba(255,255,255,0.55);
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.ayk-hint__link{
  border: none;
  background: transparent;
  color: rgba(232,162,182,0.95);
  font-weight: 950;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
}
`;
