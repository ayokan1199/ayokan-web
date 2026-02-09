// src/screens/chat/ChatScreen.tsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ChatHeader, { type ChatHeaderUser } from "./components/ChatHeader";
import MessageBubble, { type ChatMessage } from "./components/MessageBubble";
import InputBar from "./components/InputBar";
import LimitReachedBanner from "./components/LimitReachedBanner";
import AdUnlockModal from "./components/AdUnlockModal";
import UpgradeModal from "./components/UpgradeModal";

import { createLimiter, type UserPlan } from "./services/messageLimiter";

/* =========================================================
   ChatScreen
   - aucune pub injectée dans le chat
   - BASIC: 10 msg/jour + pubs reward => packs
   - PREMIUM/VIP/GOLD: illimité
========================================================= */

const ChatScreen: React.FC = () => {
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId: string }>();

  // ⚠️ Remplace par ton vrai user (useAuth/useAuthController)
  const me = useMemo(
    () => ({
      id: "me",
      name: "Moi",
      avatarUrl: "https://picsum.photos/seed/me/200",
      plan: "basic" as UserPlan,
    }),
    []
  );

  // ⚠️ Peer: remplace par fetch via chatId
  const peer: ChatHeaderUser = useMemo(
    () => ({
      id: "u3",
      name: "Sarah",
      username: "sarah",
      avatarUrl: "https://picsum.photos/seed/sarah/200",
      isOnline: true,
      isVip: false,
      isGold: true,
      isPopular: true,
      isLive: true,
    }),
    []
  );

  const [messages, setMessages] = useState<ChatMessage[]>(() => seedMessages(peer.id));
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showAdUnlock, setShowAdUnlock] = useState(false);

  // Limiter (inclut la logique pubs + packs)
  const limiter = useMemo(() => createLimiter(me.id, me.plan), [me.id, me.plan]);
  const [status, setStatus] = useState(() => limiter.getStatus());

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setStatus(limiter.getStatus());
  }, [limiter]);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!listRef.current) return;
      listRef.current.scrollTop = listRef.current.scrollHeight;
    });
  }, [messages.length]);

  if (!chatId) {
    return (
      <div style={{ minHeight: "100vh", background: "#07060A", color: "white", padding: 20 }}>
        Chat introuvable.
      </div>
    );
  }

  const canSend = status.canSend;

  const handleSend = async (text: string) => {
    const fresh = limiter.getStatus();
    if (!fresh.canSend) {
      setShowAdUnlock(true);
      return;
    }

    limiter.consumeOneMessage();
    setStatus(limiter.getStatus());

    const msg: ChatMessage = {
      id: `m_${Date.now()}`,
      fromId: me.id,
      toId: peer.id,
      text,
      createdAt: new Date().toISOString(),
      status: "sent",
    };

    setMessages((prev) => [...prev, msg]);

    // TODO: Supabase insert message, puis update status delivered/read
  };

  const handleOpenProfile = () => navigate(`/profile/${encodeURIComponent(peer.id)}`);

  const handleBlock = () => {
    // TODO: Supabase block logic
    navigate("/chat", { replace: true });
  };

  const handleReport = () => {
    // TODO: Supabase report logic
    alert("Signalement envoyé (placeholder).");
  };

  const applyAdReward = () => {
    // 1 “rewarded ad” = 1 crédit
    limiter.registerAdWatched();
    setStatus(limiter.getStatus());
  };

  return (
    <div className="ayk-chat">
      <style>{css}</style>

      <div className="ayk-bg" />
      <div className="ayk-glow ayk-glow--rose" />
      <div className="ayk-glow ayk-glow--gold" />

      <div className="ayk-wrap">
        <ChatHeader
          peer={peer}
          onBack={() => navigate(-1)}
          onOpenProfile={handleOpenProfile}
          onBlock={handleBlock}
          onReport={handleReport}
        />

        {/* Banner si limite atteinte */}
        {!canSend ? (
          <div className="ayk-bannerWrap">
            <LimitReachedBanner
              remainingAds={status.adsRequiredToUnlock}
              dailyLimit={status.dailyFreeLimit}
              adsWatched={status.progressToUnlock}
              adsNeeded={status.adsPerUnlock}
              onWatchAd={() => setShowAdUnlock(true)}
              onUpgrade={() => setShowUpgrade(true)}
            />
          </div>
        ) : null}

        {/* Messages */}
        <div className="ayk-list" ref={listRef} role="log" aria-label="Messages">
          <div className="ayk-spaceTop" />

          {messages.map((m) => (
            <MessageBubble
              key={m.id}
              message={m}
              isMine={m.fromId === me.id}
              peerAvatarUrl={peer.avatarUrl}
              peerName={peer.name}
              onReact={(emoji) => {
                setMessages((prev) => prev.map((x) => (x.id === m.id ? { ...x, reaction: emoji } : x)));
              }}
            />
          ))}

          <div className="ayk-spaceBottom" />
        </div>

        {/* Input */}
        <div className="ayk-input">
          <InputBar
            disabled={!canSend}
            remaining={status.totalRemainingForBasic}
            dailyLimit={status.dailyFreeLimit}
            plan={me.plan}
            onSend={handleSend}
            onOpenUpgrade={() => setShowUpgrade(true)}
            onOpenAdUnlock={() => setShowAdUnlock(true)}
          />
        </div>
      </div>

      {/* Modals */}
      {showAdUnlock ? (
        <AdUnlockModal
          open={showAdUnlock}
          progress={status.progressToUnlock}
          goal={status.adsPerUnlock}
          unlockedMessages={status.unlockedRemaining}
          onClose={() => setShowAdUnlock(false)}
          onWatchAd={() => {
            applyAdReward();
            // tu peux garder ouvert jusqu’à unlock, mais là on laisse l’UI décider
            if (limiter.getStatus().progressToUnlock === 0 && limiter.getStatus().unlockedRemaining > status.unlockedRemaining) {
              setShowAdUnlock(false);
            }
          }}
          onUpgrade={() => {
            setShowAdUnlock(false);
            setShowUpgrade(true);
          }}
        />
      ) : null}

      {showUpgrade ? (
        <UpgradeModal
          open={showUpgrade}
          onClose={() => setShowUpgrade(false)}
          onChoosePlan={(plan) => {
            alert(`Choix plan: ${plan} (placeholder)`);
            setShowUpgrade(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default ChatScreen;

/* =========================================================
   MOCK
========================================================= */

function seedMessages(peerId: string): ChatMessage[] {
  const now = Date.now();
  return [
    {
      id: "m1",
      fromId: peerId,
      toId: "me",
      text: "Hey 🙂 tu fais quoi ?",
      createdAt: new Date(now - 1000 * 60 * 12).toISOString(),
      status: "read",
    },
    {
      id: "m2",
      fromId: "me",
      toId: peerId,
      text: "Je suis là. Et toi ?",
      createdAt: new Date(now - 1000 * 60 * 11).toISOString(),
      status: "read",
    },
    {
      id: "m3",
      fromId: peerId,
      toId: "me",
      text: "On se capte ce soir ? 😄",
      createdAt: new Date(now - 1000 * 60 * 9).toISOString(),
      status: "delivered",
    },
  ];
}

/* =========================================================
   STYLES
========================================================= */

const css = `
.ayk-chat{
  min-height: 100vh;
  background: #07060A;
  color: rgba(255,255,255,0.92);
  position: relative;
  overflow: hidden;
}
.ayk-bg{
  position:absolute;
  inset:0;
  background: linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.92));
}
.ayk-glow{
  position:absolute;
  width: 820px;
  height: 620px;
  border-radius: 999px;
  filter: blur(26px);
  pointer-events:none;
  opacity: 0.55;
}
.ayk-glow--rose{
  left: -260px;
  top: -220px;
  background: radial-gradient(circle, rgba(232,162,182,0.22), transparent 72%);
}
.ayk-glow--gold{
  right: -260px;
  top: -260px;
  background: radial-gradient(circle, rgba(215,178,124,0.20), transparent 72%);
}

.ayk-wrap{
  position: relative;
  z-index: 1;
  display:flex;
  flex-direction: column;
  height: 100vh;
  max-width: 980px;
  margin: 0 auto;
}

.ayk-bannerWrap{
  padding: 10px 12px 0;
}

.ayk-list{
  flex: 1;
  overflow: auto;
  padding: 0 12px;
}
.ayk-spaceTop{ height: 10px; }
.ayk-spaceBottom{ height: 12px; }

.ayk-input{
  padding: 10px 12px 14px;
}
`;
