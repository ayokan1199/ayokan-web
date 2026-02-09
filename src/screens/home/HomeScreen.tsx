// src/home/HomeScreen.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * HOME = HUB intelligent
 * - topbar + stories + hero + sections previews
 * - feed vertical injecté (new members / premium / live inline / note +18 etc.)
 * - tout cliquable
 *
 * Couleur brand: rose doré (glow + gradients sombres premium)
 */

type MemberTier = "standard" | "premium" | "gold";
type Member = {
  id: string;
  username: string;
  avatarUrl: string;
  tier: MemberTier;
  isLive?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
};

type Story = {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  tier: MemberTier;
  isLive?: boolean;
  createdAtIso: string;
};

type Live = {
  id: string;
  host: Member;
  title: string;
  viewers: number;
  category: "popular" | "plan-cul" | "vip";
  coverUrl: string;
};

type ReelPreview = {
  id: string;
  user: Member;
  coverUrl: string;
  caption: string;
};

type ProductPreview = {
  id: string;
  title: string;
  price: string;
  coverUrl: string;
  badge?: "VIP" | "HOT" | "NEW";
};

const LS_STORY_VIEWED_KEY = "ayokan_story_viewed_v1";

function readViewedStoryIds(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(LS_STORY_VIEWED_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, boolean>;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch {
    return {};
  }
}

function writeViewedStoryIds(map: Record<string, boolean>) {
  try {
    localStorage.setItem(LS_STORY_VIEWED_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

const BrandGlowBackground: React.FC = () => {
  return (
    <>
      <div className="absolute inset-0 bg-[#07060A]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90" />
      <div className="pointer-events-none absolute -left-64 -top-64 h-[520px] w-[720px] rounded-full blur-3xl"
           style={{ background: "radial-gradient(closest-side, rgba(232,162,182,0.22), transparent 70%)" }} />
      <div className="pointer-events-none absolute -right-72 -top-72 h-[520px] w-[760px] rounded-full blur-3xl"
           style={{ background: "radial-gradient(closest-side, rgba(215,178,124,0.18), transparent 72%)" }} />
      <div className="pointer-events-none absolute left-1/2 top-[20%] h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl"
           style={{ background: "radial-gradient(circle, rgba(242,161,198,0.14), transparent 70%)" }} />
    </>
  );
};

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  // ----- mock data (tu brancheras Supabase après) -----
  const members: Member[] = useMemo(
    () => [
      {
        id: "u1",
        username: "LunaGold",
        avatarUrl: "https://i.pravatar.cc/160?img=47",
        tier: "gold",
        isLive: true,
        isPopular: true,
      },
      {
        id: "u2",
        username: "AyaPremium",
        avatarUrl: "https://i.pravatar.cc/160?img=12",
        tier: "premium",
        isNew: true,
      },
      {
        id: "u3",
        username: "Kofi",
        avatarUrl: "https://i.pravatar.cc/160?img=22",
        tier: "standard",
        isPopular: true,
      },
      {
        id: "u4",
        username: "Mina",
        avatarUrl: "https://i.pravatar.cc/160?img=32",
        tier: "premium",
        isLive: false,
      },
      {
        id: "u5",
        username: "NanaGold",
        avatarUrl: "https://i.pravatar.cc/160?img=18",
        tier: "gold",
        isLive: false,
        isNew: true,
      },
      {
        id: "u6",
        username: "Raph",
        avatarUrl: "https://i.pravatar.cc/160?img=8",
        tier: "standard",
        isLive: true,
      },
    ],
    []
  );

  const stories: Story[] = useMemo(
    () => [
      {
        id: "s_me",
        userId: "me",
        username: "Ta story",
        avatarUrl: "https://i.pravatar.cc/160?img=1",
        tier: "standard",
        createdAtIso: new Date().toISOString(),
      },
      {
        id: "s1",
        userId: "u1",
        username: "LunaGold",
        avatarUrl: "https://i.pravatar.cc/160?img=47",
        tier: "gold",
        isLive: true,
        createdAtIso: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      },
      {
        id: "s2",
        userId: "u2",
        username: "AyaPremium",
        avatarUrl: "https://i.pravatar.cc/160?img=12",
        tier: "premium",
        createdAtIso: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
      },
      {
        id: "s3",
        userId: "u3",
        username: "Kofi",
        avatarUrl: "https://i.pravatar.cc/160?img=22",
        tier: "standard",
        createdAtIso: new Date(Date.now() - 1000 * 60 * 70).toISOString(),
      },
      {
        id: "s4",
        userId: "u5",
        username: "NanaGold",
        avatarUrl: "https://i.pravatar.cc/160?img=18",
        tier: "gold",
        createdAtIso: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      },
    ],
    []
  );

  const lives: Live[] = useMemo(
    () => [
      {
        id: "l1",
        host: members[0],
        title: "🔥 Live VIP: vibes & étincelles",
        viewers: 1280,
        category: "vip",
        coverUrl: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "l2",
        host: members[5],
        title: "Plan Cul ⭐ en mode chill",
        viewers: 540,
        category: "plan-cul",
        coverUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "l3",
        host: members[2],
        title: "LIVE populaire: talk & fun",
        viewers: 910,
        category: "popular",
        coverUrl: "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    [members]
  );

  const reels: ReelPreview[] = useMemo(
    () => [
      {
        id: "r1",
        user: members[1],
        coverUrl: "https://images.unsplash.com/photo-1520975679030-bb3c0fbb08f7?auto=format&fit=crop&w=1200&q=80",
        caption: "#Ayokan #Reels",
      },
      {
        id: "r2",
        user: members[0],
        coverUrl: "https://images.unsplash.com/photo-1516557070061-c3d1653fa646?auto=format&fit=crop&w=1200&q=80",
        caption: "#PlanCul #Live",
      },
      {
        id: "r3",
        user: members[4],
        coverUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=1200&q=80",
        caption: "#VIP",
      },
    ],
    [members]
  );

  const shop: ProductPreview[] = useMemo(
    () => [
      {
        id: "p1",
        title: "VIP Boost (7 jours)",
        price: "4 900 FCFA",
        coverUrl: "https://images.unsplash.com/photo-1520975958225-7dbe88561f98?auto=format&fit=crop&w=1200&q=80",
        badge: "VIP",
      },
      {
        id: "p2",
        title: "Pack Étincelles x500",
        price: "2 000 FCFA",
        coverUrl: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
        badge: "HOT",
      },
      {
        id: "p3",
        title: "Gold (30 jours)",
        price: "9 900 FCFA",
        coverUrl: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&q=80",
        badge: "NEW",
      },
    ],
    []
  );

  // ----- story viewed state -----
  const [viewedMap, setViewedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setViewedMap(readViewedStoryIds());
  }, []);

  const markStoryViewed = (storyId: string) => {
    setViewedMap((prev) => {
      const next = { ...prev, [storyId]: true };
      writeViewedStoryIds(next);
      return next;
    });
  };

  const onOpenStory = (s: Story) => {
    // "Ta story" = add story
    if (s.id === "s_me") {
      navigate("/reels"); // ou "/story/new"
      return;
    }
    markStoryViewed(s.id);
    navigate(`/stories/${s.id}`);
  };

  const onOpenProfile = (userId: string) => navigate(`/profile/${userId}`);
  const onOpenLive = (liveId: string) => navigate(`/live/${liveId}`);
  const onGo = (path: string) => navigate(path);

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      <BrandGlowBackground />

      {/* CSS animations (sans config Tailwind) */}
      <style>{cssAnimations}</style>

      {/* Content */}
      <div className="relative z-[2] mx-auto w-full max-w-[1180px] px-4 pb-24 pt-5">
        {/* Topbar */}
        <Topbar
          onGo={onGo}
          onOpenProfile={() => onOpenProfile("me")}
        />

        {/* Stories row */}
        <div className="mt-4">
          <StoriesRow
            stories={stories}
            viewedMap={viewedMap}
            onOpenStory={onOpenStory}
          />
        </div>

        {/* Hero */}
        <div className="mt-5">
          <HeroBanner
            onGoLive={() => onGo("/live/go")}
            onSeeLiveNow={() => onGo("/live")}
          />
        </div>

        {/* Live now */}
        <div className="mt-6">
          <SectionHeader
            title="LIVE EN COURS"
            subtitle="Populaires, Plan Cul ⭐, VIP"
            actionLabel="Voir tout"
            onAction={() => onGo("/live")}
          />
          <LiveNowSection
            lives={lives}
            onOpenLive={(id) => onOpenLive(id)}
            onOpenProfile={(id) => onOpenProfile(id)}
          />
        </div>

        {/* Reels preview */}
        <div className="mt-8">
          <SectionHeader
            title="Reels"
            subtitle="Contenu court, vibes rapides"
            actionLabel="Explorer"
            onAction={() => onGo("/reels")}
          />
          <ReelsPreview reels={reels} onOpenReel={(id) => onGo(`/reels/${id}`)} onOpenProfile={(id) => onOpenProfile(id)} />
        </div>

        {/* Game preview */}
        <div className="mt-8">
          <GamePreview onGo={() => onGo("/game")} />
        </div>

        {/* Plan Cul preview */}
        <div className="mt-8">
          <PlanCulPreview
            onGo={() => onGo("/plan-cul")}
            onOpenProfile={(id) => onOpenProfile(id)}
            candidates={members}
          />
        </div>

        {/* Shop preview */}
        <div className="mt-8">
          <ShopPreview items={shop} onGo={() => onGo("/shop")} onOpenItem={(id) => onGo(`/shop/${id}`)} />
        </div>

        {/* Magic Cooler preview */}
        <div className="mt-8">
          <MagicCoolerPreview onGo={() => onGo("/magic-cooler")} />
        </div>

        {/* Recommendations */}
        <div className="mt-8">
          <Recommendations
            members={members}
            onOpenProfile={onOpenProfile}
          />
        </div>

        {/* Disclaimer +18 */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/70">
          🔞 Contenu réservé aux adultes.{" "}
          <button
            type="button"
            className="underline decoration-white/40 underline-offset-4 hover:text-white"
            onClick={() => onGo("/report")}
          >
            Signaler un abus
          </button>
          .
        </div>
      </div>

      {/* Bottom nav */}
      <BottomNav onGo={onGo} />
    </div>
  );
};

export default HomeScreen;

/* ------------------------------------------
   Components (dans le même fichier pour aller vite)
------------------------------------------ */

const Topbar: React.FC<{
  onGo: (path: string) => void;
  onOpenProfile: () => void;
}> = ({ onGo, onOpenProfile }) => {
  return (
    <div className="sticky top-0 z-[5] -mx-4 px-4 py-3 backdrop-blur-xl"
         style={{ background: "linear-gradient(180deg, rgba(7,6,10,0.88), rgba(7,6,10,0.35))" }}>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onGo("/")}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
        >
          <span
            className="h-8 w-8 rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.10), 0 18px 44px rgba(0,0,0,0.45)",
            }}
            aria-hidden="true"
          />
          <span className="text-xs font-black tracking-[0.35em] text-white/90">
            AYOKAN+
          </span>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <TopbarLink label="Live" onClick={() => onGo("/live")} hot />
          <TopbarLink label="Shop" onClick={() => onGo("/shop")} />
          <TopbarLink label="Explorer" onClick={() => onGo("/explore")} />
          <TopbarLink label="Plan Cul ⭐" onClick={() => onGo("/plan-cul")} />
          <TopbarLink label="Messages" onClick={() => onGo("/messages")} />
          <TopbarLink label="VIP" onClick={() => onGo("/vip")} vip />
        </div>

        <button
          type="button"
          onClick={onOpenProfile}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
        >
          <span className="text-xs font-extrabold text-white/85">Profil</span>
          <img
            src="https://i.pravatar.cc/80?img=1"
            alt="Mon profil"
            className="h-8 w-8 rounded-full border border-white/15 object-cover"
          />
        </button>
      </div>
    </div>
  );
};

const TopbarLink: React.FC<{ label: string; onClick: () => void; hot?: boolean; vip?: boolean }> = ({
  label,
  onClick,
  hot,
  vip,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-extrabold text-white/85 hover:bg-white/10"
    >
      {label}
      {hot ? (
        <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-black text-white/90">
          🔴 LIVE
        </span>
      ) : null}
      {vip ? (
        <span className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black"
              style={{ background: "rgba(215,178,124,0.20)", border: "1px solid rgba(215,178,124,0.28)", color: "rgba(255,230,190,0.92)" }}>
          VIP
        </span>
      ) : null}
    </button>
  );
};

const StoriesRow: React.FC<{
  stories: Story[];
  viewedMap: Record<string, boolean>;
  onOpenStory: (s: Story) => void;
}> = ({ stories, viewedMap, onOpenStory }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-black text-white/90">Moments</div>
        <button
          type="button"
          onClick={() => onOpenStory(stories[0])}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-black text-white/80 hover:bg-white/10"
        >
          ➕ Ta story
        </button>
      </div>

      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        {stories.map((s) => {
          const viewed = !!viewedMap[s.id];
          const isMe = s.id === "s_me";
          return (
            <StoryBubble
              key={s.id}
              story={s}
              viewed={viewed}
              isMe={isMe}
              onClick={() => onOpenStory(s)}
            />
          );
        })}
      </div>
    </div>
  );
};

