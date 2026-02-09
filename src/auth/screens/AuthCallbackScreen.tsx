import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase.client";
import { theme } from "../../theme/authTheme";

type OnboardingStep =
  | "landing"
  | "age-verification"
  | "profile-setup"
  | "interests"
  | "permissions"
  | "completed";

function normalizeStep(raw: unknown): OnboardingStep {
  if (
    raw === "landing" ||
    raw === "age-verification" ||
    raw === "profile-setup" ||
    raw === "interests" ||
    raw === "permissions" ||
    raw === "completed"
  ) {
    return raw;
  }
  return "landing";
}

function routeFromStep(step: OnboardingStep): string {
  switch (step) {
    case "age-verification":
      return "/auth/age-verification";
    case "profile-setup":
      return "/auth/profile-setup";
    case "interests":
      return "/auth/interests";
    case "permissions":
      return "/auth/permissions";
    case "completed":
      return "/";
    case "landing":
    default:
      return "/auth";
  }
}

export default function AuthCallbackScreen() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Finalisation de la connexion…");

  useEffect(() => {
    let cancelled = false;

    const finalizeAuth = async () => {
      try {
        // Supabase OAuth: la session peut arriver juste après redirect.
        // On attend une micro fenêtre si nécessaire.
        const { data, error } = await supabase.auth.getSession();

        if (cancelled) return;

        if (error || !data.session?.user) {
          navigate("/auth/login", { replace: true });
          return;
        }

        const u = data.session.user;
        const meta = (u.user_metadata ?? {}) as Record<string, unknown>;

        // Priorité: onboardingStep (ta vraie source)
        const step = normalizeStep(meta.onboardingStep);

        setMessage("Synchronisation de ton profil…");

        // Optionnel: si tu veux garantir une étape initiale pour nouveaux users OAuth
        // (certains OAuth users n’ont pas onboardingStep au premier passage)
        if (!meta.onboardingStep) {
          await supabase.auth.updateUser({ data: { onboardingStep: "landing" } });
        }

        // Redirection vers l’étape
        navigate(routeFromStep(step), { replace: true });
      } catch {
        if (!cancelled) navigate("/auth/login", { replace: true });
      }
    };

    finalizeAuth();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.glow} />
      <div style={styles.card}>
        <div style={styles.brandRow}>
          <div style={styles.brandMark} aria-hidden="true" />
          <div>
            <div style={styles.brandText}>AYOKAN</div>
            <div style={styles.subText}>{message}</div>
          </div>
        </div>

        <div style={styles.progressTrack}>
          <div style={styles.progressBar} />
        </div>

        <div style={styles.hint}>
          Ne ferme pas la page, on termine en quelques secondes.
        </div>
      </div>

      <style>{`
        @keyframes ayokanProgress {
          0% { transform: translateX(-45%); opacity: .7; }
          50% { transform: translateX(0%); opacity: 1; }
          100% { transform: translateX(45%); opacity: .7; }
        }
      `}</style>
    </div>
  );
}

/* ===================== STYLES ===================== */

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100vw",
    height: "100vh",
    background: theme.gradients.authBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: 24,
  },

  glow: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${theme.colors.roseGoldSoft}, transparent 70%)`,
    filter: "blur(70px)",
    opacity: 0.85,
  },

  card: {
    width: "min(420px, 100%)",
    borderRadius: 22,
    padding: 22,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
    zIndex: 2,
  },

  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  brandMark: {
    width: 42,
    height: 42,
    borderRadius: 14,
    background:
      "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
    boxShadow: "0 0 0 1px rgba(255,255,255,0.10)",
    flex: "0 0 auto",
  },

  brandText: {
    fontSize: 13,
    fontWeight: 900,
    letterSpacing: 4,
    color: "rgba(255,255,255,0.92)",
  },

  subText: {
    marginTop: 4,
    fontSize: 13,
    color: "rgba(255,255,255,0.68)",
  },

  progressTrack: {
    marginTop: 16,
    height: 10,
    borderRadius: 999,
    overflow: "hidden",
    background: "rgba(255,255,255,0.10)",
  },

  progressBar: {
    height: "100%",
    width: "62%",
    borderRadius: 999,
    background:
      "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
    animation: "ayokanProgress 1.15s ease-in-out infinite",
  },

  hint: {
    marginTop: 12,
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
  },
};
