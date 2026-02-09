import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

import particlesAnimation from "../../assets/lottie/golden-particles.json";
import logoAnimation from "../../assets/lottie/heart-pulse.json";
import { signInWithProvider } from "../../services/authservice";

const LandingAuthScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* Fond premium sombre + glows rose doré */}
      <div style={styles.backdrop} />
      <div style={styles.glowLeft} />
      <div style={styles.glowRight} />

      {/* Particules */}
      <Lottie
        animationData={particlesAnimation}
        loop
        autoplay
        style={styles.particlesBg}
      />

      {/* Header simple */}
      <div style={styles.topBar}>
        <div style={styles.brand}>
          <div style={styles.brandMark} aria-hidden="true" />
          <span style={styles.brandText}>AYOKAN</span>
        </div>

        <button
          type="button"
          style={styles.topLoginBtn}
          onClick={() => navigate("/auth/login")}
        >
          Se connecter
        </button>
      </div>

      {/* Card */}
      <div style={styles.card} role="main" aria-label="Landing Auth">
        <Lottie
          animationData={logoAnimation}
          loop
          autoplay
          style={styles.logoAnimation}
        />

        <h1 style={styles.title}>Bienvenue sur AYOKAN</h1>
        <p style={styles.subtitle}>
          Inscris-toi ou connecte-toi pour démarrer une Expérience inoubliable et premium,
        </p>

        <button
          type="button"
          style={styles.primaryBtn}
          onClick={() => navigate("/auth/signup")}
        >
          Créer un compte
        </button>

        <button
          type="button"
          style={styles.secondaryBtn}
          onClick={() => navigate("/auth/login")}
        >
          Se connecter
        </button>

        <div style={styles.dividerContainer} aria-hidden="true">
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>ou continuer avec</span>
          <div style={styles.dividerLine} />
        </div>

        <button
          type="button"
          style={styles.socialBtnLight}
          onClick={() => signInWithProvider("facebook" as any)}
        >
          <FacebookIcon /> Continuer avec Facebook
        </button>

        <button
          type="button"
          style={styles.socialBtnLight}
          onClick={() => signInWithProvider("google" as any)}
        >
          <GoogleIcon /> Continuer avec Google
        </button>

        <button
          type="button"
          style={styles.socialBtnDark}
          onClick={() => signInWithProvider("apple" as any)}
        >
          <AppleIcon /> Continuer avec Apple
        </button>

        <button
          type="button"
          style={styles.phoneBtn}
          onClick={() => navigate("/auth/phone-auth")}
        >
          Utiliser un numéro
        </button>

        <div style={styles.footNote}>
          <span style={styles.footNoteText}>
            En continuant, tu acceptes nos{" "}
            <a style={styles.link} href="/legal/terms">
              Conditions
            </a>{" "}
            et notre{" "}
            <a style={styles.link} href="/legal/privacy">
              Politique de confidentialité
            </a>
            .
          </span>
        </div>
      </div>
    </div>
  );
};

