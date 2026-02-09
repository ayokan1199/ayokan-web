// src/screens/home/feed/FeedPost.tsx
import React, { useMemo } from "react";
import ActionsBar, { ActionsBarCounts, ActionsBarState } from "./ActionsBar";
import UserHeader, { FeedUser } from "./UserHeader";
import MediaContent, { FeedMedia } from "./MediaContent";

export type FeedPostType = "reel" | "image" | "live-clip" | "game-highlight";

export type FeedPostData = {
  id: string;

  user: FeedUser;

  type: FeedPostType;
  media: FeedMedia;

  caption?: string;
  hashtags?: string[];

  createdAt?: string; // ISO
  locationLabel?: string; // ex: "Cotonou"
  isAdult?: boolean; // +18 tag for safety/disclaimer
  isSponsored?: boolean;

  // actions
  counts: ActionsBarCounts;
  initialState?: ActionsBarState;
};

type FeedPostProps = {
  post: FeedPostData;

  onOpenProfile: (userId: string) => void;

  onOpenPost?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onGift?: (postId: string) => void;
  onLike?: (postId: string, nextLiked: boolean) => void | Promise<void>;
  onFavorite?: (postId: string, nextFavorited: boolean) => void | Promise<void>;

  // layout options
  actionsPlacement?: "right" | "bottom";
};

const FeedPost: React.FC<FeedPostProps> = ({
  post,
  onOpenProfile,
  onOpenPost,
  onComment,
  onShare,
  onGift,
  onLike,
  onFavorite,
  actionsPlacement = "right",
}) => {
  const hashtags = useMemo(() => normalizeTags(post.hashtags), [post.hashtags]);

  const openPost = () => {
    if (onOpenPost) onOpenPost(post.id);
  };

  return (
    <article className="mt-4" aria-label="Feed post">
      <style>{css}</style>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        {/* glows */}
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-[260px] w-[260px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(232,162,182,0.12), transparent 72%)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-24 -bottom-24 h-[280px] w-[280px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(215,178,124,0.10), transparent 72%)",
          }}
        />

        {/* header */}
        <div className="relative z-[1] px-4 pt-4">
          <UserHeader
            user={post.user}
            createdAt={post.createdAt}
            locationLabel={post.locationLabel}
            isSponsored={post.isSponsored}
            onOpenProfile={() => onOpenProfile(post.user.id)}
          />
        </div>

        {/* media + actions */}
        <div className="relative z-[1] mt-3 px-3 pb-3">
          {actionsPlacement === "right" ? (
            <div className="relative">
              <button
                type="button"
                onClick={openPost}
                className="block w-full"
                aria-label="Ouvrir le post"
              >
                <MediaContent media={post.media} type={post.type} />
              </button>

              <div className="absolute right-3 top-3 hidden md:block">
                <ActionsBar
                  postId={post.id}
                  counts={post.counts}
                  initialState={post.initialState}
                  onLike={onLike}
                  onComment={onComment}
                  onShare={onShare}
                  onGift={onGift}
                  onFavorite={onFavorite}
                  layout="vertical"
                />
              </div>

              {/* mobile actions overlay bottom-right */}
              <div className="absolute right-3 bottom-3 md:hidden">
                <ActionsBar
                  postId={post.id}
                  counts={post.counts}
                  initialState={post.initialState}
                  onLike={onLike}
                  onComment={onComment}
                  onShare={onShare}
                  onGift={onGift}
                  onFavorite={onFavorite}
                  layout="vertical"
                />
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={openPost}
                className="block w-full"
                aria-label="Ouvrir le post"
              >
                <MediaContent media={post.media} type={post.type} />
              </button>

              <div className="mt-3">
                <ActionsBar
                  postId={post.id}
                  counts={post.counts}
                  initialState={post.initialState}
                  onLike={onLike}
                  onComment={onComment}
                  onShare={onShare}
                  onGift={onGift}
                  onFavorite={onFavorite}
                  layout="horizontal"
                />
              </div>
            </>
          )}

          {/* caption */}
          {(post.caption || hashtags.length > 0 || post.isAdult) && (
            <div className="mt-3 px-1">
              <div className="flex flex-wrap items-center gap-2">
                {post.isAdult ? (
                  <span className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] font-black text-white/80">
                    🔞 +18
                  </span>
                ) : null}

                {post.caption ? (
                  <p className="text-sm font-semibold text-white/80">
                    {post.caption}
                  </p>
                ) : null}
              </div>

              {hashtags.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {hashtags.map((t) => (
                    <span
                      key={t}
                      className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black text-white/75 hover:bg-white/10"
                      onClick={() => {
                        // hook future: open hashtag feed
                      }}
                      role="link"
                      tabIndex={0}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default FeedPost;

/* ---------------------------------- */

function normalizeTags(tags?: string[]) {
  if (!tags || tags.length === 0) return [];
  const cleaned = tags
    .map((t) => String(t || "").trim().replace(/^#/, ""))
    .filter(Boolean);

  // unique keep order
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of cleaned) {
    const key = t.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(t);
  }
  return out.slice(0, 12);
}

const css = `
/* clamp without plugin requirement */
.line-clamp-2{
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`;
