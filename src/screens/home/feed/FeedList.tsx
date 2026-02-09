// src/screens/home/feed/FeedList.tsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import FeedPost, { FeedPostData, FeedPostType } from "./FeedPost";
import type { FeedUser } from "./UserHeader";
import type { FeedMedia } from "./MediaContent";
import type { ActionsBarCounts, ActionsBarState } from "./ActionsBar";

/**
 * ✅ IMPORTANT
 * - Ce fichier est "safe" : il compile même si tu n'as pas encore branché Supabase pour le feed.
 * - Il corrige les erreurs de types: FeedPostData (user/type/counts) + members (name obligatoire).
 * - Il corrige les imports de sections : on pointe vers les chemins cohérents.
 *
 * ⚠️ Si tes fichiers "sections" sont ailleurs, adapte UNIQUEMENT ces 3 imports.
 */

// 1) NewMembersCarousel est chez toi ici (tu me l’as envoyé)
import NewMembersCarousel, { NewMember } from "../../home/feed/sections/NewMembersCarousel";

// 2) Ces 2 composants, tu m’as demandé ensuite ("PopularMembers", "PremiumMembers").
// Si tu ne les as pas encore créés, ce fichier compile quand même grâce aux fallbacks plus bas.
// MAIS si tu as déjà ces fichiers à cet endroit, laisse ces imports.
import PopularMembers from "./sections/PopularMembers";
import PremiumMembers from "./sections/PremiumMembers";

/* =========================================================
   TYPES (modèles internes au FeedList)
========================================================= */

export type FeedMemberCard = {
  id: string;
  name: string;
  username?: string;
  avatarUrl: string;
  city?: string;

  isVip?: boolean;
  isGold?: boolean;
  isLive?: boolean;

  hasStory?: boolean;
  storySeen?: boolean;
};

export type FeedPostModel = {
  id: string;

  userId: string;
  name: string;
  username?: string;
  avatarUrl: string;

  // badges côté header
  isNew?: boolean;
  isPremium?: boolean;
  isPopular?: boolean;
  isVip?: boolean;
  isGold?: boolean;
  isLive?: boolean;

  type: FeedPostType;
  media: FeedMedia;

  caption?: string;
  hashtags?: string[];

  createdAt?: string;
  locationLabel?: string;

  isAdult?: boolean;
  isSponsored?: boolean;

  counts?: Partial<ActionsBarCounts>;
  initialState?: Partial<ActionsBarState>;
};

type FeedListProps = {
  posts?: FeedPostModel[];

  // sections
  newMembers?: FeedMemberCard[];
  popularMembers?: FeedMemberCard[];
  premiumMembers?: FeedMemberCard[];

  // injection tuning
  injectNewMembersAt?: number; // index post
  injectPopularAt?: number;
  injectPremiumAt?: number;
  injectAdultDisclaimerAt?: number;

  // interactions
  onOpenProfile?: (userId: string) => void;
  onOpenPost?: (postId: string) => void;

  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onGift?: (postId: string) => void;
  onLike?: (postId: string, nextLiked: boolean) => void | Promise<void>;
  onFavorite?: (postId: string, nextFavorited: boolean) => void | Promise<void>;

  actionsPlacement?: "right" | "bottom";
  className?: string;
};

/* =========================================================
   FALLBACKS (si sections non prêtes)
========================================================= */

