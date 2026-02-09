// src/auth/context/AuthProvider.tsx
import React, { ReactNode } from "react";
import { AuthProvider as ContextProvider } from "./AuthContext";

/**
 * AuthProvider racine
 *
 * Centralise tout ce qui touche à l'auth:
 * - AuthContext
 * - futurs SDK (Onfido, analytics auth, etc.)
 * - protection anti écran blanc
 */

class AuthErrorBoundary extends React.Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error("[AuthProvider]", error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07060A] text-white flex items-center justify-center px-6">
          <div className="max-w-sm w-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                }}
              />
              <div>
                <div className="text-sm font-black tracking-[0.22em]">AYOKAN</div>
                <div className="text-sm text-white/65">Auth indisponible</div>
              </div>
            </div>

            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Une erreur est survenue pendant l’initialisation de
              l’authentification.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 h-11 w-full rounded-xl font-extrabold text-[#140F16]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
              }}
            >
              Recharger
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthErrorBoundary>
      <ContextProvider>{children}</ContextProvider>
    </AuthErrorBoundary>
  );
};
