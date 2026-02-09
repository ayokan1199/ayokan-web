// src/screens/home/feed/ActionsBar.tsx
import React, { useEffect, useMemo, useState } from "react";

/**
 * ✅ ActionsBar (Feed)
 * - Like / Comment / Share / Gift / Favoris
 * - Layout: "vertical" (TikTok style) ou "horizontal"
 * - Optimistic UI + callbacks async support
 * - Design: rose doré premium (pas d'écran blanc)
 */

export type ActionsBarCounts = {
  likes: number;
  comments: number;
  shares: number;
  gifts: number;
  favorites: number;
};

export type ActionsBarState = {
  liked: boolean;
  favorited: boolean;
};

type ActionsBarProps = {
  postId: string;
  counts: ActionsBarCounts;
  initialState?: ActionsBarState;

  onLike?: (postId: string, nextLiked: boolean) => void | Promise<void>;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onGift?: (postId: string) => void;
  onFavorite?: (postId: string, nextFavorited: boolean) => void | Promise<void>;

  layout?: "vertical" | "horizontal";
  className?: string;
};

const ActionsBar: React.FC<ActionsBarProps> = ({
  postId,
  counts,
  initialState,
  onLike,
  onComment,
  onShare,
  onGift,
  onFavorite,
  layout = "vertical",
  className,
}) => {
  const [liked, setLiked] = useState<boolean>(!!initialState?.liked);
  const [favorited, setFavorited] = useState<boolean>(!!initialState?.favorited);

  const [likesCount, setLikesCount] = useState<number>(safeInt(counts?.likes));
  const [commentsCount] = useState<number>(safeInt(counts?.comments));
  const [sharesCount] = useState<number>(safeInt(counts?.shares));
  const [giftsCount] = useState<number>(safeInt(counts?.gifts));
  const [favoritesCount, setFavoritesCount] = useState<number>(safeInt(counts?.favorites));

  const [busyLike, setBusyLike] = useState(false);
  const [busyFav, setBusyFav] = useState(false);

  useEffect(() => {
    setLikesCount(safeInt(counts?.likes));
  }, [counts?.likes]);

  useEffect(() => {
    setFavoritesCount(safeInt(counts?.favorites));
  }, [counts?.favorites]);

  useEffect(() => {
    setLiked(!!initialState?.liked);
    setFavorited(!!initialState?.favorited);
  }, [initialState?.liked, initialState?.favorited]);

  const rootClass = useMemo(() => {
    const base =
      "select-none rounded-3xl border border-white/10 bg-black/35 backdrop-blur-xl shadow-[0_18px_44px_rgba(0,0,0,0.35)]";
    const pad = layout === "vertical" ? "px-2 py-2" : "px-3 py-3";
    const flex = layout === "vertical" ? "flex flex-col gap-2" : "flex items-center justify-between gap-2";
    return [base, pad, flex, className ?? ""].join(" ");
  }, [layout, className]);

  const onToggleLike = async () => {
    if (busyLike) return;
    const next = !liked;

    // optimistic
    setLiked(next);
    setLikesCount((c) => Math.max(0, c + (next ? 1 : -1)));

    if (!onLike) return;

    try {
      setBusyLike(true);
      await onLike(postId, next);
    } catch {
      // rollback
      setLiked(!next);
      setLikesCount((c) => Math.max(0, c + (next ? -1 : 1)));
    } finally {
      setBusyLike(false);
    }
  };

  const onToggleFavorite = async () => {
    if (busyFav) return;
    const next = !favorited;

    // optimistic
    setFavorited(next);
    setFavoritesCount((c) => Math.max(0, c + (next ? 1 : -1)));

    if (!onFavorite) return;

    try {
      setBusyFav(true);
      await onFavorite(postId, next);
    } catch {
      // rollback
      setFavorited(!next);
      setFavoritesCount((c) => Math.max(0, c + (next ? -1 : 1)));
    } finally {
      setBusyFav(false);
    }
  };

  const onClickComment = () => onComment?.(postId);
  const onClickShare = () => onShare?.(postId);
  const onClickGift = () => onGift?.(postId);

  return (
    <div className={rootClass} aria-label="Actions">
      <style>{css}</style>

      <ActionBtn
        label="J’aime"
        sub={formatCount(likesCount)}
        emoji="❤️"
        active={liked}
        busy={busyLike}
        onClick={onToggleLike}
        layout={layout}
        activeStyle="ayk-like-active"
      />

      <ActionBtn
        label="Commenter"
        sub={formatCount(commentsCount)}
        emoji="💬"
        onClick={onClickComment}
        layout={layout}
      />

      <ActionBtn
        label="Partager"
        sub={formatCount(sharesCount)}
        emoji="🔁"
        onClick={onClickShare}
        layout={layout}
      />

      <ActionBtn
        label="Gift"
        sub={formatCount(giftsCount)}
        emoji="🎁"
        onClick={onClickGift}
        layout={layout}
        accent="ayk-gift"
      />

      <ActionBtn
        label="Favoris"
        sub={formatCount(favoritesCount)}
        emoji="⭐"
        active={favorited}
        busy={busyFav}
        onClick={onToggleFavorite}
        layout={layout}
        activeStyle="ayk-fav-active"
      />
    </div>
  );
};

