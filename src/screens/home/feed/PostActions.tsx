// src/screens/home/feed/PostActions.tsx
import React, { useState } from "react";

export type PostActionsCounts = {
  likes: number;
  comments: number;
  shares: number;
  gifts: number;
  favorites: number;
};

export type PostActionsState = {
  liked?: boolean;
  favorited?: boolean;
};

type PostActionsProps = {
  postId: string;

  counts: PostActionsCounts;
  initialState?: PostActionsState;

  layout?: "vertical" | "horizontal";

  onLike?: (postId: string, next: boolean) => void | Promise<void>;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onGift?: (postId: string) => void;
  onFavorite?: (postId: string, next: boolean) => void | Promise<void>;
};

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  counts,
  initialState,
  layout = "vertical",
  onLike,
  onComment,
  onShare,
  onGift,
  onFavorite,
}) => {
  const [liked, setLiked] = useState(!!initialState?.liked);
  const [favorited, setFavorited] = useState(!!initialState?.favorited);

  const [likes, setLikes] = useState(counts.likes);
  const [favorites, setFavorites] = useState(counts.favorites);

  const toggleLike = async () => {
    const next = !liked;
    setLiked(next);
    setLikes((v) => v + (next ? 1 : -1));
    await onLike?.(postId, next);
  };

  const toggleFavorite = async () => {
    const next = !favorited;
    setFavorited(next);
    setFavorites((v) => v + (next ? 1 : -1));
    await onFavorite?.(postId, next);
  };

  return (
    <div
      className={[
        "flex gap-3",
        layout === "vertical"
          ? "flex-col items-center"
          : "flex-row items-center justify-between",
      ].join(" ")}
    >
      <style>{css}</style>

      <ActionButton
        icon={liked ? "❤️" : "🤍"}
        label={likes}
        onClick={toggleLike}
        active={liked}
        aria="Like"
      />

      <ActionButton
        icon="💬"
        label={counts.comments}
        onClick={() => onComment?.(postId)}
        aria="Commenter"
      />

      <ActionButton
        icon="🔁"
        label={counts.shares}
        onClick={() => onShare?.(postId)}
        aria="Partager"
      />

      <ActionButton
        icon="🎁"
        label={counts.gifts}
        onClick={() => onGift?.(postId)}
        aria="Envoyer un cadeau"
      />

      <ActionButton
        icon={favorited ? "⭐" : "☆"}
        label={favorites}
        onClick={toggleFavorite}
        active={favorited}
        aria="Favori"
      />
    </div>
  );
};

export default PostActions;

/* ---------------------------------- */

const ActionButton: React.FC<{
  icon: string;
  label: number;
  onClick: () => void;
  active?: boolean;
  aria?: string;
}> = ({ icon, label, onClick, active, aria }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={aria}
      className={[
        "group flex items-center gap-1 rounded-2xl px-2 py-1 text-xs font-black",
        active ? "text-white" : "text-white/80",
      ].join(" ")}
    >
      <span
        className={[
          "text-lg transition-transform",
          active ? "scale-110" : "group-hover:scale-110",
        ].join(" ")}
      >
        {icon}
      </span>
      <span className="min-w-[18px] text-center">{label}</span>
    </button>
  );
};

const css = `
button{
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
}
button:hover{
  background: rgba(255,255,255,0.12);
}
button:active{
  transform: scale(.96);
}
`;
