// src/screens/chat/components/MessageBubble.tsx

import React, { useMemo, useState } from "react";

export type MessageReaction = "❤️" | "😂" | "🔥" | "😍" | "😮" | "😢" | "👍" | "👎";

export type ChatMessage = {
  fromId: string;
  id: string;
  text?: string;
  createdAt: string; // ISO
  fromMe: boolean;

  // UI flags
  status?: "sending" | "sent" | "delivered" | "read" | "failed";
  isAdult?: boolean;

  // optional media
  media?: {
    type: "image";
    url: string;
  };

  // reactions
  reactions?: Partial<Record<MessageReaction, number>>;
  myReaction?: MessageReaction | null;

  // sender info (optional)
  senderName?: string;
  senderAvatarUrl?: string;
};

type MessageBubbleProps = {
  message: ChatMessage;

  // events
  onReact?: (messageId: string, reaction: MessageReaction | null) => void | Promise<void>;
  onRetrySend?: (messageId: string) => void | Promise<void>;
  onOpenProfile?: (userIdOrName: string) => void;

  // if you want a contextual menu later
  onReport?: (messageId: string) => void;
  onCopy?: (text: string) => void;

  className?: string;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onReact,
  onRetrySend,
  onOpenProfile,
  onReport,
  onCopy,
  className,
}) => {
  const [pickerOpen, setPickerOpen] = useState(false);

  const timeLabel = useMemo(() => formatTime(message.createdAt), [message.createdAt]);

  const bubbleClass = message.fromMe ? "ayk-bubble ayk-bubble--me" : "ayk-bubble ayk-bubble--them";
  const rowClass = message.fromMe ? "ayk-row ayk-row--me" : "ayk-row ayk-row--them";

  const statusLabel = useMemo(() => {
    const s = message.status;
    if (!message.fromMe) return "";
    if (s === "sending") return "Envoi…";
    if (s === "sent") return "Envoyé";
    if (s === "delivered") return "Reçu";
    if (s === "read") return "Lu";
    if (s === "failed") return "Échec";
    return "";
  }, [message.fromMe, message.status]);

  const safeText = (message.text ?? "").trim();

  const handleReact = async (r: MessageReaction) => {
    setPickerOpen(false);
    const next = message.myReaction === r ? null : r;
    await onReact?.(message.id, next);
  };

  const handleCopy = () => {
    if (!safeText) return;
    onCopy?.(safeText);
    try {
      void navigator.clipboard?.writeText(safeText);
    } catch {
      // ignore
    }
  };

  const handleLongPressToggle = () => {
    setPickerOpen((v) => !v);
  };

  return (
    <div className={[rowClass, className ?? ""].join(" ")}>
      <style>{css}</style>

      {!message.fromMe ? (
        <button
          type="button"
          className="ayk-avatar"
          onClick={() => onOpenProfile?.(message.senderName || "user")}
          aria-label="Voir le profil"
        >
          {message.senderAvatarUrl ? (
            <img src={message.senderAvatarUrl} alt="" />
          ) : (
            <div className="ayk-avatar__fallback" aria-hidden="true" />
          )}
        </button>
      ) : (
        <div className="ayk-avatar-spacer" />
      )}

      <div className="ayk-col">
        <div className={bubbleClass}>
          {/* adult flag */}
          {message.isAdult ? (
            <div className="ayk-tag" title="Contenu réservé aux adultes">
              🔞 +18
            </div>
          ) : null}

          {/* media */}
          {message.media?.type === "image" ? (
            <button
              type="button"
              className="ayk-media"
              onClick={handleLongPressToggle}
              aria-label="Réagir au message (image)"
            >
              <img src={message.media.url} alt="media" loading="lazy" />
            </button>
          ) : null}

          {/* text */}
          {safeText ? (
            <button
              type="button"
              className="ayk-text"
              onClick={handleLongPressToggle}
              onContextMenu={(e) => {
                e.preventDefault();
                setPickerOpen(true);
              }}
              aria-label="Réagir au message"
            >
              {safeText}
            </button>
          ) : null}

          {/* picker */}
          {pickerOpen ? (
            <div className={message.fromMe ? "ayk-picker ayk-picker--me" : "ayk-picker ayk-picker--them"}>
              <div className="ayk-picker__row">
                {REACTIONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={["ayk-reaction", message.myReaction === r ? "ayk-reaction--active" : ""].join(" ")}
                    onClick={() => void handleReact(r)}
                    aria-label={`Réaction ${r}`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div className="ayk-picker__actions">
                <button type="button" className="ayk-mini" onClick={handleCopy}>
                  Copier
                </button>
                {message.fromMe && message.status === "failed" ? (
                  <button type="button" className="ayk-mini ayk-mini--warn" onClick={() => void onRetrySend?.(message.id)}>
                    Renvoyer
                  </button>
                ) : null}
                <button type="button" className="ayk-mini" onClick={() => onReport?.(message.id)}>
                  Signaler
                </button>
                <button type="button" className="ayk-mini" onClick={() => setPickerOpen(false)}>
                  Fermer
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* reactions summary */}
        {message.reactions && Object.keys(message.reactions).length > 0 ? (
          <div className={message.fromMe ? "ayk-reactions ayk-reactions--me" : "ayk-reactions ayk-reactions--them"}>
            {Object.entries(message.reactions)
              .filter(([, count]) => (count ?? 0) > 0)
              .map(([emoji, count]) => (
                <span key={emoji} className="ayk-reactions__pill">
                  {emoji} {count}
                </span>
              ))}
          </div>
        ) : null}

        {/* meta */}
        <div className={message.fromMe ? "ayk-meta ayk-meta--me" : "ayk-meta ayk-meta--them"}>
          <span>{timeLabel}</span>
          {statusLabel ? <span className="ayk-dot">•</span> : null}
          {statusLabel ? <span className={message.status === "failed" ? "ayk-meta--bad" : ""}>{statusLabel}</span> : null}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

/* ===================== */

const REACTIONS: MessageReaction[] = ["❤️", "😂", "🔥", "😍", "😮", "😢", "👍", "👎"];

function formatTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

/* ================= CSS ================= */

const css = `
.ayk-row{
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 10px;
  padding: 8px 12px;
}
.ayk-row--me{
  grid-template-columns: 1fr 40px;
}
.ayk-avatar{
  width: 40px;
  height: 40px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  padding: 0;
  cursor: pointer;
}
.ayk-avatar img{ width:100%; height:100%; object-fit: cover; display:block; }
.ayk-avatar__fallback{
  width:100%;
  height:100%;
  background: linear-gradient(135deg, rgba(232,162,182,0.30), rgba(215,178,124,0.22));
}
.ayk-avatar-spacer{ width:40px; height:40px; }

.ayk-col{ min-width: 0; display:flex; flex-direction:column; }

.ayk-bubble{
  position: relative;
  max-width: 520px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(14px);
  box-shadow: 0 16px 44px rgba(0,0,0,0.32);
  overflow: visible;
}
.ayk-bubble--me{
  margin-left: auto;
  background:
    radial-gradient(220px 140px at 18% 12%, rgba(232,162,182,0.16), transparent 62%),
    radial-gradient(220px 140px at 82% 10%, rgba(215,178,124,0.12), transparent 62%),
    rgba(255,255,255,0.06);
}
.ayk-bubble--them{
  margin-right: auto;
  background: rgba(255,255,255,0.06);
}

.ayk-tag{
  display:inline-flex;
  margin: 10px 10px 0 10px;
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 900;
  color: rgba(255,255,255,0.85);
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.10);
}

.ayk-text{
  width: 100%;
  text-align: left;
  padding: 10px 12px 12px 12px;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.92);
  font-size: 14px;
  font-weight: 650;
  line-height: 1.45;
  cursor: pointer;
}
.ayk-row--me .ayk-text{ text-align: left; }

.ayk-media{
  width: 100%;
  padding: 10px 10px 0 10px;
  background: transparent;
  border: none;
  cursor: pointer;
}
.ayk-media img{
  width: 100%;
  height: auto;
  display: block;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.10);
}

.ayk-picker{
  position: absolute;
  top: -6px;
  transform: translateY(-100%);
  min-width: 260px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(10,8,12,0.92);
  backdrop-filter: blur(16px);
  box-shadow: 0 18px 50px rgba(0,0,0,0.55);
  padding: 10px;
  z-index: 5;
}
.ayk-picker--me{ right: 0; }
.ayk-picker--them{ left: 0; }

.ayk-picker__row{
  display:flex;
  gap: 6px;
  flex-wrap: wrap;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.10);
}
.ayk-reaction{
  width: 34px;
  height: 34px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  cursor: pointer;
  font-size: 16px;
}
.ayk-reaction--active{
  border-color: rgba(232,162,182,0.45);
  background: rgba(232,162,182,0.12);
}

.ayk-picker__actions{
  display:flex;
  gap: 8px;
  flex-wrap: wrap;
  padding-top: 8px;
}
.ayk-mini{
  padding: 8px 10px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.90);
  font-weight: 900;
  font-size: 12px;
  cursor: pointer;
}
.ayk-mini--warn{
  border: none;
  background: linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1));
  color: #140F16;
}

.ayk-reactions{
  display:flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 6px;
}
.ayk-reactions--me{ margin-left: auto; justify-content: flex-end; }
.ayk-reactions--them{ margin-right: auto; justify-content: flex-start; }
.ayk-reactions__pill{
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 900;
  color: rgba(255,255,255,0.90);
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
}

.ayk-meta{
  margin-top: 6px;
  font-size: 11px;
  font-weight: 800;
  color: rgba(255,255,255,0.55);
  display:flex;
  gap: 6px;
  align-items:center;
}
.ayk-meta--me{ margin-left: auto; justify-content: flex-end; }
.ayk-meta--them{ margin-right: auto; justify-content: flex-start; }
.ayk-dot{ opacity: 0.55; }
.ayk-meta--bad{ color: rgba(255,99,99,0.85); }
`;
