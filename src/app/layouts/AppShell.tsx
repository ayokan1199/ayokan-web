// src/app/layout/AppShell.tsx
import React from "react";

type AppShellProps = {
  children: React.ReactNode;
  /**
   * Slot à droite du header (ex: boutons, avatar, langue, etc.)
   */
  topRight?: React.ReactNode;
  /**
   * Titre/brand (si tu veux le changer selon les pages)
   */
  brandText?: string;
  /**
   * Classe additionnelle pour le wrapper principal
   */
  className?: string;
  /**
   * Désactive le footer si tu veux une page full-bleed
   */
  showFooter?: boolean;
};

type ErrorBoundaryState = { hasError: boolean; error?: unknown };

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown) {
    // Pas de console rouge envahissante en prod, mais on garde un log utile en dev
    if (import.meta?.env?.DEV) {
      // eslint-disable-next-line no-console
      console.error("[AppShell ErrorBoundary]", error);
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-[#07060A] text-white">
        <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-14">
          <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.10), 0 18px 44px rgba(0,0,0,0.45)",
                }}
                aria-hidden="true"
              />
              <div>
                <div className="text-lg font-black tracking-wide">AYOKAN</div>
                <div className="text-sm text-white/65">
                  Une erreur est survenue, mais l’app reste debout.
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-white/80">
              <div className="font-semibold text-white/90">Détails (dev)</div>
              <div className="mt-2 break-words whitespace-pre-wrap">
                {import.meta?.env?.DEV
                  ? String(
                      this.state.error instanceof Error
                        ? this.state.error.stack || this.state.error.message
                        : this.state.error
                    )
                  : "Recharge la page. Si ça persiste, contacte le support."}
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl px-5 font-extrabold text-[#140F16] sm:w-auto"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                }}
              >
                Recharger
              </button>

              <a
                href="/"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 font-extrabold text-white sm:w-auto"
              >
                Retour accueil
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default function AppShell({
  children,
  topRight,
  brandText = "AYOKAN",
  className = "",
  showFooter = true,
}: AppShellProps) {
  return (
    <ErrorBoundary>
      <div
        className={[
          "min-h-screen bg-[#07060A] text-white",
          // Anti “écran blanc”: on force un fond sombre partout
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
              "linear-gradient(180deg, rgba(0,0,0,0.40), rgba(0,0,0,0.94))",
            ].join(","),
          }}
        />

        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <a href="/" className="flex items-center gap-3">
              <span
                className="h-9 w-9 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.10), 0 18px 44px rgba(0,0,0,0.45)",
                }}
                aria-hidden="true"
              />
              <span className="text-sm font-black tracking-[0.22em] text-white/95">
                {brandText}
              </span>
            </a>

            <div className="flex items-center gap-3">{topRight}</div>
          </div>
        </header>

        {/* Main */}
        <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          {children}
        </main>

        {/* Footer */}
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
    </ErrorBoundary>
  );
}
