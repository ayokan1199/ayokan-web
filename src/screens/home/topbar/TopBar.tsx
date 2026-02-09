// src/home/topbar/Topbar.tsx
import React from "react";

type TopbarProps = {
  onGo: (path: string) => void;
  onOpenProfile: () => void;

  /** optionnel: pour faire clignoter Live si live populaire */
  liveHot?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ onGo, onOpenProfile, liveHot = true }) => {
  return (
    <div
      className="sticky top-0 z-[50] -mx-4 px-4 py-3 backdrop-blur-xl"
      style={{
        background:
          "linear-gradient(180deg, rgba(7,6,10,0.90) 0%, rgba(7,6,10,0.35) 100%)",
      }}
    >
      <style>{css}</style>

      <div className="flex items-center justify-between gap-3">
        {/* Brand */}
        <button
          type="button"
          onClick={() => onGo("/")}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
          aria-label="Aller à l'accueil"
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

        {/* Nav */}
        <nav className="hidden items-center gap-2 md:flex" aria-label="Navigation principale">
          <TopbarLink
            label="Live"
            onClick={() => onGo("/live")}
            hot={liveHot}
            icon="🔴"
          />
          <TopbarLink label="Shop" onClick={() => onGo("/shop")} />
          <TopbarLink label="Explorer" onClick={() => onGo("/explore")} />
          <TopbarLink label="Plan Cul ⭐" onClick={() => onGo("/plan-cul")} />
          <TopbarLink label="Messages" onClick={() => onGo("/messages")} />
          <TopbarLink label="VIP" onClick={() => onGo("/vip")} vip />
        </nav>

        {/* Profile */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
          aria-label="Ouvrir mon profil"
        >
          <span className="text-xs font-extrabold text-white/85">Profil</span>
          <img
            src="https://i.pravatar.cc/80?img=1"
            alt="Mon profil"
            className="h-8 w-8 rounded-full border border-white/15 object-cover"
          />
        </button>
      </div>

      {/* Mobile quick bar (cliquable) */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:hidden">
        <MobilePill label="Live" onClick={() => onGo("/live")} hot={liveHot} />
        <MobilePill label="Shop" onClick={() => onGo("/shop")} />
        <MobilePill label="Explorer" onClick={() => onGo("/explore")} />
        <MobilePill label="Plan Cul ⭐" onClick={() => onGo("/plan-cul")} />
        <MobilePill label="Messages" onClick={() => onGo("/messages")} />
        <MobilePill label="VIP" onClick={() => onGo("/vip")} vip />
      </div>
    </div>
  );
};

export default Topbar;

/* ---------------------------------- */

const TopbarLink: React.FC<{
  label: string;
  onClick: () => void;
  hot?: boolean;
  vip?: boolean;
  icon?: string;
}> = ({ label, onClick, hot, vip, icon }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-extrabold text-white/85 hover:bg-white/10"
    >
      <span className="inline-flex items-center gap-2">
        {icon ? <span aria-hidden="true">{icon}</span> : null}
        {label}
      </span>

      {hot ? (
        <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-black text-white/90">
          <span className="live-pulse-dot" aria-hidden="true" />
          HOT
        </span>
      ) : null}

      {vip ? (
        <span
          className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black"
          style={{
            background: "rgba(215,178,124,0.20)",
            border: "1px solid rgba(215,178,124,0.28)",
            color: "rgba(255,230,190,0.92)",
          }}
        >
          VIP
        </span>
      ) : null}
    </button>
  );
};

const MobilePill: React.FC<{
  label: string;
  onClick: () => void;
  hot?: boolean;
  vip?: boolean;
}> = ({ label, onClick, hot, vip }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black text-white/85 hover:bg-white/10"
    >
      <span className="inline-flex items-center gap-2">
        {label}
        {hot ? <span className="live-pulse-dot" aria-hidden="true" /> : null}
        {vip ? (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-black"
            style={{
              background: "rgba(215,178,124,0.20)",
              border: "1px solid rgba(215,178,124,0.28)",
              color: "rgba(255,230,190,0.92)",
            }}
          >
            VIP
          </span>
        ) : null}
      </span>
    </button>
  );
};

const css = `
.live-pulse-dot{
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: rgb(255,59,59);
  box-shadow: 0 0 12px rgba(255,59,59,0.75);
  animation: aykTopLive 0.9s ease-in-out infinite;
}
@keyframes aykTopLive {
  0% { opacity: 0.25; transform: scale(0.92); }
  50% { opacity: 1; transform: scale(1.08); }
  100% { opacity: 0.25; transform: scale(0.92); }
}
`;
