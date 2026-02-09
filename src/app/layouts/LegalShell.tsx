// src/app/layout/LegalShell.tsx
import React from "react";
import AppShell from "./AppShell";

type LegalShellProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  /**
   * Si tu veux un sommaire/aside à gauche (optionnel).
   */
  aside?: React.ReactNode;
  /**
   * Slot en haut à droite du header (ex: recherche, retour, etc.)
   */
  topRight?: React.ReactNode;
  /**
   * Texte de marque
   */
  brandText?: string;
};

export default function LegalShell({
  children,
  title = "Informations légales",
  subtitle = "Politiques, conditions et informations importantes.",
  aside,
  topRight,
  brandText = "AYOKAN",
}: LegalShellProps) {
  return (
    <AppShell
      brandText={brandText}
      topRight={
        topRight ?? (
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-extrabold text-white hover:bg-white/10"
            >
              Accueil
            </a>
            <a
              href="/settings/legal"
              className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-extrabold text-[#140F16]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
              }}
            >
              Legal Hub
            </a>
          </div>
        )
      }
      showFooter
      className="bg-[#07060A]"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-7">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              {title}
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-white/65 sm:text-base">
              {subtitle}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            {/* Aside / Sommaire */}
            {aside ? (
              <aside className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="mb-3 text-xs font-extrabold uppercase tracking-wider text-white/60">
                  Sommaire
                </div>
                {aside}
              </aside>
            ) : (
              <aside className="hidden lg:block" aria-hidden="true" />
            )}

            {/* Contenu */}
            <section className="min-w-0">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-6">
                <div
                  className={[
                    "prose prose-invert max-w-none",
                    // prose-safe: évite blancs/rouges et garde la lisibilité
                    "prose-headings:font-black prose-headings:text-white",
                    "prose-p:text-white/75",
                    "prose-strong:text-white",
                    "prose-a:text-[rgba(232,162,182,0.95)] prose-a:underline prose-a:decoration-[rgba(215,178,124,0.50)]",
                    "prose-li:text-white/75",
                    "prose-hr:border-white/10",
                    "prose-blockquote:border-l-[rgba(232,162,182,0.55)] prose-blockquote:text-white/75",
                    "prose-code:text-white prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-lg",
                    "prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10",
                    "prose-table:text-white/75",
                  ].join(" ")}
                >
                  {children}
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-white/55">
                  Dernière mise à jour: <span className="font-semibold text-white/70">auto</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href="#top"
                    className="inline-flex h-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 text-xs font-extrabold text-white hover:bg-white/10"
                  >
                    Haut de page
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex h-9 items-center justify-center rounded-xl px-4 text-xs font-extrabold text-[#140F16]"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                    }}
                  >
                    Support
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
