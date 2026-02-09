// src/screens/chat/components/ChatHeader.tsx

import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export type ChatHeaderUser = {
  id: string;
  name: string;
  username?: string;
  avatarUrl?: string;

  isOnline?: boolean;

  // badges
  isVip?: boolean; // ⭐ VIP
  isGold?: boolean; // 💎 Gold
  isPopular?: boolean; // 🔥 Populaire
  isLive?: boolean; // 📺 LIVE (optionnel)
};

type ChatHeaderProps = {
  peer: ChatHeaderUser;

  onBack?: () => void;

  // ✅ noms alignés avec ChatScreen
  onOpenProfile?: () => void;
  onBlock?: () => void;
  onReport?: () => void;

  className?: string;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
  peer,
  onBack,
  onOpenProfile,
  onBlock,
  onReport,
  className,
}) => {
  const navigate = useNavigate();

  const initials = useMemo(() => {
    const parts = (peer.name || "").trim().split(/\s+/).filter(Boolean);
    const a = parts[0]?.[0] ?? "A";
    const b = parts[1]?.[0] ?? "";
    return (a + b).toUpperCase();
  }, [peer.name]);

  const openProfile = () => {
    if (onOpenProfile) return onOpenProfile();
    navigate(`/profile/${encodeURIComponent(peer.id)}`);
  };

  const back = () => {
    if (onBack) return onBack();
    navigate(-1);
  };

  const block = () => {
    if (onBlock) return onBlock();
  };

  const report = () => {
    if (onReport) return onReport();
  };

  return (
    <header className={["ayk-chat-header", className ?? ""].join(" ")}>
      <style>{css}</style>

      <div className="ayk-chat-header__inner">
        <button type="button" onClick={back} className="ayk-icon-btn" aria-label="Retour">
          <span aria-hidden="true">←</span>
        </button>

        <button
          type="button"
          onClick={openProfile}
          className="ayk-peer"
          aria-label={`Voir le profil de ${peer.name}`}
        >
          <div className="ayk-avatar" aria-hidden="true">
            {peer.avatarUrl ? (
              <img src={peer.avatarUrl} alt={peer.name} className="ayk-avatar__img" />
            ) : (
              <div className="ayk-avatar__fallback">{initials}</div>
            )}

            {peer.isOnline ? <span className="ayk-online-dot" aria-hidden="true" /> : null}
          </div>

          <div className="ayk-peer__meta">
            <div className="ayk-peer__row">
              <span className="ayk-peer__name">{peer.name}</span>

              {peer.isGold ? (
                <span className="ayk-badge ayk-badge--gold" aria-label="Membre Gold" title="Gold">
                  💎
                </span>
              ) : null}

              {peer.isVip ? (
                <span className="ayk-badge ayk-badge--vip" aria-label="Membre VIP" title="VIP">
                  ⭐ VIP
                </span>
              ) : null}

              {peer.isPopular ? (
                <span className="ayk-badge ayk-badge--hot" aria-label="Populaire" title="Populaire">
                  🔥
                </span>
              ) : null}

              {peer.isLive ? (
                <span className="ayk-badge ayk-badge--live" aria-label="En live" title="En live">
                  📺 LIVE
                </span>
              ) : null}
            </div>

            <div className="ayk-peer__sub">
              {peer.username ? `@${peer.username}` : peer.isOnline ? "En ligne" : "Hors ligne"}
            </div>
          </div>
        </button>

        <div className="ayk-actions">
          <button type="button" onClick={openProfile} className="ayk-pill" aria-label="Voir profil">
            Profil
          </button>

          <div className="ayk-menu">
            <details>
              <summary className="ayk-icon-btn" aria-label="Options">
                <span aria-hidden="true">⋯</span>
              </summary>

              <div className="ayk-menu__panel" role="menu" aria-label="Options chat">
                <button type="button" className="ayk-menu__item" onClick={report} role="menuitem">
                  Signaler
                </button>
                <button
                  type="button"
                  className="ayk-menu__item ayk-menu__danger"
                  onClick={block}
                  role="menuitem"
                >
                  Bloquer
                </button>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;

/* ===================== CSS ===================== */

const css = `
.ayk-chat-header{
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(18px);
  background:
    radial-gradient(260px 180px at 18% 10%, rgba(232,162,182,0.14), transparent 62%),
    radial-gradient(260px 180px at 82% 10%, rgba(215,178,124,0.12), transparent 62%),
    rgba(0,0,0,0.55);
  border-bottom: 1px solid rgba(255,255,255,0.10);
}

.ayk-chat-header__inner{
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
}

.ayk-icon-btn{
  width: 42px;
  height: 42px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.92);
  font-weight: 950;
  cursor: pointer;
}
.ayk-icon-btn:active{ transform: scale(0.99); }
.ayk-icon-btn:hover{ background: rgba(255,255,255,0.10); }

.ayk-peer{
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.05);
  text-align: left;
  cursor: pointer;
}
.ayk-peer:hover{ background: rgba(255,255,255,0.08); }

.ayk-avatar{
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  flex: 0 0 auto;
}
.ayk-avatar__img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.ayk-avatar__fallback{
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  font-weight: 950;
  color: rgba(255,255,255,0.85);
  background: linear-gradient(135deg, rgba(232,162,182,0.22), rgba(215,178,124,0.18));
}

.ayk-online-dot{
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  right: 6px;
  bottom: 6px;
  background: rgb(34,197,94);
  box-shadow: 0 0 14px rgba(34,197,94,0.55);
  border: 2px solid rgba(0,0,0,0.45);
}

.ayk-peer__meta{ min-width: 0; }
.ayk-peer__row{
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.ayk-peer__name{
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 950;
  color: rgba(255,255,255,0.92);
  letter-spacing: -0.1px;
}
.ayk-peer__sub{
  margin-top: 2px;
  font-size: 12px;
  font-weight: 800;
  color: rgba(255,255,255,0.62);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ayk-badge{
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 950;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.35);
  color: rgba(255,255,255,0.88);
}
.ayk-badge--vip{
  background: rgba(215,178,124,0.16);
  border: 1px solid rgba(215,178,124,0.26);
  color: rgba(255,230,190,0.92);
}
.ayk-badge--gold{
  background: rgba(34,197,94,0.14);
  border: 1px solid rgba(34,197,94,0.22);
  color: rgba(210,255,225,0.95);
}
.ayk-badge--hot{
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.88);
}
.ayk-badge--live{
  background: rgba(232,162,182,0.12);
  border: 1px solid rgba(232,162,182,0.22);
  color: rgba(255,225,235,0.92);
}

.ayk-actions{
  display: flex;
  align-items: center;
  gap: 10px;
}

.ayk-pill{
  height: 42px;
  padding: 0 12px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.92);
  font-weight: 950;
  cursor: pointer;
}
.ayk-pill:hover{ background: rgba(255,255,255,0.10); }
.ayk-pill:active{ transform: scale(0.99); }

.ayk-menu details{ position: relative; }
.ayk-menu summary{ list-style: none; }
.ayk-menu summary::-webkit-details-marker{ display:none; }

.ayk-menu__panel{
  position: absolute;
  right: 0;
  top: 48px;
  width: 180px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(10,8,12,0.92);
  backdrop-filter: blur(18px);
  box-shadow: 0 18px 60px rgba(0,0,0,0.65);
  overflow: hidden;
}
.ayk-menu__item{
  width: 100%;
  padding: 12px 12px;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.90);
  font-weight: 900;
  text-align: left;
  cursor: pointer;
}
.ayk-menu__item:hover{ background: rgba(255,255,255,0.06); }
.ayk-menu__danger{ color: rgba(255,120,120,0.95); }
`;
