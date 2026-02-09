import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useTranslation } from "react-i18next";

import { useAuth } from "../context/AuthContext";

import particlesAnimation from "../../assets/lottie/golden-particles.json";
import heartAnimation from "../../assets/lottie/heart-pulse.json";
import confettiAnimation from "../../assets/lottie/confetti.json";

const floatingTexts = ["Bienvenue 💖", "On t’attend 🐾", "Let’s go ✨", "Fais-toi plaisir 🎉", "Coucou 😺"];
const floatingEmojis = ["💖", "🐾", "✨", "🎉", "😺", "🌸", "🍭", "⭐"];

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login, error, isLoading } = useAuth();

  const confettiRef = useRef<LottieRefCurrentProps>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [floating, setFloating] = useState<{ text: string; left: string; top: string }[]>([]);

  useEffect(() => {
    let mounted = true;

    const intervalText = setInterval(() => {
      if (!mounted) return;
      const f = {
        text: floatingTexts[Math.floor(Math.random() * floatingTexts.length)],
        left: Math.random() * 80 + "%",
        top: Math.random() * 80 + "%",
      };
      setFloating((prev) => [...prev.slice(-5), f]);
    }, 2200);

    const intervalEmoji = setInterval(() => {
      if (!mounted) return;
      const f = {
        text: floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)],
        left: Math.random() * 90 + "%",
        top: Math.random() * 90 + "%",
      };
      setFloating((prev) => [...prev.slice(-8), f]);
    }, 1900);

    return () => {
      mounted = false;
      clearInterval(intervalText);
      clearInterval(intervalEmoji);
    };
  }, []);

  const handleLogin = async () => {
    if (!email || !password || isLoading) return;
    await login(email, password);
    confettiRef.current?.play();
    // Pas de navigate ici: AuthGuard + onboardingStep gèrent la suite
  };

  return (
    <div style={styles.page}>
      <div style={styles.backdrop} />

      <Lottie animationData={particlesAnimation} loop autoplay style={styles.particlesBg} />
      <Lottie animationData={heartAnimation} loop autoplay style={styles.heartAnimation} />
      <Lottie animationData={confettiAnimation} loop={false} autoplay={false} lottieRef={confettiRef} style={styles.confetti} />

      {floating.map((f, i) => (
        <div key={i} style={{ ...styles.floatingText, left: f.left, top: f.top }}>
          {f.text}
        </div>
      ))}

      <div style={styles.card}>
        <h1 style={styles.title}>{t("login")}</h1>

        {error && <div style={styles.errorText}>{error}</div>}

        <input
          type="email"
          placeholder={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder={t("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button
          style={{ ...styles.primaryBtn, opacity: isLoading ? 0.6 : 1 }}
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Connexion…" : t("login")}
        </button>

        <div style={styles.forgotRow}>
          <span style={styles.forgotPassword} onClick={() => navigate("/auth/reset-password")}>
            {t("forgotPassword")}
          </span>
        </div>

        <button style={styles.backBtn} onClick={() => navigate("/auth")}>
          Retour
        </button>
      </div>
    </div>
  );
};

/* ===================== STYLES ===================== */

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
  },

  backdrop: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(800px 600px at 15% 10%, rgba(232,162,182,0.22), transparent 60%)," +
      "radial-gradient(800px 600px at 85% 10%, rgba(215,178,124,0.20), transparent 60%)," +
      "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.95))",
  },

  particlesBg: { position: "absolute", inset: 0, opacity: 0.35, pointerEvents: "none" },
  heartAnimation: { position: "absolute", width: 96, height: 96, top: 20, right: 20, pointerEvents: "none" },
  confetti: { position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5 },

  floatingText: {
    position: "absolute",
    fontSize: 14,
    fontWeight: 600,
    color: "rgba(255,255,255,0.8)",
    pointerEvents: "none",
    transition: "all 1s ease-in-out",
  },

  card: {
    zIndex: 2,
    width: "380px",
    maxWidth: "90%",
    padding: 28,
    borderRadius: 22,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  title: { fontSize: 26, fontWeight: 900, color: "rgba(255,255,255,0.92)", marginBottom: 14 },

  input: {
    width: "100%",
    padding: 14,
    marginBottom: 10,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.14)",
    outline: "none",
    background: "rgba(255,255,255,0.10)",
    color: "#ffffff",
    fontSize: 14,
  },

  primaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 18,
    background: "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
    border: "none",
    color: "#140F16",
    fontWeight: 900,
    fontSize: 15,
    cursor: "pointer",
    marginBottom: 12,
  },

  forgotRow: { width: "100%", display: "flex", justifyContent: "flex-end", marginBottom: 12 },

  forgotPassword: {
    fontSize: 12,
    color: "rgba(232,162,182,0.95)",
    cursor: "pointer",
    textDecoration: "underline",
  },

  backBtn: {
    marginTop: 8,
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    cursor: "pointer",
  },

  errorText: {
    color: "rgba(232,162,182,0.95)",
    marginBottom: 10,
    fontSize: 13,
    textAlign: "center",
  },
};

export default LoginScreen;