export default ActionsBar;

/* ===================================== */

const ActionBtn: React.FC<{
  label: string;
  sub: string;
  emoji: string;
  onClick: () => void;
  layout: "vertical" | "horizontal";
  active?: boolean;
  busy?: boolean;
  accent?: "ayk-gift";
  activeStyle?: "ayk-like-active" | "ayk-fav-active";
}> = ({ label, sub, emoji, onClick, layout, active, busy, accent, activeStyle }) => {
  const btnClass = useMemo(() => {
    const base =
      "group relative flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 active:scale-[0.99] transition";
    const pad = layout === "vertical" ? "px-3 py-2" : "px-3 py-2";
    const width = layout === "vertical" ? "w-[64px] justify-center flex-col" : "min-w-[64px] justify-center";
    const cursor = busy ? "cursor-not-allowed opacity-70" : "cursor-pointer";
    const ring = active ? "ayk-active-ring" : "";
    const act = active && activeStyle ? activeStyle : "";
    const gift = accent === "ayk-gift" ? "ayk-gift-glow" : "";
    return [base, pad, width, cursor, ring, act, gift].join(" ");
  }, [layout, busy, active, activeStyle, accent]);

  const aria = active ? `${label} (actif)` : label;

  return (
    <button type="button" className={btnClass} onClick={onClick} disabled={busy} aria-label={aria} title={label}>
      <span className="text-lg leading-none">{emoji}</span>

      {layout === "vertical" ? (
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black text-white/90">{sub}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center leading-none">
          <span className="text-[10px] font-black text-white/92">{label}</span>
          <span className="mt-0.5 text-[10px] font-black text-white/70">{sub}</span>
        </div>
      )}

      {/* small sparkle dot when active */}
      {active ? <span className="ayk-spark" aria-hidden="true" /> : null}
    </button>
  );
};

/* ===================================== */

function safeInt(v: any) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.floor(n));
}

function formatCount(n: number) {
  const v = safeInt(n);
  if (v < 1000) return String(v);
  if (v < 1_000_000) return `${(v / 1000).toFixed(v >= 10_000 ? 0 : 1)}k`;
  return `${(v / 1_000_000).toFixed(v >= 10_000_000 ? 0 : 1)}M`;
}

const css = `
.ayk-active-ring{
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.12),
    0 18px 44px rgba(0,0,0,0.35);
}

.ayk-like-active{
  background:
    radial-gradient(140px 70px at 40% 20%, rgba(255,105,180,0.20), transparent 60%),
    rgba(255,255,255,0.08);
  border-color: rgba(255,105,180,0.35);
}

.ayk-fav-active{
  background:
    radial-gradient(140px 70px at 40% 20%, rgba(215,178,124,0.22), transparent 60%),
    rgba(255,255,255,0.08);
  border-color: rgba(215,178,124,0.35);
}

.ayk-gift-glow{
  background:
    radial-gradient(140px 70px at 40% 20%, rgba(232,162,182,0.18), transparent 60%),
    radial-gradient(140px 70px at 70% 70%, rgba(215,178,124,0.16), transparent 60%),
    rgba(255,255,255,0.06);
  border-color: rgba(232,162,182,0.22);
}

.ayk-spark{
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  right: 10px;
  top: 10px;
  background: rgba(255,255,255,0.92);
  box-shadow:
    0 0 16px rgba(255,255,255,0.45),
    0 0 22px rgba(232,162,182,0.35),
    0 0 28px rgba(215,178,124,0.25);
  opacity: 0.9;
  animation: aykSpark 1.4s ease-in-out infinite;
}

@keyframes aykSpark{
  0% { transform: scale(0.92); opacity: 0.55; }
  50% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(0.92); opacity: 0.55; }
}
`;
