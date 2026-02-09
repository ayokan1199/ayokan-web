// src/home/inject/AdultDisclaimer.tsx
import React from "react";

type AdultDisclaimerProps = {
  variant?: "inline" | "card";
  onReport?: () => void;
  onSafety?: () => void;
  onTerms?: () => void;
  className?: string;
};

const AdultDisclaimer: React.FC<AdultDisclaimerProps> = ({
  variant = "card",
  onReport,
  onSafety,
  onTerms,
  className,
}) => {
  if (variant === "inline") {
    return (
      <div
        className={[
          "mt-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-left backdrop-blur-xl",
          className ?? "",
        ].join(" ")}
        aria-label="Disclaimer adulte"
      >
        <style>{css}</style>

        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-black text-white/90">
            🔞
          </span>
          <div className="min-w-0">
            <div className="text-sm font-black text-white/90">
              Contenu réservé aux adultes (+18)
            </div>
            <div className="text-[12px] font-semibold text-white/60">
              Respect, consentement, et signalement en 1 clic.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onReport ? (
            <button
              type="button"
              onClick={onReport}
              className="rounded-2xl border border-white/12 bg-white/5 px-3 py-2 text-xs font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
            >
              Signaler
            </button>
          ) : null}

          {onSafety ? (
            <button
              type="button"
              onClick={onSafety}
              className="rounded-2xl border border-white/12 bg-white/5 px-3 py-2 text-xs font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
            >
              Sécurité
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <section className={["mt-6", className ?? ""].join(" ")} aria-label="Sécurité +18">
      <style>{css}</style>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
        {/* glows */}
        <div className="pointer-events-none absolute -left-28 -top-28 h-[320px] w-[320px] rounded-full blur-3xl adlt-glow-rose" />
        <div className="pointer-events-none absolute -right-28 -bottom-28 h-[340px] w-[340px] rounded-full blur-3xl adlt-glow-gold" />

        <div className="relative z-[1] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="adlt-orbit absolute -inset-2 rounded-3xl" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-black/35 text-xl font-black text-white/90">
                🔞
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-black text-white/92">
                Contenu réservé aux adultes
              </h3>
              <p className="mt-1 text-sm font-semibold text-white/65">
                AYOKAN est une plateforme +18. Zéro tolérance pour les abus. Consentement
                obligatoire. Signale immédiatement tout comportement inapproprié.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Pill label="✅ Consentement" />
                <Pill label="🛡️ Sécurité" />
                <Pill label="🚫 Anti-abus" />
                <Pill label="⚖️ Modération" />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 md:w-[320px]">
            {onReport ? (
              <button
                type="button"
                onClick={onReport}
                className="rounded-2xl px-4 py-3 text-sm font-black text-[#120A12] active:scale-[0.99]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
                }}
              >
                Signaler un abus
              </button>
            ) : null}

            <div className="grid grid-cols-2 gap-2">
              {onSafety ? (
                <button
                  type="button"
                  onClick={onSafety}
                  className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-xs font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
                >
                  Conseils sécurité
                </button>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs font-black text-white/55">
                  Conseils sécurité
                </div>
              )}

              {onTerms ? (
                <button
                  type="button"
                  onClick={onTerms}
                  className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-xs font-black text-white/90 hover:bg-white/10 active:scale-[0.99]"
                >
                  Règles +18
                </button>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs font-black text-white/55">
                  Règles +18
                </div>
              )}
            </div>

            <div className="text-[11px] font-semibold text-white/55">
              En continuant, tu acceptes nos règles et notre politique de confidentialité.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdultDisclaimer;

/* ---------------------------------- */

const Pill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black text-white/80">
    {label}
  </span>
);

const css = `
.adlt-glow-rose{
  background: radial-gradient(circle, rgba(232,162,182,0.14), transparent 72%);
}
.adlt-glow-gold{
  background: radial-gradient(circle, rgba(215,178,124,0.12), transparent 72%);
}
.adlt-orbit{
  background: conic-gradient(
    from 180deg,
    rgba(232,162,182,0.00),
    rgba(232,162,182,0.40),
    rgba(215,178,124,0.40),
    rgba(232,162,182,0.00)
  );
  filter: blur(0.2px);
  animation: aykAdultOrbit 3.8s linear infinite;
}
@keyframes aykAdultOrbit{
  from { transform: rotate(0deg); opacity: 0.85; }
  to   { transform: rotate(360deg); opacity: 0.85; }
}
`;