/* ===================== STYLES ===================== */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    background: "#07060A",
    padding: "24px",
  },

  backdrop: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.88) 60%, rgba(0,0,0,0.96) 100%)",
    zIndex: 0,
  },

  glowLeft: {
    position: "absolute",
    width: 820,
    height: 620,
    left: -260,
    top: -200,
    background:
      "radial-gradient(closest-side, rgba(232,162,182,0.22), transparent 70%)",
    filter: "blur(22px)",
    zIndex: 0,
    pointerEvents: "none",
  },

  glowRight: {
    position: "absolute",
    width: 780,
    height: 600,
    right: -260,
    top: -240,
    background:
      "radial-gradient(closest-side, rgba(215,178,124,0.20), transparent 72%)",
    filter: "blur(22px)",
    zIndex: 0,
    pointerEvents: "none",
  },

  particlesBg: {
    position: "absolute",
    inset: 0,
    opacity: 0.35,
    pointerEvents: "none",
    zIndex: 1,
  },

  topBar: {
    position: "absolute",
    top: 18,
    left: 18,
    right: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 2,
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  brandMark: {
    width: 28,
    height: 28,
    borderRadius: 10,
    background:
      "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
    boxShadow: "0 0 0 1px rgba(255,255,255,0.10), 0 18px 44px rgba(0,0,0,0.45)",
  },

  brandText: {
    letterSpacing: 4,
    fontWeight: 900,
    fontSize: 13,
    color: "rgba(255,255,255,0.92)",
  },

  topLoginBtn: {
    height: 40,
    padding: "0 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.92)",
    fontWeight: 800,
    cursor: "pointer",
  },

  card: {
    zIndex: 2,
    width: "min(420px, 100%)",
    padding: "26px",
    borderRadius: "22px",
    background:
      "radial-gradient(260px 180px at 18% 12%, rgba(232,162,182,0.16), transparent 62%)," +
      "radial-gradient(260px 180px at 82% 10%, rgba(215,178,124,0.12), transparent 62%)," +
      "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  logoAnimation: { width: 118, height: 118 },

  title: {
    fontSize: 26,
    fontWeight: 900,
    letterSpacing: -0.2,
    color: "rgba(255,255,255,0.92)",
    margin: "10px 0 6px 0",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14.5,
    color: "rgba(255,255,255,0.72)",
    textAlign: "center",
    marginBottom: 18,
    lineHeight: 1.5,
  },

  primaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    background:
      "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
    color: "#140F16",
    fontWeight: 900,
    border: "none",
    marginBottom: 10,
    cursor: "pointer",
  },

  secondaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.92)",
    fontWeight: 900,
    border: "1px solid rgba(255,255,255,0.14)",
    marginBottom: 18,
    cursor: "pointer",
  },

  dividerContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: 10,
    marginBottom: 14,
  },

  dividerLine: { flex: 1, height: 1, background: "rgba(255,255,255,0.14)" },

  dividerText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.66)",
    letterSpacing: 0.2,
  },

  socialBtnLight: {
    width: "100%",
    padding: 12,
    borderRadius: 14,
    background: "rgba(255,255,255,0.92)",
    color: "#0F0C12",
    fontWeight: 900,
    border: "none",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    justifyContent: "center",
  },

  socialBtnDark: {
    width: "100%",
    padding: 12,
    borderRadius: 14,
    background: "rgba(0,0,0,0.85)",
    color: "rgba(255,255,255,0.92)",
    fontWeight: 900,
    border: "1px solid rgba(255,255,255,0.14)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    justifyContent: "center",
  },

  phoneBtn: {
    marginTop: 10,
    width: "100%",
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(232,162,182,0.35)",
    background: "rgba(232,162,182,0.10)",
    color: "rgba(255,255,255,0.90)",
    fontSize: 14,
    fontWeight: 900,
    cursor: "pointer",
  },

  footNote: {
    marginTop: 14,
    width: "100%",
    textAlign: "center",
  },

  footNoteText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
    lineHeight: 1.45,
  },

  link: {
    color: "rgba(232,162,182,0.95)",
    textDecoration: "underline",
    textUnderlineOffset: 3,
  },
};

/* ===================== ICONS ===================== */

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.72 1.22 9.22 3.6l6.9-6.9C35.82 2.34 30.28 0 24 0 14.6 0 6.4 5.38 2.44 13.22l8.02 6.22C12.34 13.02 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.5 24c0-1.64-.15-3.22-.43-4.74H24v9.02h12.7c-.55 2.96-2.2 5.48-4.7 7.18l7.3 5.66C43.94 36.36 46.5 30.68 46.5 24z"
    />
    <path
      fill="#FBBC05"
      d="M10.46 28.44c-.5-1.48-.78-3.06-.78-4.44s.28-2.96.78-4.44l-8.02-6.22C.86 16.44 0 20.1 0 24s.86 7.56 2.44 10.66l8.02-6.22z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.28 0 11.82-2.06 15.76-5.6l-7.3-5.66c-2.04 1.38-4.64 2.2-8.46 2.2-6.26 0-11.66-3.52-13.54-8.94l-8.02 6.22C6.4 42.62 14.6 48 24 48z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.49v-9.294H9.691V11.01h3.125V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0z" />
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M16.365 1.43c0 1.14-.45 2.22-1.23 3.06-.84.9-2.19 1.6-3.45 1.5-.15-1.08.36-2.22 1.17-3.06.84-.9 2.31-1.62 3.51-1.5z" />
    <path d="M20.19 17.3c-.48 1.08-.72 1.56-1.35 2.5-.9 1.35-2.16 3.03-3.72 3.03-1.38 0-1.74-.9-3.63-.9-1.89 0-2.31.93-3.6.93-1.56 0-2.76-1.5-3.66-2.85-2.04-3.12-2.25-6.78-1-8.7.9-1.38 2.31-2.22 3.9-2.22 1.5 0 2.46.96 3.69.96 1.2 0 1.92-.99 3.66-.99 1.41 0 2.91.78 3.81 2.1-3.36 1.83-2.82 6.63.9 8.14z" />
  </svg>
);

export default LandingAuthScreen;