const StoryBubble: React.FC<{
  story: Story;
  viewed: boolean;
  isMe: boolean;
  onClick: () => void;
}> = ({ story, viewed, isMe, onClick }) => {
  const ringVariant = story.isLive ? "live" : story.tier === "gold" ? "gold" : story.tier === "premium" ? "premium" : "standard";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-[78px] shrink-0 flex-col items-center gap-1"
      aria-label={`Story de ${story.username}`}
    >
      <div className="relative">
        {/* ring animé si pas vu */}
        {!viewed && !isMe ? (
          <div className={`story-ring story-ring--${ringVariant}`} aria-hidden="true" />
        ) : null}

        {/* ring statique si vu */}
        {viewed && !isMe ? (
          <div className={`story-ring-static story-ring-static--${ringVariant}`} aria-hidden="true" />
        ) : null}

        {/* avatar */}
        <div className="relative h-[64px] w-[64px] rounded-full p-[3px]">
          <div className="h-full w-full overflow-hidden rounded-full border border-white/15 bg-black/30">
            <img
              src={story.avatarUrl}
              alt={story.username}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* live icon TV */}
        {story.isLive ? (
          <div className="absolute -bottom-1 -right-1">
            <LiveTVIcon size={22} />
          </div>
        ) : null}

        {/* add story */}
        {isMe ? (
          <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border border-white/15 bg-white/10 text-white/90">
            <div className="flex h-full w-full items-center justify-center text-sm font-black">
              +
            </div>
          </div>
        ) : null}
      </div>

      <div className="w-full truncate text-center text-[11px] font-bold text-white/80 group-hover:text-white">
        {story.username}
      </div>
    </button>
  );
};

