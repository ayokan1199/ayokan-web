import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useAuth } from "../context/AuthContext";

import confettiAnimation from "../../assets/lottie/confetti.json";
import heartAnimation from "../../assets/lottie/heart-pulse.json";

const OnboardingCompleteScreen: React.FC = () => {
  const navigate = useNavigate();
  const { updateProfile, isLoading } = useAuth();
  const confettiRef = useRef<LottieRefCurrentProps>(null);

  const [error, setError] = useState<string | null>(null);

  const handleFinish = async () => {
    if (isLoading) return;

    setError(null);

    try {
      await updateProfile({
        onboardingStep: "completed",
      });

      confettiRef.current?.play();

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 700);
    } catch (e: any) {
      setError(e?.message ?? "Impossible de finaliser l’onboarding.");
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
        autoplay={false}
        loop={false}
        style={styles.confetti}
      />

      <div style={styles.card}>
        <h1 style={styles.title}>Bienvenue ✨</h1>

        <p style={styles.subtitle}>
          Ton profil est prêt.
          <br />
          Tu peux maintenant commencer l’aventure AYOKAN.
        </p>

        {error && <div style={styles.error}>{error}</div>}

        <Lottie animationData={heartAnimation} autoplay loop style={styles.heartAnimation} />

        <button
          style={{ ...styles.primaryBtn, opacity: isLoading ? 0.6 : 1 }}
          onClick={handleFinish}
          disabled={isLoading}
        >
          {isLoading ? "Finalisation…" : "Entrer dans l’app"}
        </button>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    width: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    opacity: 0.9,
    pointerEvents: "none",
    zIndex: 5,
  },

  card: {
    zIndex: 2,
    width: "min(420px, 100%)",
    padding: 26,
    borderRadius: 22,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: 900,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    opacity: 0.75,
    marginBottom: 16,
    lineHeight: 1.45,
  },

  heartAnimation: {
    width: 110,
    height: 110,
    marginBottom: 18,
  },

  primaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    background: "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
    border: "none",
    color: "#140F16",
    fontWeight: 900,
    fontSize: 15,
    cursor: "pointer",
  },

  error: {
    color: "rgba(232,162,182,0.95)",
    marginBottom: 10,
    fontSize: 13,
  },
};

export default OnboardingCompleteScreen;