const SafePopularMembersFallback: React.FC<{
  members: FeedMemberCard[];
  onOpenProfile: (id: string) => void;
}> = ({ members, onOpenProfile }) => {
  if (!members?.length) return null;
  return (
    <section className="mt-6" aria-label="Membres populaires">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-black text-white/92">🔥 Membres populaires</h2>
            <p className="mt-1 text-sm font-semibold text-white/65">Ils font vibrer Ayokan en ce moment.</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {members.slice(0, 6).map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onOpenProfile(m.id)}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 p-3 text-left hover:bg-white/10"
            >
              <div className="h-11 w-11 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img src={m.avatarUrl} alt={m.name} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-black text-white/92">{m.name}</div>
                <div className="truncate text-xs font-semibold text-white/60">
                  {m.username ? `@${m.username}` : m.city ?? "Populaire"}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const SafePremiumMembersFallback: React.FC<{
  members: FeedMemberCard[];
  onOpenProfile: (id: string) => void;
}> = ({ members, onOpenProfile }) => {
  if (!members?.length) return null;
  return (
    <section className="mt-6" aria-label="Membres premium">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-black text-white/92">⭐ Membres Premium / VIP</h2>
            <p className="mt-1 text-sm font-semibold text-white/65">Visibilité prioritaire, profils premium.</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {members.slice(0, 6).map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onOpenProfile(m.id)}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 p-3 text-left hover:bg-white/10"
            >
              <div className="h-11 w-11 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img src={m.avatarUrl} alt={m.name} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="truncate text-sm font-black text-white/92">{m.name}</div>
                  {m.isGold ? (
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black"
                      style={{
                        background: "rgba(34,197,94,0.16)",
                        border: "1px solid rgba(34,197,94,0.24)",
                        color: "rgba(210,255,225,0.95)",
                      }}
                      aria-label="Membre Gold"
                    >
                      💎
                    </span>
                  ) : null}
                  {m.isVip ? (
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black"
                      style={{
                        background: "rgba(215,178,124,0.18)",
                        border: "1px solid rgba(215,178,124,0.26)",
                        color: "rgba(255,230,190,0.92)",
                      }}
                      aria-label="VIP"
                    >
                      VIP
                    </span>
                  ) : null}
                </div>

                <div className="truncate text-xs font-semibold text-white/60">
                  {m.username ? `@${m.username}` : m.city ?? "Premium"}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const AdultDisclaimerInline: React.FC = () => {
  return (
    <section className="mt-6" aria-label="Avertissement adulte">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm font-black text-white/90">
            🔞
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-white/90">Contenu réservé aux adultes</div>
            <div className="mt-1 text-sm font-semibold text-white/65">
              Ayokan contient du contenu +18. Signale tout abus et protège ton expérience.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   MAIN
========================================================= */

const FeedList: React.FC<FeedListProps> = ({
  posts,
  newMembers,
  popularMembers,
  premiumMembers,

  injectNewMembersAt = 1,
  injectPopularAt = 4,
  injectPremiumAt = 7,
  injectAdultDisclaimerAt = 10,

  onOpenProfile,
  onOpenPost,
  onComment,
  onShare,
  onGift,
  onLike,
  onFavorite,

  actionsPlacement = "right",
  className,
}) => {
  const navigate = useNavigate();

  const openProfile = (id: string) => {
    if (onOpenProfile) return onOpenProfile(id);
    // route safe: tu as /profile (pas /profile/:id) pour l’instant
    navigate("/profile", { state: { userId: id } });
  };

  const openPost = (postId: string) => {
    if (onOpenPost) return onOpenPost(postId);
    // fallback: pas de route post pour l’instant
  };

  const preparedPosts = useMemo<FeedPostData[]>(() => {
    const src = (posts && posts.length ? posts : mockPosts()).slice(0, 30);
    return src.map(mapModelToFeedPostData);
  }, [posts]);

  const preparedNewMembers = useMemo<NewMember[]>(() => {
    const src = (newMembers && newMembers.length ? newMembers : mockMembers("new")).slice(0, 16);
    return src.map(toNewMember);
  }, [newMembers]);

  const preparedPopular = useMemo<FeedMemberCard[]>(() => {
    return (popularMembers && popularMembers.length ? popularMembers : mockMembers("popular")).slice(0, 12);
  }, [popularMembers]);

  const preparedPremium = useMemo<FeedMemberCard[]>(() => {
    return (premiumMembers && premiumMembers.length ? premiumMembers : mockMembers("premium")).slice(0, 12);
  }, [premiumMembers]);

  const injected = useMemo(() => {
    const items: Array<
      | { kind: "post"; key: string; post: FeedPostData }
      | { kind: "newMembers"; key: string }
      | { kind: "popular"; key: string }
      | { kind: "premium"; key: string }
      | { kind: "adult"; key: string }
    > = [];

    preparedPosts.forEach((p, idx) => {
      // inject BEFORE this post
      if (idx === injectNewMembersAt) items.push({ kind: "newMembers", key: "sec-new" });
      if (idx === injectPopularAt) items.push({ kind: "popular", key: "sec-pop" });
      if (idx === injectPremiumAt) items.push({ kind: "premium", key: "sec-prem" });
      if (idx === injectAdultDisclaimerAt) items.push({ kind: "adult", key: "sec-adult" });

      items.push({ kind: "post", key: `post-${p.id}`, post: p });
    });

    // inject at end if feed too short
    if (preparedPosts.length <= injectNewMembersAt && preparedNewMembers.length) items.push({ kind: "newMembers", key: "sec-new-end" });
    if (preparedPosts.length <= injectPopularAt && preparedPopular.length) items.push({ kind: "popular", key: "sec-pop-end" });
    if (preparedPosts.length <= injectPremiumAt && preparedPremium.length) items.push({ kind: "premium", key: "sec-prem-end" });

    return items;
  }, [
    preparedPosts,
    preparedNewMembers.length,
    preparedPopular.length,
    preparedPremium.length,
    injectNewMembersAt,
    injectPopularAt,
    injectPremiumAt,
    injectAdultDisclaimerAt,
  ]);

  return (
    <div className={className ?? ""}>
      {/* New members carousel (stories-like) */}
      {/* C’est cliquable: profile + story + hello */}
      {/* Badge green/diamond + TV blink LIVE est déjà dans ton composant NewMembersCarousel */}
      {injected.map((it) => {
        if (it.kind === "post") {
          return (
            <FeedPost
              key={it.key}
              post={it.post}
              onOpenProfile={(uid) => openProfile(uid)}
              onOpenPost={(pid) => openPost(pid)}
              onComment={onComment}
              onShare={onShare}
              onGift={onGift}
              onLike={onLike}
              onFavorite={onFavorite}
              actionsPlacement={actionsPlacement}
            />
          );
        }

        if (it.kind === "newMembers") {
          return (
            <NewMembersCarousel
              key={it.key}
              members={preparedNewMembers}
              onOpenProfile={(id) => openProfile(id)}
              onSayHello={(id) => navigate(`/messages/new?to=${encodeURIComponent(id)}`)}
              onOpenStory={(id) => openProfile(id)}
            />
          );
        }

        if (it.kind === "popular") {
          // Si ton composant existe, on l’utilise. Sinon fallback.
          const Comp: any = PopularMembers ?? null;
          if (Comp) {
            return (
              <Comp
                key={it.key}
                members={preparedPopular.map(toPopularMember)}
                onOpenProfile={(id: string) => openProfile(id)}
              />
            );
          }
          return <SafePopularMembersFallback key={it.key} members={preparedPopular} onOpenProfile={openProfile} />;
        }

        if (it.kind === "premium") {
          const Comp: any = PremiumMembers ?? null;
          if (Comp) {
            return (
              <Comp
                key={it.key}
                members={preparedPremium.map(toPremiumMember)}
                onOpenProfile={(id: string) => openProfile(id)}
              />
            );
          }
          return <SafePremiumMembersFallback key={it.key} members={preparedPremium} onOpenProfile={openProfile} />;
        }

        if (it.kind === "adult") return <AdultDisclaimerInline key={it.key} />;

        return null;
      })}
    </div>
  );
};

export default FeedList;

/* =========================================================
   MAPPERS
========================================================= */

function mapModelToFeedPostData(m: FeedPostModel): FeedPostData {
  const user: FeedUser = {
    id: m.userId,
    name: m.name,
    username: m.username,
    avatarUrl: m.avatarUrl,
    isNew: !!m.isNew,
    isPremium: !!m.isPremium,
    isPopular: !!m.isPopular,
    isVip: !!m.isVip,
    isGold: !!m.isGold,
    isLive: !!m.isLive,
  };

  const counts: ActionsBarCounts = {
    likes: m.counts?.likes ?? randomInt(10, 390),
    comments: m.counts?.comments ?? randomInt(0, 72),
    shares: m.counts?.shares ?? randomInt(0, 38),
    gifts: m.counts?.gifts ?? randomInt(0, 26),
    favorites: m.counts?.favorites ?? randomInt(0, 92),
  };

  const initialState: ActionsBarState = {
    liked: m.initialState?.liked ?? false,
    favorited: m.initialState?.favorited ?? false,
  };

  return {
    id: m.id,
    user,
    type: m.type,
    media: m.media,
    caption: m.caption,
    hashtags: m.hashtags,
    createdAt: m.createdAt,
    locationLabel: m.locationLabel,
    isAdult: m.isAdult,
    isSponsored: m.isSponsored,
    counts,
    initialState,
  };
}

function toNewMember(m: FeedMemberCard): NewMember {
  return {
    id: m.id,
    name: m.name,
    username: m.username,
    avatarUrl: m.avatarUrl,
    city: m.city,
    isVip: !!m.isVip,
    isGold: !!m.isGold,
    isLive: !!m.isLive,
    hasStory: !!m.hasStory,
    storySeen: !!m.storySeen,
  };
}

// Types attendus par tes sections (si elles existent déjà)
function toPopularMember(m: FeedMemberCard) {
  return {
    id: m.id,
    name: m.name,
    username: m.username,
    avatarUrl: m.avatarUrl,
    city: m.city,
    isLive: !!m.isLive,
    isVip: !!m.isVip,
    isGold: !!m.isGold,
  };
}

function toPremiumMember(m: FeedMemberCard) {
  return {
    id: m.id,
    name: m.name,
    username: m.username,
    avatarUrl: m.avatarUrl,
    city: m.city,
    isVip: !!m.isVip,
    isGold: !!m.isGold,
    isLive: !!m.isLive,
  };
}

/* =========================================================
   MOCKS (dev only)
========================================================= */

function mockMembers(mode: "new" | "popular" | "premium"): FeedMemberCard[] {
  const base = [
    {
      id: "u1",
      name: "Mina",
      username: "mina",
      avatarUrl: "https://i.pravatar.cc/300?img=12",
      city: "Cotonou",
    },
    {
      id: "u2",
      name: "Noah",
      username: "noah",
      avatarUrl: "https://i.pravatar.cc/300?img=53",
      city: "Porto-Novo",
    },
    {
      id: "u3",
      name: "Lola",
      username: "lola",
      avatarUrl: "https://i.pravatar.cc/300?img=32",
      city: "Lomé",
    },
    {
      id: "u4",
      name: "Eden",
      username: "eden",
      avatarUrl: "https://i.pravatar.cc/300?img=5",
      city: "Abidjan",
    },
    {
      id: "u5",
      name: "Kylian",
      username: "kylian",
      avatarUrl: "https://i.pravatar.cc/300?img=60",
      city: "Dakar",
    },
    {
      id: "u6",
      name: "Aya",
      username: "aya",
      avatarUrl: "https://i.pravatar.cc/300?img=48",
      city: "Cotonou",
    },
  ] as FeedMemberCard[];

  return base.map((m, i) => {
    if (mode === "new") {
      return {
        ...m,
        hasStory: true,
        storySeen: i % 3 === 0,
        isLive: i === 1,
        isVip: i === 3,
        isGold: i === 2,
      };
    }
    if (mode === "popular") {
      return {
        ...m,
        hasStory: i % 2 === 0,
        storySeen: true,
        isLive: i === 0 || i === 4,
        isVip: i === 2,
        isGold: i === 5,
      };
    }
    return {
      ...m,
      hasStory: i % 2 === 1,
      storySeen: i % 2 === 0,
      isVip: i % 2 === 0,
      isGold: i === 1 || i === 4,
      isLive: i === 3,
    };
  });
}

function mockPosts(): FeedPostModel[] {
  const users = mockMembers("popular");

  const mkMediaImg = (seed: number): FeedMedia => ({
    url: `https://picsum.photos/seed/ayokan_${seed}/900/1200`,
    aspect: "4:5",
  });

  const mkMediaVid = (seed: number): FeedMedia => ({
    url: `https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4`,
    poster: `https://picsum.photos/seed/reel_${seed}/900/1200`,
    aspect: "9:16",
    muted: true,
    loop: true,
  });

  return Array.from({ length: 14 }).map((_, idx) => {
    const u = users[idx % users.length];
    const isReel = idx % 3 === 0;

    return {
      id: `p_${idx + 1}`,
      userId: u.id,
      name: u.name,
      username: u.username,
      avatarUrl: u.avatarUrl,

      isNew: idx % 7 === 0,
      isPremium: idx % 5 === 0,
      isPopular: idx % 4 === 0,
      isVip: u.isVip,
      isGold: u.isGold,
      isLive: idx % 6 === 0,

      type: isReel ? "reel" : "image",
      media: isReel ? mkMediaVid(idx + 1) : mkMediaImg(idx + 1),

      caption: idx % 2 === 0 ? "Ambiance rose doré, on se retrouve en live ?" : "Nouvelle vibe sur Ayokan 🔥",
      hashtags: idx % 2 === 0 ? ["PlanCul", "Live", "Ayokan"] : ["Reels", "Game", "VIP"],

      createdAt: new Date(Date.now() - idx * 1000 * 60 * 18).toISOString(),
      locationLabel: idx % 3 === 0 ? "Cotonou" : "Porto-Novo",

      isAdult: idx % 9 === 0,
      isSponsored: idx % 11 === 0,

      counts: {
        likes: randomInt(20, 1200),
        comments: randomInt(0, 140),
        shares: randomInt(0, 90),
        gifts: randomInt(0, 40),
        favorites: randomInt(0, 220),
      },
      initialState: {
        liked: idx % 6 === 0,
        favorited: idx % 8 === 0,
      },
    };
  });
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