const HeroBanner: React.FC<{ onGoLive: () => void; onSeeLiveNow: () => void }> = ({
  onGoLive,
  onSeeLiveNow,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
      <div
        className="pointer-events-none absolute -left-20 -top-20 h-[240px] w-[240px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(232,162,182,0.18), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -right-24 -bottom-24 h-[260px] w-[260px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(215,178,124,0.16), transparent 70%)" }}
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-black text-white/80">
            🔥 Valeur immédiate
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            vibes premium
          </div>

          <h1 className="mt-3 text-2xl font-black leading-tight text-white/95 md:text-3xl">
            🔥 Passe en LIVE, rencontre et gagne des Étincelles
          </h1>
          <p className="mt-2 max-w-[680px] text-sm font-medium text-white/70">
            L’accueil est un hub: LIVE, Plan Cul, Reels, Game, Shop, Glacière Magique.
            Tu cliques, tu vas direct au bon endroit.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-[320px]">
          <button
            type="button"
            onClick={onGoLive}
            className="rounded-2xl px-4 py-3 text-sm font-black text-[#120A12]"
            style={{
              background:
                "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
              boxShadow: "0 18px 48px rgba(0,0,0,0.35)",
            }}
          >
            🔴 Passer en LIVE
          </button>

          <button
            type="button"
            onClick={onSeeLiveNow}
            className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-black text-white/90 hover:bg-white/10"
          >
            🔴 LIVE en cours
          </button>
        </div>
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}> = ({ title, subtitle, actionLabel, onAction }) => {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <div className="text-lg font-black text-white/95">{title}</div>
        {subtitle ? <div className="text-sm font-medium text-white/60">{subtitle}</div> : null}
      </div>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-black text-white/85 hover:bg-white/10"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};

const LiveNowSection: React.FC<{
  lives: Live[];
  onOpenLive: (id: string) => void;
  onOpenProfile: (id: string) => void;
}> = ({ lives, onOpenLive, onOpenProfile }) => {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {lives.map((live) => (
        <LiveCard
          key={live.id}
          live={live}
          onOpenLive={() => onOpenLive(live.id)}
          onOpenProfile={() => onOpenProfile(live.host.id)}
        />
      ))}
    </div>
  );
};

