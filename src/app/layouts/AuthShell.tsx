// src/app/layout/AuthShell.tsx
import React from "react";
import AppShell from "./AppShell";

type AuthShellProps = {
  children: React.ReactNode;
  /**
   * Si tu veux masquer le header (landing style full hero).
   * Par défaut: false (on garde un header discret).
   */
  hideHeader?: boolean;
  /**
   * Action "Se connecter" / "S'inscrire" etc.
   */
  topRight?: React.ReactNode;
  /**
   * Texte de marque
   */
  brandText?: string;
  /**
   * Classe additionnelle wrapper
   */
  className?: string;
  /**
   * Affiche ou non le footer générique
   */
  showFooter?: boolean;
};

export default function AuthShell({
  children,
  hideHeader = false,
  topRight,
  brandText = "AYOKAN",
  className = "",
  showFooter = true,
}: AuthShellProps) {
  if (hideHeader) {
    // Landing style: header custom géré dans la page (ex: hero Netflix)
    return (
      <div
        className={[
          "min-h-screen bg-[#07060A] text-white",
          "selection:bg-white/10 selection:text-white",
          className,
        ].join(" ")}
      >
        {/* Backdrop premium rose doré */}
        <div
          className="pointer-events-none fixed inset-0 -z-10 opacity-95"
          aria-hidden="true"
          style={{
            background: [
              "radial-gradient(900px 560px at 18% 18%, rgba(232,162,182,0.22), transparent 62%)",
              "radial-gradient(860px 560px at 82% 16%, rgba(215,178,124,0.20), transparent 60%)",
              "radial-gradient(980px 620px at 55% 62%, rgba(241,183,199,0.13), transparent 64%)",
              "linear-gradient(180deg, rgba(0,0,0,0.30), rgba(0,0,0,0.94))",
            ].join(","),
          }}
        />

        <main className="min-h-screen">{children}</main>

        {showFooter ? (
          <footer className="border-t border-white/10 bg-black/35">
            <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/65 sm:px-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white/55">Des questions ?</span>
                  <a
                    className="underline decoration-[rgba(232,162,182,0.35)] underline-offset-4 hover:text-white hover:decoration-[rgba(215,178,124,0.55)]"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    Contactez-nous
                  </a>
                </div>
                <div className="text-white/55">© {new Date().getFullYear()} {brandText}</div>
              </div>
            </div>
          </footer>
        ) : null}
      </div>
    );
  }

  return (
    <AppShell
      brandText={brandText}
      topRight={
        topRight ?? (
          <div className="flex items-center gap-2">
            <a
              href="/auth/login"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-extrabold text-white hover:bg-white/10"
            >
              Se connecter
            </a>
            <a
              href="/auth/signup"
              className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-extrabold text-[#140F16]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
              }}
            >
              S&apos;inscrire
            </a>
          </div>
        )
      }
      className={className}
      showFooter={showFooter}
    >
      {/* Container auth: plus étroit, plus “premium form” */}
      <div className="mx-auto w-full max-w-xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-7">
          {children}
        </div>
      </div>
    </AppShell>
  );
}
