// src/home/shared/BottomNavbar.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type BottomNavItem = {
  key: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  badgeCount?: number;
};

type BottomNavbarProps = {
  items?: BottomNavItem[];
  className?: string;
};

const BottomNavbar: React.FC<BottomNavbarProps> = ({ items, className }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: BottomNavItem[] =
    items ??
    [
      { key: "home", label: "Accueil", path: "/", icon: <HomeIcon /> },
      { key: "discover", label: "Découvrir", path: "/discover", icon: <SearchIcon /> },
      { key: "reels", label: "Reels", path: "/reels", icon: <PlayIcon /> },
      { key: "game", label: "Game", path: "/game", icon: <GameIcon /> },
      { key: "cooler", label: "Glacière", path: "/cooler", icon: <SnowIcon /> },
      {
        key: "notif",
        label: "Notifications",
        path: "/notifications",
        icon: <BellIcon />,
        badgeCount: 2, // tu peux remplacer par une vraie valeur
      },
      { key: "menu", label: "Menu", path: "/menu", icon: <MenuIcon /> },
    ];

  const activeKey = getActiveKey(location.pathname, navItems);

  return (
    <nav
      aria-label="Bottom navigation"
      className={[
        "fixed bottom-0 left-0 right-0 z-50",
        "pb-[max(env(safe-area-inset-bottom),10px)]",
        className ?? "",
      ].join(" ")}
    >
      <style>{css}</style>

      {/* backdrop */}
      <div className="relative mx-auto w-full max-w-3xl px-4">
        <div className="pointer-events-none absolute inset-x-4 -top-10 h-16 blur-2xl bottomnav-glow" />

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bottomnav-sheen opacity-[0.20]" />

          <div className="grid grid-cols-7 gap-1 px-2 py-2">
            {navItems.map((it) => {
              const isActive = it.key === activeKey;

              return (
                <button
                  key={it.key}
                  type="button"
                  onClick={() => navigate(it.path)}
                  className={[
                    "relative flex flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2",
                    "transition active:scale-[0.99]",
                    isActive ? "bg-white/10" : "hover:bg-white/7",
                  ].join(" ")}
                  aria-label={it.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="relative">
                    <span
                      className={[
                        "inline-flex h-7 w-7 items-center justify-center",
                        isActive ? "text-white" : "text-white/75",
                      ].join(" ")}
                    >
                      {it.icon}
                    </span>

                    {typeof it.badgeCount === "number" && it.badgeCount > 0 ? (
                      <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-black text-white bottomnav-badge">
                        {it.badgeCount > 99 ? "99+" : it.badgeCount}
                      </span>
                    ) : null}
                  </span>

                  <span
                    className={[
                      "text-[10px] font-black",
                      isActive ? "text-white/92" : "text-white/60",
                    ].join(" ")}
                  >
                    {it.label}
                  </span>

                  {isActive ? (
                    <span className="absolute inset-x-3 bottom-1 h-[3px] rounded-full bottomnav-active" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNavbar;

/* ---------------------------------- */

function getActiveKey(pathname: string, items: BottomNavItem[]) {
  // match exact first
  const exact = items.find((it) => it.path === pathname);
  if (exact) return exact.key;

  // then prefix match (ex: /reels/123 => /reels)
  const prefix = items
    .filter((it) => it.path !== "/")
    .sort((a, b) => b.path.length - a.path.length)
    .find((it) => pathname.startsWith(it.path));
  if (prefix) return prefix.key;

  // fallback to home
  return items.find((it) => it.path === "/")?.key ?? items[0]?.key ?? "home";
}

/* ---------------------------------- */
/* Icons (inline, no deps) */

const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M16.5 16.5 21 21"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M10 8.5v7l6-3.5-6-3.5Z"
      fill="currentColor"
      opacity="0.95"
    />
    <path
      d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const GameIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 10h10a4 4 0 0 1 4 4v3a3 3 0 0 1-3 3h-1.5a2 2 0 0 1-1.7-.94l-.9-1.36h-3.8l-.9 1.36A2 2 0 0 1 7.5 20H6a3 3 0 0 1-3-3v-3a4 4 0 0 1 4-4Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M8.2 14.5h3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M9.8 12.9v3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M16.7 13.4h.01" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M18.3 15h.01" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
  </svg>
);

const SnowIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M7 4.5 12 9.5l5-5M7 19.5 12 14.5l5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.9"
    />
  </svg>
);

const BellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M18 9a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 19a2.5 2.5 0 0 0 5 0"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 7h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M5 17h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const css = `
.bottomnav-glow{
  background: radial-gradient(circle, rgba(232,162,182,0.18), transparent 70%),
              radial-gradient(circle, rgba(215,178,124,0.14), transparent 70%);
}

.bottomnav-active{
  background: linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1));
  box-shadow: 0 8px 24px rgba(232,162,182,0.25);
}

.bottomnav-badge{
  background: rgb(255,59,59);
  box-shadow: 0 0 14px rgba(255,59,59,0.55);
}

.bottomnav-sheen{
  background: linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.25) 18%, transparent 36%);
  transform: translateX(-55%) skewX(-12deg);
  animation: aykNavSheen 6.0s ease-in-out infinite;
}

@keyframes aykNavSheen{
  0% { transform: translateX(-60%) skewX(-12deg); opacity: 0.00; }
  12%{ opacity: 0.16; }
  42%{ transform: translateX(130%) skewX(-12deg); opacity: 0.00; }
  100%{ transform: translateX(130%) skewX(-12deg); opacity: 0.00; }
}
`;