const LiveCard: React.FC<{
  live: Live;
  onOpenLive: () => void;
  onOpenProfile: () => void;
}> = ({ live, onOpenLive, onOpenProfile }) => {
  const badge =
    live.category === "vip" ? "VIP" : live.category === "plan-cul" ? "PLAN CUL ⭐" : "POPULAIRE";

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <button
        type="button"
        onClick={onOpenLive}
        className="relative block w-full"
        aria-label={`Ouvrir le live ${live.title}`}
      >
        <div className="aspect-[16/10] w-full overflow-hidden">
          <img
            src={live.coverUrl}
            alt={live.title}
            className="h-full w-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[11px] font-black text-white/90">
            <LiveTVIcon size={18} />
            EN DIRECT
          </span>

          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-black"
            style={{
              background:
                "linear-gradient(135deg, rgba(232,162,182,0.16), rgba(215,178,124,0.14))",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "rgba(255,255,255,0.90)",
            }}
          >
            {badge}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur-xl">
            <div className="line-clamp-1 text-sm font-black text-white/95">
              {live.title}
            </div>
            <div className="mt-1 flex items-center justify-between">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenProfile();
                }}
                className="flex items-center gap-2"
                aria-label={`Voir le profil de ${live.host.username}`}
              >
                <img
                  src={live.host.avatarUrl}
                  alt={live.host.username}
                  className="h-7 w-7 rounded-full border border-white/15 object-cover"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-white/85">
                    {live.host.username}
                  </span>
                  <TierBadge tier={live.host.tier} />
                  {live.host.isLive ? <LiveTVIcon size={16} /> : null}
                </div>
              </button>

              <div className="text-xs font-extrabold text-white/75">
                👀 {formatCompactNumber(live.viewers)}
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

