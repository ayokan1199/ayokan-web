import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useAuth } from "../context/AuthContext";

import confettiAnimation from "../../assets/lottie/confetti.json";

const interestsList = [
  "Musique",
  "Voyages",
  "Sport",
  "Art",
  "Cuisine",
  "Tech",
  "Lecture",
  "Films",
  "Jeux",
  "Nature",
];

function clamp(arr: string[]) {
  return Array.from(new Set(arr)).slice(0, 10);
}

const InterestsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { updateProfile, isLoading } = useAuth();

  const confettiRef = useRef<LottieRefCurrentProps>(null);

  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const canContinue = useMemo(() => selected.length > 0 && !isLoading, [selected, isLoading]);

  const toggle = (interest: string) => {
    setSelected((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : clamp([...prev, interest])
    );
  };

  const handleContinue = async () => {
    if (!canContinue) return;

    setError(null);

    try {
      await updateProfile({
        // Ton type User n’a pas "interests" officiellement,
        // mais Supabase accepte tout dans user_metadata.
        interests: selected,
        onboardingStep: "permissions",
      } as any);

      confettiRef.current?.play();
      setTimeout(() => navigate("/onboarding/permissions", { replace: true }), 600);
    } catch (e: any) {
      setError(e?.message ?? "Impossible d’enregistrer tes intérêts.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.backdrop} />
      <div style={styles.glowLeft} />
      <div style={styles.glowRight} />

      <Lottie
        lottieRef={confettiRef}
        animationData={confettiAnimation}
        loop={false}
        autoplay={false}
        style={styles.confetti}
      />

      <div style={styles.card}>
        <h1 style={styles.title}>Tes intérêts</h1>
        <p style={styles.subtitle}>
          Sélectionne ce qui te passionne pour affiner tes rencontres.
        </p>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.interestsContainer}>
          {interestsList.map((interest) => {
            const active = selected.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => toggle(interest)}
                style={{
                  ...styles.interestBtn,
                  ...(active ? styles.interestBtnActive : {}),
                }}
              >
                <span style={{ opacity: active ? 1 : 0.8 }}>{interest}</span>
              </button>
            );
          })}
        </div>

        <button
          style={{ ...styles.primaryBtn, opacity: canContinue ? 1 : 0.55 }}
          disabled={!canContinue}
          onClick={handleContinue}
        >
          {isLoading ? "Enregistrement…" : "Continuer"}
        </button>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    background: "#07060A",
    padding: 24,
  },

  backdrop: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(900px 620px at 16% 12%, rgba(232,162,182,0.22), transparent 60%)," +
      "radial-gradient(860px 620px at 84% 12%, rgba(215,178,124,0.20), transparent 60%)," +
      "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.95))",
  },

  glowLeft: {
    position: "absolute",
    width: 760,
    height: 540,
    left: -260,
    top: -220,
    background: "radial-gradient(closest-side, rgba(232,162,182,0.16), transparent 70%)",
    filter: "blur(26px)",
  },

  glowRight: {
    position: "absolute",
    width: 760,
    height: 540,
    right: -260,
    top: -220,
    background: "radial-gradient(closest-side, rgba(215,178,124,0.14), transparent 70%)",
    filter: "blur(26px)",
  },

  confetti: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 5,
  },

  card: {
    zIndex: 2,
    width: "min(520px, 100%)",
    padding: 22,
    borderRadius: 22,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
    textAlign: "center",
    color: "#fff",
  },

  title: {
    fontSize: 26,
    fontWeight: 900,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 14,
  },

  error: {
    color: "rgba(232,162,182,0.95)",
    marginBottom: 10,
    fontSize: 13,
  },

  interestsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 18,
  },

  interestBtn: {
    padding: "10px 16px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.9)",
    cursor: "pointer",
    transition: "all .2s ease",
  },

  interestBtnActive: {
    background: "rgba(232,162,182,0.20)",
    borderColor: "rgba(232,162,182,0.45)",
    boxShadow: "0 0 18px rgba(232,162,182,0.25)",
  },

  primaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
    color: "#140F16",
    fontSize: 15,
    fontWeight: 900,
    cursor: "pointer",
  },
};

export default InterestsScreen;
