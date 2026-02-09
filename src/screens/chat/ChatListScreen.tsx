// src/screens/chat/ChatListScreen.tsx

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/* =======================
   TYPES
======================= */

export type ChatListItem = {
  id: string; // chatId
  peerId: string;
  peerName: string;
  peerUsername?: string;
  peerAvatarUrl: string;

  lastMessage?: string;
  lastAt?: string; // ISO
  unreadCount?: number;

  // badges
  isOnline?: boolean;   // 🟢
  isVip?: boolean;      // ⭐ (doré)
  isPopular?: boolean;  // 🔥
  isGold?: boolean;     // 💎 + badge vert
};

type ChatListScreenProps = {
  items?: ChatListItem[];
  onOpenChat?: (chatId: string) => void;
  onOpenProfile?: (userId: string) => void;
};

/* =======================
   SCREEN
======================= */

const ChatListScreen: React.FC<ChatListScreenProps> = ({ items, onOpenChat, onOpenProfile }) => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const data = useMemo(() => {
    const base = (items && items.length ? items : mockChats).slice();
    const query = q.trim().toLowerCase();
    if (!query) return base;
    return base.filter((c) => {
      return (
        c.peerName.toLowerCase().includes(query) ||
        (c.peerUsername || "").toLowerCase().includes(query) ||
        (c.lastMessage || "").toLowerCase().includes(query)
      );
    });
  }, [items, q]);

  const openChat = (chatId: string) => {
    if (onOpenChat) return onOpenChat(chatId);
    navigate(`/chat/${encodeURIComponent(chatId)}`);
  };

  const openProfile = (userId: string) => {
    if (onOpenProfile) return onOpenProfile(userId);
    navigate(`/profile/${encodeURIComponent(userId)}`);
  };

  return (
    <div className="ayk-chatlist">
      <style>{css}</style>

      <div className="ayk-chatlist-bg" />
      <div className="ayk-chatlist-glow ayk-chatlist-glow--rose" />
      <div className="ayk-chatlist-glow ayk-chatlist-glow--gold" />

      <div className="ayk-chatlist-wrap">
        <div className="ayk-chatlist-top">
          <div>
            <div className="ayk-chatlist-title">Messages</div>
            <div className="ayk-chatlist-sub">Discussions, VIP, Gold, et activité en temps réel.</div>
          </div>

          <button
            type="button"
            className="ayk-chatlist-new"
            onClick={() => navigate("/messages/new")}
            aria-label="Nouveau message"
          >
            + Nouveau
          </button>
        </div>

        <div className="ayk-chatlist-search">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un membre, @pseudo, mot..."
            className="ayk-chatlist-input"
          />
        </div>

        <div className="ayk-chatlist-card">
          {data.length === 0 ? (
            <div className="ayk-chatlist-empty">
              <div className="ayk-chatlist-emptyTitle">Aucune conversation</div>
              <div className="ayk-chatlist-emptySub">Lance une discussion depuis Explorer ou Plan Cul ⭐.</div>
              <button type="button" className="ayk-btn ayk-btn--primary" onClick={() => navigate("/explorer")}>
                Explorer
              </button>
            </div>
          ) : (
            <div className="ayk-chatlist-list" role="list" aria-label="Liste des chats">
              {data.map((c) => (
                <ChatRow
                  key={c.id}
                  item={c}
                  onOpen={() => openChat(c.id)}
                  onOpenProfile={() => openProfile(c.peerId)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="ayk-chatlist-foot">
          Pub jamais injectée dans la conversation. Déblocage uniquement sur action volontaire.
        </div>
      </div>
    </div>
  );
};

export default ChatListScreen;

/* =======================
   ROW
======================= */

const ChatRow: React.FC<{
  item: ChatListItem;
  onOpen: () => void;
  onOpenProfile: () => void;
}> = ({ item, onOpen, onOpenProfile }) => {
  const unread = Math.max(0, item.unreadCount || 0);

  return (
    <div className="ayk-row" role="listitem">
      <button type="button" className="ayk-row-main" onClick={onOpen} aria-label={`Ouvrir chat avec ${item.peerName}`}>
        <div className="ayk-row-left">
          <button type="button" className="ayk-avatarBtn" onClick={(e) => (e.stopPropagation(), onOpenProfile())}>
            <Avatar
              src={item.peerAvatarUrl}
              alt={item.peerName}
              isOnline={!!item.isOnline}
              hasGold={!!item.isGold}
              hasVip={!!item.isVip}
            />
          </button>
        </div>

        <div className="ayk-row-mid">
          <div className="ayk-row-topline">
            <div className="ayk-row-nameWrap">
              <span className="ayk-row-name">{item.peerName}</span>

              {item.isGold ? <BadgeGreenDiamond /> : null}
              {item.isVip ? <BadgeVip /> : null}
              {item.isPopular ? <BadgeHot /> : null}
              {item.isOnline ? <BadgeOnline /> : null}
            </div>

            {unread > 0 ? <div className="ayk-row-unread">{unread > 99 ? "99+" : unread}</div> : null}
          </div>

          <div className="ayk-row-botline">
            <div className="ayk-row-last">
              <span className="ayk-row-handle">{item.peerUsername ? `@${item.peerUsername}` : ""}</span>
              <span className="ayk-row-dot">{item.peerUsername ? "•" : ""}</span>
              <span className="ayk-row-msg">{item.lastMessage || "Démarrer la conversation…"}</span>
            </div>

            <div className="ayk-row-time">{formatTime(item.lastAt)}</div>
          </div>
        </div>
      </button>

      <button
        type="button"
        className="ayk-row-profile"
        onClick={onOpenProfile}
        aria-label={`Voir profil de ${item.peerName}`}
      >
        Profil
      </button>
    </div>
  );
};

/* =======================
   UI PIECES
======================= */

const Avatar: React.FC<{
  src: string;
  alt: string;
  isOnline: boolean;
  hasGold: boolean;
  hasVip: boolean;
}> = ({ src, alt, isOnline, hasGold, hasVip }) => {
  const ringClass = hasGold ? "ayk-ava-ring ayk-ava-ring--gold" : hasVip ? "ayk-ava-ring ayk-ava-ring--vip" : "";

  return (
    <div className="ayk-ava">
      {ringClass ? <div className={ringClass} /> : null}
      <div className="ayk-ava-img">
        <img src={src} alt={alt} loading="lazy" />
      </div>
      {isOnline ? <span className="ayk-ava-online" aria-label="En ligne" /> : null}
    </div>
  );
};

const BadgeOnline = () => (
  <span className="ayk-badge ayk-badge--online" aria-label="En ligne">
    🟢
  </span>
);
const BadgeVip = () => (
  <span className="ayk-badge ayk-badge--vip" aria-label="VIP">
    ⭐
  </span>
);
const BadgeHot = () => (
  <span className="ayk-badge ayk-badge--hot" aria-label="Populaire">
    🔥
  </span>
);
const BadgeGreenDiamond = () => (
  <span className="ayk-badge ayk-badge--gold" aria-label="Gold">
    💎
  </span>
);

/* =======================
   HELPERS
======================= */

function formatTime(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

/* =======================
   MOCK DATA (safe fallback)
======================= */

const mockChats: ChatListItem[] = [
  {
    id: "c1",
    peerId: "u1",
    peerName: "Mina",
    peerUsername: "mina",
    peerAvatarUrl: "https://picsum.photos/seed/mina/200",
    lastMessage: "Tu fais quoi ce soir ?",
    lastAt: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
    unreadCount: 2,
    isOnline: true,
    isVip: true,
  },
  {
    id: "c2",
    peerId: "u2",
    peerName: "Kevin",
    peerUsername: "kev",
    peerAvatarUrl: "https://picsum.photos/seed/kev/200",
    lastMessage: "J’ai vu ton live 😄",
    lastAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    unreadCount: 0,
    isPopular: true,
  },
  {
    id: "c3",
    peerId: "u3",
    peerName: "Sarah",
    peerUsername: "sarah",
    peerAvatarUrl: "https://picsum.photos/seed/sarah/200",
    lastMessage: "Gold ici ✨",
    lastAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    unreadCount: 7,
    isGold: true,
    isOnline: true,
  },
];

/* =======================
   STYLES (rose doré premium)
======================= */

const css = `
.ayk-chatlist{
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: #07060A;
  color: rgba(255,255,255,0.92);
}
.ayk-chatlist-bg{
  position:absolute;
  inset:0;
  background: linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.92));
}
.ayk-chatlist-glow{
  position:absolute;
  width: 820px;
  height: 620px;
  border-radius: 999px;
  filter: blur(26px);
  pointer-events:none;
  opacity: 0.55;
}
.ayk-chatlist-glow--rose{
  left: -260px;
  top: -220px;
  background: radial-gradient(circle, rgba(232,162,182,0.22), transparent 72%);
}
.ayk-chatlist-glow--gold{
  right: -260px;
  top: -260px;
  background: radial-gradient(circle, rgba(215,178,124,0.20), transparent 72%);
}

.ayk-chatlist-wrap{
  position: relative;
  z-index: 1;
  width: min(820px, 100%);
  margin: 0 auto;
  padding: 22px 16px 24px;
}

.ayk-chatlist-top{
  display:flex;
  align-items:flex-start;
  justify-content: space-between;
  gap: 12px;
}
.ayk-chatlist-title{
  font-size: 18px;
  font-weight: 950;
  letter-spacing: 0.2px;
}
.ayk-chatlist-sub{
  margin-top: 6px;
  font-size: 12.5px;
  font-weight: 750;
  color: rgba(255,255,255,0.62);
}

.ayk-chatlist-new{
  height: 44px;
  padding: 0 14px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.92);
  font-weight: 950;
  cursor: pointer;
}
.ayk-chatlist-new:hover{ background: rgba(255,255,255,0.10); }

.ayk-chatlist-search{
  margin-top: 14px;
}
.ayk-chatlist-input{
  width: 100%;
  height: 46px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.92);
  padding: 0 14px;
  font-weight: 850;
  outline: none;
}
.ayk-chatlist-input::placeholder{ color: rgba(255,255,255,0.45); }

.ayk-chatlist-card{
  margin-top: 14px;
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,0.12);
  background:
    radial-gradient(260px 180px at 18% 12%, rgba(232,162,182,0.14), transparent 62%),
    radial-gradient(260px 180px at 82% 10%, rgba(215,178,124,0.12), transparent 62%),
    rgba(255,255,255,0.05);
  backdrop-filter: blur(16px);
  box-shadow: 0 18px 60px rgba(0,0,0,0.55);
  overflow: hidden;
}

.ayk-chatlist-list{
  display:flex;
  flex-direction: column;
}

.ayk-row{
  display:flex;
  align-items: stretch;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.ayk-row:first-child{ border-top: none; }

.ayk-row-main{
  flex:1;
  display:flex;
  gap: 12px;
  padding: 14px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
}
.ayk-row-main:hover{
  background: rgba(255,255,255,0.04);
}

.ayk-row-left{ display:flex; align-items:flex-start; }
.ayk-avatarBtn{
  border:none;
  background:transparent;
  padding:0;
  cursor:pointer;
}

.ayk-row-mid{ flex:1; min-width:0; }

.ayk-row-topline{
  display:flex;
  align-items:center;
  justify-content: space-between;
  gap: 10px;
}
.ayk-row-nameWrap{
  display:flex;
  align-items:center;
  gap: 8px;
  min-width:0;
}
.ayk-row-name{
  font-weight: 950;
  color: rgba(255,255,255,0.92);
  max-width: 240px;
  overflow:hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ayk-row-unread{
  min-width: 26px;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  background: rgba(232,162,182,0.22);
  border: 1px solid rgba(232,162,182,0.30);
  color: rgba(255,255,255,0.95);
  font-weight: 950;
  font-size: 12px;
  display:flex;
  align-items:center;
  justify-content:center;
}

.ayk-row-botline{
  margin-top: 6px;
  display:flex;
  align-items:center;
  justify-content: space-between;
  gap: 10px;
}
.ayk-row-last{
  min-width:0;
  display:flex;
  align-items:center;
  gap: 8px;
  color: rgba(255,255,255,0.62);
  font-weight: 800;
  font-size: 12.5px;
}
.ayk-row-handle{ color: rgba(255,255,255,0.58); }
.ayk-row-dot{ color: rgba(255,255,255,0.35); }
.ayk-row-msg{
  min-width:0;
  overflow:hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ayk-row-time{
  color: rgba(255,255,255,0.45);
  font-weight: 850;
  font-size: 12px;
  flex-shrink: 0;
}

.ayk-row-profile{
  width: 88px;
  border: none;
  background: rgba(255,255,255,0.03);
  border-left: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.82);
  font-weight: 950;
  cursor: pointer;
}
.ayk-row-profile:hover{ background: rgba(255,255,255,0.06); }

.ayk-ava{
  position: relative;
  width: 52px;
  height: 52px;
}
.ayk-ava-ring{
  position:absolute;
  inset: -3px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.10);
  filter: drop-shadow(0 10px 24px rgba(0,0,0,0.35));
}
.ayk-ava-ring--vip{
  background: conic-gradient(from 180deg, rgba(215,178,124,0), rgba(215,178,124,0.55), rgba(232,162,182,0.35), rgba(215,178,124,0));
  animation: aykRing 2.8s linear infinite;
}
.ayk-ava-ring--gold{
  background: conic-gradient(from 180deg, rgba(34,197,94,0), rgba(34,197,94,0.55), rgba(215,178,124,0.35), rgba(34,197,94,0));
  animation: aykRing 2.6s linear infinite;
}
@keyframes aykRing{ from{ transform: rotate(0deg); } to{ transform: rotate(360deg);} }

.ayk-ava-img{
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 18px;
  overflow:hidden;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
}
.ayk-ava-img img{
  width:100%;
  height:100%;
  object-fit: cover;
  display:block;
}
.ayk-ava-online{
  position:absolute;
  right: -2px;
  bottom: -2px;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: rgb(34,197,94);
  box-shadow: 0 0 14px rgba(34,197,94,0.70);
  border: 2px solid rgba(8,7,10,0.95);
}

.ayk-badge{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  height: 20px;
  min-width: 20px;
  padding: 0 6px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.25);
  font-size: 11px;
}
.ayk-badge--vip{
  background: rgba(215,178,124,0.16);
  border-color: rgba(215,178,124,0.24);
}
.ayk-badge--hot{
  background: rgba(255,90,90,0.14);
  border-color: rgba(255,90,90,0.22);
}
.ayk-badge--online{
  background: rgba(34,197,94,0.12);
  border-color: rgba(34,197,94,0.18);
}
.ayk-badge--gold{
  background: rgba(34,197,94,0.16);
  border-color: rgba(34,197,94,0.24);
}

.ayk-chatlist-empty{
  padding: 22px 16px;
  text-align: center;
}
.ayk-chatlist-emptyTitle{
  font-weight: 950;
  font-size: 16px;
}
.ayk-chatlist-emptySub{
  margin-top: 6px;
  color: rgba(255,255,255,0.62);
  font-weight: 800;
  font-size: 12.5px;
  line-height: 1.45;
}
.ayk-btn{
  margin-top: 12px;
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

.ayk-chatlist-foot{
  margin-top: 14px;
  font-size: 12px;
  font-weight: 800;
  color: rgba(255,255,255,0.50);
  text-align:center;
}

@media (max-width: 520px){
  .ayk-row-profile{ display:none; }
  .ayk-row-name{ max-width: 180px; }
}
`;
