// src/home/inject/InviteFriendsCard.tsx
import React, { useMemo, useState } from "react";

type InviteFriendsCardProps = {
  inviteUrl: string;

  rewardLabel?: string; // ex: "Étincelles"
  rewardAmount?: number; // ex: 150

  onShareWhatsApp?: (url: string) => void;
  onShareInstagram?: (url: string) => void;
  onShareFacebook?: (url: string) => void;

  onCopied?: () => void;
  className?: string;
};

const InviteFriendsCard: React.FC<InviteFriendsCardProps> = ({
  inviteUrl,
  rewardLabel = "Étincelles",
  rewardAmount = 120,
  onShareWhatsApp,
  onShareInstagram,
  onShareFacebook,
  onCopied,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const shareText = useMemo(() => {
    return `Rejoins-moi sur AYOKAN ✨ On se retrouve là-bas: ${inviteUrl}`;
  }, [inviteUrl]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      onCopied?.();
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // fallback: create temp input
      const el = document.createElement("textarea");
      el.value = inviteUrl;
      el.style.position = "fixed";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        onCopied?.();
        window.setTimeout(() => setCopied(false), 1400);
      } finally {
        document.body.removeChild(el);
      }
    }
  };

  const openWhatsApp = () => {
    if (onShareWhatsApp) return onShareWhatsApp(inviteUrl);
    const wa = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(wa, "_blank", "noopener,noreferrer");
  };

  const openFacebook = () => {
    if (onShareFacebook) return onShareFacebook(inviteUrl);
    const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteUrl)}`;
    window.open(fb, "_blank", "noopener,noreferrer");
  };

  const openInstagram = () => {
    // IG web share is limited. We do best-effort: copy + open IG.
    if (onShareInstagram) return onShareInstagram(inviteUrl);
    void copy();
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
  };

  const openNativeShare = async () => {
    const navAny = navigator as any;
    if (!navAny.share) return;
    try {
      await navAny.share({
        title: "AYOKAN",
        text: shareText,
        url: inviteUrl,
      });
    } catch {
      // user canceled
    }
  };

  const canNativeShare = typeof (navigator as any)?.share === "function";

  return (
    <section className={["mt-6", className ?? ""].join(" ")} aria-label="Inviter des amis">
      <style>{css}</style>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
        {/* glows */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full blur-3xl inv-glow-rose" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-[360px] w-[360px] rounded-full blur-3xl inv-glow-gold" />

        {/* shimmer */}
        <div className="pointer-events-none absolute inset-0 inv-sheen opacity-[0.18]" />

        <div className="relative z-[1] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-black text-white/92">
                🤝 Invite tes amis & gagne
              </h2>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-black"
                style={{
                  background: "rgba(215,178,124,0.18)",
                  border: "1px solid rgba(215,178,124,0.24)",
                  color: "rgba(255,230,190,0.92)",
                }}
              >
                +{Math.max(0, Math.floor(rewardAmount))} {rewardLabel} 🔥
              </span>
            </div>

            <p className="mt-1 text-sm font-semibold text-white/65">
              Partage ton lien. Chaque ami qui s’inscrit te donne un boost et des récompenses.
            </p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-3">
              <div className="text-[11px] font-black text-white/70">Ton lien</div>
              <div className="mt-1 flex items-center justify-between gap-3">
                <div className="min-w-0 truncate text-[12px] font-semibold text-white/80">
                  {inviteUrl}
                </div>

                <button
                  type="button"
                  onClick={copy}
                  className="shrink-0 rounded-2xl border border-white/12 bg-white/5 px-3 py-2 text-xs font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
                >
                  {copied ? "Copié ✔" : "Copier"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 md:w-[340px]">
            {canNativeShare ? (
              <button
                type="button"
                onClick={openNativeShare}
                className="rounded-2xl px-4 py-3 text-sm font-black text-[#120A12] active:scale-[0.99]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
                }}
              >
                Partager maintenant
              </button>
            ) : (
              <button
                type="button"
                onClick={copy}
                className="rounded-2xl px-4 py-3 text-sm font-black text-[#120A12] active:scale-[0.99]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
                }}
              >
                Copier le lien
              </button>
            )}

            <div className="grid grid-cols-3 gap-2">
              <SocialButton label="WhatsApp" onClick={openWhatsApp} icon={<WhatsAppIcon />} />
              <SocialButton label="Instagram" onClick={openInstagram} icon={<InstagramIcon />} />
              <SocialButton label="Facebook" onClick={openFacebook} icon={<FacebookIcon />} />
            </div>

            <div className="text-[11px] font-semibold text-white/55">
              Astuce: partage en story pour doubler tes chances ✨
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InviteFriendsCard;

/* ---------------------------------- */

const SocialButton: React.FC<{
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}> = ({ label, onClick, icon }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-3 py-3 text-xs font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
      aria-label={`Partager sur ${label}`}
    >
      <span className="h-4 w-4 opacity-90">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

/* ---------------------------------- */
/* Icons inline (no deps) */

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M20 11.9a8 8 0 0 1-11.7 7L4 20l1.2-4.1A8 8 0 1 1 20 11.9Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      opacity="0.9"
    />
    <path
      d="M9.7 9.2c.2-.5.5-.6.8-.6h.5c.1 0 .3 0 .4.3l.6 1.4c.1.2.1.4 0 .5l-.3.4c-.1.2-.2.3-.1.5.1.3.6 1.2 1.5 1.9.9.7 1.6 1 1.9 1.1.2.1.4 0 .5-.1l.5-.6c.1-.1.3-.1.5 0l1.3.6c.2.1.3.3.3.4 0 .3-.1 1-.7 1.4-.5.4-1.2.4-1.6.3-.4-.1-1.8-.5-3.2-1.7-1.7-1.4-2.4-3.2-2.5-3.6-.1-.4-.1-1 .1-1.4Z"
      fill="currentColor"
      opacity="0.9"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M17.5 6.5h.01"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M14 8h2V5h-2c-2 0-4 1.6-4 4v2H8v3h2v7h3v-7h2.2l.8-3H13V9c0-.6.4-1 1-1Z"
      fill="currentColor"
      opacity="0.9"
    />
  </svg>
);

/* ---------------------------------- */

const css = `
.inv-glow-rose{
  background: radial-gradient(circle, rgba(232,162,182,0.14), transparent 72%);
}
.inv-glow-gold{
  background: radial-gradient(circle, rgba(215,178,124,0.12), transparent 72%);
}

.inv-sheen{
  background: linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.22) 18%, transparent 36%);
  transform: translateX(-55%) skewX(-12deg);
  animation: aykInviteSheen 6.6s ease-in-out infinite;
}

@keyframes aykInviteSheen{
  0% { transform: translateX(-60%) skewX(-12deg); opacity: 0.00; }
  12%{ opacity: 0.16; }
  44%{ transform: translateX(130%) skewX(-12deg); opacity: 0.00; }
  100%{ transform: translateX(130%) skewX(-12deg); opacity: 0.00; }
}
`;