const ReelsPreview: React.FC<{
  reels: ReelPreview[];
  onOpenReel: (id: string) => void;
  onOpenProfile: (id: string) => void;
}> = ({ reels, onOpenReel, onOpenProfile }) => {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {reels.map((r) => (
        <button
          key={r.id}
          type="button"
          onClick={() => onOpenReel(r.id)}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left"
        >
          <div className="aspect-[9/12] overflow-hidden">
            <img
              src={r.coverUrl}
              alt={r.caption}
              className="h-full w-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="rounded-2xl border border-white/10 bg-black/45 p-3 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenProfile(r.user.id);
                  }}
                  className="flex items-center gap-2"
                  aria-label={`Profil de ${r.user.username}`}
                >
                  <img src={r.user.avatarUrl} alt={r.user.username} className="h-7 w-7 rounded-full border border-white/15 object-cover" />
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-white/85">{r.user.username}</span>
                    <TierBadge tier={r.user.tier} />
                    {r.user.isLive ? <LiveTVIcon size={16} /> : null}
                  </div>
                </button>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-black text-white/80">
                  ▶
                </span>
              </div>
              <div className="mt-2 line-clamp-1 text-xs font-semibold text-white/70">
                {r.caption}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

const GamePreview: React.FC<{ onGo: () => void }> = ({ onGo }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="pointer-events-none absolute -right-24 -top-20 h-[260px] w-[260px] rounded-full blur-3xl"
           style={{ background: "radial-gradient(circle, rgba(215,178,124,0.16), transparent 70%)" }} />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-black text-white/95">🎮 Game & Défis</div>
          <div className="mt-1 text-sm font-medium text-white/70">
            Joue et gagne des Étincelles. Missions rapides, récompenses direct.
          </div>
        </div>
        <button
          type="button"
          onClick={onGo}
          className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-black text-white/90 hover:bg-white/10"
        >
          Jouer maintenant
        </button>
      </div>
    </div>
  );
};

const PlanCulPreview: React.FC<{
  onGo: () => void;
  onOpenProfile: (id: string) => void;
  candidates: Member[];
}> = ({ onGo, onOpenProfile, candidates }) => {
  const picks = candidates.slice(0, 5);
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-lg font-black text-white/95">🔥 Plan Cul ⭐</div>
          <div className="mt-1 text-sm font-medium text-white/70">
            Découvre des profils proches et connecte vite.
          </div>
        </div>
        <button
          type="button"
          onClick={onGo}
          className="rounded-2xl px-4 py-2 text-sm font-black text-[#120A12]"
          style={{
            background:
              "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
          }}
        >
          Découvrir
        </button>
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {picks.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onOpenProfile(m.id)}
            className="group w-[180px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left hover:bg-white/10"
          >
            <div className="p-3">
              <div className="flex items-center gap-2">
                <img src={m.avatarUrl} alt={m.username} className="h-10 w-10 rounded-full border border-white/15 object-cover" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-black text-white/90">{m.username}</span>
                    <TierBadge tier={m.tier} />
                    {m.isLive ? <LiveTVIcon size={18} /> : null}
                  </div>
                  <div className="text-xs font-semibold text-white/60">
                    {m.isNew ? "🆕 Nouveau" : m.isPopular ? "🔥 Populaire" : "Actif"}
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-xs font-semibold text-white/70">
                Cliquer pour ouvrir le profil
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const ShopPreview: React.FC<{
  items: ProductPreview[];
  onGo: () => void;
  onOpenItem: (id: string) => void;
}> = ({ items, onGo, onOpenItem }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-lg font-black text-white/95">🛍️ Shop</div>
          <div className="mt-1 text-sm font-medium text-white/70">
            Étincelles, Boost, VIP, Gold.
          </div>
        </div>
        <button
          type="button"
          onClick={onGo}
          className="rounded-2xl border border-white/12 bg-white/5 px-4 py-2 text-sm font-black text-white/90 hover:bg-white/10"
        >
          Voir le shop
        </button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {items.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onOpenItem(p.id)}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left hover:bg-white/10"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img src={p.coverUrl} alt={p.title} className="h-full w-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-[1.03]" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="line-clamp-1 text-sm font-black text-white/90">{p.title}</div>
                  <div className="mt-1 text-xs font-extrabold text-white/70">{p.price}</div>
                </div>
                {p.badge ? (
                  <span className="shrink-0 rounded-full border border-white/10 bg-black/25 px-2 py-1 text-[10px] font-black text-white/85">
                    {p.badge}
                  </span>
                ) : null}
              </div>
              <div className="mt-3 rounded-2xl px-3 py-2 text-xs font-black text-[#120A12]"
                   style={{ background: "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))" }}>
                Ouvrir
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const MagicCoolerPreview: React.FC<{ onGo: () => void }> = ({ onGo }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-[320px] w-[320px] rounded-full blur-3xl"
           style={{ background: "radial-gradient(circle, rgba(232,162,182,0.16), transparent 70%)" }} />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-black text-white/95">❄️ Glacière Magique</div>
          <div className="mt-1 text-sm font-medium text-white/70">
            Offres exclusives aujourd’hui. Ouvre et prends ton avantage.
          </div>
        </div>
        <button
          type="button"
          onClick={onGo}
          className="rounded-2xl px-4 py-3 text-sm font-black text-[#120A12]"
          style={{
            background:
              "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
          }}
        >
          Ouvrir ❄️
        </button>
      </div>
    </div>
  );
};

const Recommendations: React.FC<{
  members: Member[];
  onOpenProfile: (id: string) => void;
}> = ({ members, onOpenProfile }) => {
  const recommended = members.slice(0, 6);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-lg font-black text-white/95">🤝 Recommandations</div>
          <div className="mt-1 text-sm font-medium text-white/70">
            Pour toi (centres d’intérêt, activité, zone).
          </div>
        </div>
        <Link
          to="/explore"
          className="rounded-2xl border border-white/12 bg-white/5 px-4 py-2 text-sm font-black text-white/90 hover:bg-white/10"
        >
          Explorer
        </Link>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {recommended.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onOpenProfile(m.id)}
            className="group rounded-3xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10"
          >
            <div className="flex items-center gap-3">
              <img src={m.avatarUrl} alt={m.username} className="h-12 w-12 rounded-full border border-white/15 object-cover" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-black text-white/90">{m.username}</span>
                  <TierBadge tier={m.tier} />
                  {m.isLive ? <LiveTVIcon size={18} /> : null}
                </div>
                <div className="text-xs font-semibold text-white/60">
                  {m.isNew ? "🆕 Nouveau" : m.isPopular ? "🔥 Populaire" : "Suggéré"}
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-xs font-semibold text-white/70">
              Cliquer pour ouvrir
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const BottomNav: React.FC<{ onGo: (path: string) => void }> = ({ onGo }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[10]">
      <div className="mx-auto w-full max-w-[1180px] px-4 pb-4">
        <div className="rounded-3xl border border-white/10 bg-black/55 p-2 backdrop-blur-2xl">
          <div className="grid grid-cols-7 gap-2">
            <BottomNavBtn label="Accueil" onClick={() => onGo("/")} />
            <BottomNavBtn label="Découvrir" onClick={() => onGo("/explore")} />
            <BottomNavBtn label="Reels" onClick={() => onGo("/reels")} />
            <BottomNavBtn label="Game" onClick={() => onGo("/game")} />
            <BottomNavBtn label="Glacière" onClick={() => onGo("/magic-cooler")} />
            <BottomNavBtn label="Notif" onClick={() => onGo("/notifications")} />
            <BottomNavBtn label="Menu" onClick={() => onGo("/menu")} />
          </div>
        </div>
      </div>
    </div>
  );
};

const BottomNavBtn: React.FC<{ label: string; onClick: () => void }> = ({
  label,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-white/10 bg-white/5 px-2 py-3 text-[11px] font-black text-white/80 hover:bg-white/10"
    >
      {label}
    </button>
  );
};

/* ------------------------------------------
   Badges
------------------------------------------ */

const TierBadge: React.FC<{ tier: MemberTier }> = ({ tier }) => {
  if (tier === "premium") {
    // Badge vert
    return (
      <span
        title="Premium"
        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black"
        style={{
          background: "rgba(46, 204, 113, 0.16)",
          border: "1px solid rgba(46, 204, 113, 0.32)",
          color: "rgba(170, 255, 210, 0.92)",
        }}
      >
        ● PREMIUM
      </span>
    );
  }

  if (tier === "gold") {
    // Badge diamant
    return (
      <span
        title="Gold"
        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black"
        style={{
          background: "rgba(215,178,124,0.18)",
          border: "1px solid rgba(215,178,124,0.30)",
          color: "rgba(255,230,190,0.95)",
        }}
      >
        <DiamondIcon size={12} /> GOLD
      </span>
    );
  }

  return null;
};

const DiamondIcon: React.FC<{ size?: number }> = ({ size = 14 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5 20.5 9 12 21 3.5 9 12 3.5Z"
        stroke="rgba(255,230,190,0.95)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 9H20.5"
        stroke="rgba(255,230,190,0.65)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 3.5 15.2 9 12 21 8.8 9 12 3.5Z"
        stroke="rgba(255,230,190,0.35)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Live icon TV: point rouge clignote à l'intérieur de l'écran.
 * Demande: "le rouge clignote a l'interrieur d'une television 📺"
 */
const LiveTVIcon: React.FC<{ size?: number }> = ({ size = 20 }) => {
  const px = size;
  return (
    <span
      className="relative inline-flex items-center justify-center"
      style={{ width: px, height: px }}
      aria-label="En live"
      title="En live"
    >
      <svg width={px} height={px} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 5.5h10c1.66 0 3 1.34 3 3v6c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3v-6c0-1.66 1.34-3 3-3Z"
          stroke="rgba(255,255,255,0.88)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9 19.5h6"
          stroke="rgba(255,255,255,0.60)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M10 3.5 8.2 5.2M14 3.5 15.8 5.2"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* écran intérieur */}
        <path
          d="M6.9 8.2h10.2v6.6H6.9V8.2Z"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="1"
        />
      </svg>

      {/* point rouge blink INSIDE screen */}
      <span
        className="live-dot"
        style={{
          position: "absolute",
          width: Math.max(4, Math.round(px * 0.22)),
          height: Math.max(4, Math.round(px * 0.22)),
          borderRadius: 999,
          left: "52%",
          top: "44%",
          transform: "translate(-50%, -50%)",
          background: "rgb(255, 59, 59)",
          boxShadow: "0 0 10px rgba(255,59,59,0.75)",
        }}
      />
    </span>
  );
};

/* ------------------------------------------
   Utils + CSS Animations
------------------------------------------ */

function formatCompactNumber(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
}

const cssAnimations = `
/* live dot blink */
.live-dot {
  animation: aykLiveBlink 0.9s ease-in-out infinite;
}
@keyframes aykLiveBlink {
  0% { opacity: 0.25; transform: translate(-50%, -50%) scale(0.92); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
  100% { opacity: 0.25; transform: translate(-50%, -50%) scale(0.92); }
}

/* Story ring animation (non-vue) */
.story-ring {
  position: absolute;
  inset: -6px;
  border-radius: 999px;
  padding: 2px;
  filter: drop-shadow(0 10px 24px rgba(0,0,0,0.35));
}
.story-ring::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: conic-gradient(from 0deg, rgba(232,162,182,1), rgba(215,178,124,1), rgba(242,161,198,1), rgba(232,162,182,1));
  animation: aykStorySpin 1.6s linear infinite;
  opacity: 0.95;
}
.story-ring::after {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: 999px;
  background: rgba(7,6,10,0.75);
  border: 1px solid rgba(255,255,255,0.10);
}

/* variants */
.story-ring--live::before {
  background: conic-gradient(from 0deg, rgba(255,59,59,1), rgba(232,162,182,1), rgba(255,59,59,1), rgba(215,178,124,1));
}
.story-ring--gold::before {
  background: conic-gradient(from 0deg, rgba(215,178,124,1), rgba(255,230,190,1), rgba(232,162,182,1), rgba(215,178,124,1));
}
.story-ring--premium::before {
  background: conic-gradient(from 0deg, rgba(46,204,113,1), rgba(170,255,210,1), rgba(232,162,182,1), rgba(46,204,113,1));
}
.story-ring--standard::before {
  background: conic-gradient(from 0deg, rgba(232,162,182,1), rgba(242,161,198,1), rgba(215,178,124,1), rgba(232,162,182,1));
}

@keyframes aykStorySpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Story ring static (vue) */
.story-ring-static {
  position: absolute;
  inset: -6px;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  box-shadow: 0 14px 32px rgba(0,0,0,0.28);
}
.story-ring-static--live {
  border-color: rgba(255,59,59,0.28);
}
.story-ring-static--gold {
  border-color: rgba(215,178,124,0.28);
}
.story-ring-static--premium {
  border-color: rgba(46,204,113,0.28);
}
` ;
