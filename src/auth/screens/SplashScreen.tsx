import { useEffect, useState } from "react";
import { theme } from "../../theme/authTheme";

const CYCLES = 3;
const DURATION = 600;

/**
 * SplashScreen
 *
 * Rôle unique:
 * - animation logo
 * - ambiance rose doré
 *
 * IMPORTANT:
 * ❌ aucune navigation ici
 * ❌ aucune logique auth
 * Les guards / AuthProvider s'en occupent.
 */

export default function SplashScreen() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < CYCLES) {
      const timer = setTimeout(() => {
        setStep((s) => s + 1);
      }, DURATION);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div style={styles.container}>
      {/* Glow rose doré */}
      <div style={styles.glow} />

      {/* Logo */}
      <img
        key={step}
        src="/assets/ayokan-A.png"
        alt="AYOKAN"
        style={styles.logo}
      />

      {/* Wordmark */}
      <span style={styles.text}>AYOKAN</span>

      {/* Animations locales (évite dépendances globales) */}
      <style>{`
        @keyframes authPulse {
          0% { transform: scale(0.85); opacity: .6; }
          50% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.85); opacity: .6; }
        }

        @keyframes logoDecompose {
          0% { transform: scale(.85); opacity: .4; }
          100% { transform: scale(1); opacity: 1; }
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },

  glow: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${theme.colors.roseGoldSoft}, transparent 70%)`,
    filter: "blur(60px)",
    animation: "authPulse 2.4s ease-in-out infinite",
  },

  logo: {
    width: 130,
    zIndex: 2,
    animation: "logoDecompose 0.6s ease-in-out",
  },

  text: {
    marginTop: 14,
    fontSize: 20,
    letterSpacing: 6,
    color: theme.colors.gold,
    zIndex: 2,
    fontWeight: 600,
  },
};
