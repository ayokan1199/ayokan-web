// src/screens/home/feed/PostHeader.tsx
import React, { useMemo, useState } from "react";

export type PostHeaderBadge = "new" | "premium" | "popular" | "vip" | "gold";

export type PostHeaderUser = {
  id: string;
  name: string;
  username?: string;
  avatarUrl: string;

  // status
  isLive?: boolean;

  // badges (business rules)
  isNew?: boolean;
  isPremium?: boolean; // ⭐ premium
  isPopular?: boolean; // 🔥 populaire
  isVip?: boolean; // VIP
  isGold?: boolean; // Gold (diamant + badge vert)
};

type PostHeaderProps = {
  user: PostHeaderUser;

  createdAt?: string; // ISO
  locationLabel?: string;
  isSponsored?: boolean;

  isFollowing?: boolean;
  onFollowToggle?: (userId: string, next: boolean) => void | Promise<void>;

  onOpenProfile?: (userId: string) => void;
  onMenu?: (userId: string) => void;

  className?: string;
};

const PostHeader: React.FC<PostHeaderProps> = ({
  user,
  createdAt,
  locationLabel,
  isSponsored,
  isFollowing = false,
  onFollowToggle,
  onOpenProfile,
  onMenu,
  className,
}) => {
  const [busy, setBusy] = useState(false);
  const [localFollowing, setLocalFollowing] = useState(isFollowing);

  const metaLine = useMemo(() => {
    const parts: string[] = [];
    if (isSponsored) parts.push("Sponsorisé");
    const time = createdAt ? formatRelative(createdAt) : "";
    if (time) parts.push(time);
    if (locationLabel) parts.push(locationLabel);
    return parts.join(" • ");
  }, [createdAt, locationLabel, isSponsored]);

  const openProfile = () => onOpenProfile?.(user.id);

  const toggleFollow = async () => {
    if (!onFollowToggle) return;

    const next = !localFollowing;
    setLocalFollowing(next);

    try {
      setBusy(true);
      await onFollowToggle(user.id, next);
    } catch {
      // rollback
      setLocalFollowing(!next);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={["ayk-ph", className ?? ""].join(" ")}>
      <style>{css}</style>

      <button
        type="button"
        className="ayk-ph-left"
        onClick={openProfile}
        aria-label={`Ouvrir le profil de ${user.name}`}
      >
        <div className="ayk-avatarWrap">
          <div className="ayk-avatar">
            <img src={user.avatarUrl} alt={user.name} className="ayk-avatarImg" />
          </div>

          {user.isLive ? (
            <div className="ayk-livePill" aria-label="En live">
              <TVLiveIcon />
              LIVE
            </div>
          ) : null}
        </div>

        <div className="ayk-ph-text">
          <div className="ayk-ph-row1">
            <span className="ayk-name">{user.name}</span>

            {/* GOLD: diamant + badge vert */}
            {user.isGold ? (
              <span className="ayk-badge ayk-badge-gold" aria-label="Membre Gold">
                💎
              </span>
            ) : null}

            {/* VIP doré */}
            {user.isVip ? (
              <span className="ayk-badge ayk-badge-vip" aria-label="Membre VIP">
                VIP
              </span>
            ) : null}

            {/* other badges */}
            {user.isNew ? (
              <span className="ayk-badge ayk-badge-new" aria-label="Nouveau">
                🆕
              </span>
            ) : null}

            {user.isPremium ? (
              <span className="ayk-badge ayk-badge-premium" aria-label="Premium">
                ⭐
              </span>
            ) : null}

            {user.isPopular ? (
              <span className="ayk-badge ayk-badge-popular" aria-label="Populaire">
                🔥
              </span>
            ) : null}
          </div>

          <div className="ayk-ph-row2">
            <span className="ayk-sub">
              {user.username ? `@${user.username}` : "Profil"}
            </span>
            {metaLine ? <span className="ayk-dot">•</span> : null}
            {metaLine ? <span className="ayk-meta">{metaLine}</span> : null}
          </div>
        </div>
      </button>

      <div className="ayk-ph-right">
        {onFollowToggle ? (
          <button
            type="button"
            className={["ayk-follow", localFollowing ? "isOn" : ""].join(" ")}
            onClick={toggleFollow}
            disabled={busy}
            aria-label={localFollowing ? "Ne plus suivre" : "Suivre"}
          >
            {localFollowing ? "Suivi" : "Suivre"}
          </button>
        ) : null}

        <button
          type="button"
          className="ayk-menu"
          onClick={() => onMenu?.(user.id)}
          aria-label="Menu"
        >
          •••
        </button>
      </div>
    </div>
  );
};

export default PostHeader;

/* ---------------------------------- */

const TVLiveIcon: React.FC = () => {
  return (
    <span className="tv-ico" aria-hidden="true">
      <span className="tv-emoji">📺</span>
      <span className="tv-dot" />
    </span>
  );
};

function formatRelative(iso: string) {
  try {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const s = Math.max(0, Math.floor(diff / 1000));
    if (s < 60) return "à l’instant";
    const m = Math.floor(s / 60);
    if (m < 60) return `il y a ${m} min`;
    const h = Math.floor(m / 60);
    if (h < 24) return `il y a ${h} h`;
    const days = Math.floor(h / 24);
    return `il y a ${days} j`;
  } catch {
    return "";
  }
}

const css = `
.ayk-ph{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.ayk-ph-left{
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  min-width: 0;
}

.ayk-avatarWrap{
  position: relative;
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
}

.ayk-avatar{
  width: 48px;
  height: 48px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  box-shadow: 0 14px 30px rgba(0,0,0,0.30);
}

.ayk-avatarImg{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ayk-livePill{
  position: absolute;
  left: -2px;
  bottom: -10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.55);
  color: rgba(255,255,255,0.92);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .04em;
}

.ayk-ph-text{ min-width: 0; }
.ayk-ph-row1{
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex-wrap: wrap;
}

.ayk-name{
  font-size: 14px;
  font-weight: 900;
  color: rgba(255,255,255,0.92);
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ayk-badge{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 18px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .04em;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.86);
}

.ayk-badge-gold{
  background: rgba(34,197,94,0.16);
  border: 1px solid rgba(34,197,94,0.24);
  color: rgba(210,255,225,0.95);
}

.ayk-badge-vip{
  background: rgba(215,178,124,0.18);
  border: 1px solid rgba(215,178,124,0.26);
  color: rgba(255,230,190,0.92);
}

.ayk-badge-new{
  background: rgba(255,255,255,0.06);
}

.ayk-badge-premium{
  background: rgba(232,162,182,0.16);
  border: 1px solid rgba(232,162,182,0.24);
}

.ayk-badge-popular{
  background: rgba(255,140,0,0.14);
  border: 1px solid rgba(255,140,0,0.22);
}

.ayk-ph-row2{
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex-wrap: wrap;
}

.ayk-sub{
  font-size: 12px;
  font-weight: 800;
  color: rgba(255,255,255,0.62);
}

.ayk-dot{
  color: rgba(255,255,255,0.30);
  font-weight: 900;
}

.ayk-meta{
  font-size: 12px;
  font-weight: 700;
  color: rgba(255,255,255,0.55);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 320px;
}

.ayk-ph-right{
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
}

.ayk-follow{
  height: 38px;
  padding: 0 14px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.92);
  font-weight: 900;
  font-size: 12px;
  cursor: pointer;
}
.ayk-follow:hover{ background: rgba(255,255,255,0.10); }
.ayk-follow:active{ transform: scale(.99); }
.ayk-follow.isOn{
  border: 1px solid rgba(232,162,182,0.28);
  background: rgba(232,162,182,0.10);
}

.ayk-menu{
  height: 38px;
  width: 42px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(0,0,0,0.30);
  color: rgba(255,255,255,0.86);
  font-weight: 900;
  cursor: pointer;
}
.ayk-menu:hover{ background: rgba(255,255,255,0.08); }
.ayk-menu:active{ transform: scale(.99); }

/* TV + blink dot INSIDE */
.tv-ico{
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
.tv-emoji{
  transform: translateY(0.5px);
}
.tv-dot{
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  left: 55%;
  top: 44%;
  transform: translate(-50%, -50%);
  background: rgb(255,59,59);
  box-shadow: 0 0 12px rgba(255,59,59,0.75);
  animation: aykTvBlink 0.9s ease-in-out infinite;
}
@keyframes aykTvBlink {
  0% { opacity: 0.25; transform: translate(-50%, -50%) scale(0.92); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.12); }
  100% { opacity: 0.25; transform: translate(-50%, -50%) scale(0.92); }
}
`;
