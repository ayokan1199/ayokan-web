// src/auth/context/AuthGuard.tsx
import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;

  /**
   * true = route protégée (par défaut)
   * false = route accessible aux invités
   */
  requireLogin?: boolean;

  /**
   * Où rediriger si requireLogin=true et user absent
   * (par défaut: /auth)
   */
  redirectTo?: string;

  /**
   * Où rediriger si requireLogin=false et user présent
   * (par défaut: /)
   */
  redirectIfAuthedTo?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireLogin = true,
  redirectTo = "/auth",
  redirectIfAuthedTo = "/",
}) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthed = !!user;

  useEffect(() => {
    // Ne rien faire pendant chargement
    if (isLoading) return;

    // Cas 1: route protégée et pas connecté -> /auth
    if (requireLogin && !isAuthed) {
      navigate(redirectTo, {
        replace: true,
        state: { from: location.pathname + location.search },
      });
      return;
    }

    // Cas 2: route guest-only (requireLogin=false) et déjà connecté -> /
    if (!requireLogin && isAuthed) {
      navigate(redirectIfAuthedTo, { replace: true });
    }
  }, [
    isLoading,
    isAuthed,
    requireLogin,
    navigate,
    redirectTo,
    redirectIfAuthedTo,
    location.pathname,
    location.search,
  ]);

  // Loader premium pendant le chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07060A] text-white flex items-center justify-center">
        <div className="w-full max-w-sm px-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
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
                <div className="text-sm font-black tracking-[0.22em] text-white/95">
                  AYOKAN
                </div>
                <div className="text-sm text-white/65">Chargement…</div>
              </div>
            </div>

            <div className="mt-5">
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 animate-[ayokan_loading_1.2s_ease-in-out_infinite] rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                  }}
                />
              </div>
              <div className="mt-3 text-xs text-white/55">
                Synchronisation de la session…
              </div>
            </div>
          </div>

          {/* Animation sans dépendance */}
          <style>{`
            @keyframes ayokan_loading {
              0% { transform: translateX(-45%); opacity: .65; }
              50% { transform: translateX(0%); opacity: 1; }
              100% { transform: translateX(45%); opacity: .65; }
            }
            .animate-[ayokan_loading_1.2s_ease-in-out_infinite]{
              animation: ayokan_loading 1.2s ease-in-out infinite;
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Pendant le redirect, on évite un flash de contenu
  if (requireLogin && !isAuthed) return null;
  if (!requireLogin && isAuthed) return null;

  return <>{children}</>;
};
