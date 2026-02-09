import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useAuth } from "../context/AuthContext";

import confettiAnimation from "../../assets/lottie/confetti.json";

const PermissionsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { updateProfile, isLoading } = useAuth();

  const confettiRef = useRef<LottieRefCurrentProps>(null);

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canContinue = useMemo(() => !isLoading, [isLoading]);

  const handleContinue = async () => {
    if (!canContinue) return;

    setError(null);

    try {
      await updateProfile({
        permissions: {
          notifications: notificationsEnabled,
          location: locationEnabled,
        },
        onboardingStep: "completed",
      });

      confettiRef.current?.play();

      setTimeout(() => {
        navigate("/onboarding/complete", { replace: true });
      }, 650);
    } catch (e: any) {
      setError(e?.message ?? "Impossible d’enregistrer tes autorisations.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.backdrop} />
      <div style={styles.glowLeft} />
      <div style={styles.glowRight} />

      <Lottie
        animationData={confettiAnimation}
        loop={false}
        autoplay={false}
        lottieRef={confettiRef}
        style={styles.confetti}
      />

      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.badge} aria-hidden="true" />
          <div>
            <h1 style={styles.title}>Autorisations</h1>
            <p style={styles.subtitle}>
              Active ce qui te convient. Tu pourras modifier plus tard dans les réglages.
            </p>
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.permissionItem}>
          <div style={styles.permissionLeft}>
            <div style={styles.permissionName}>Notifications</div>
            <div style={styles.permissionHint}>Recevoir des alertes pour les matchs et messages.</div>
          </div>

          <Toggle
            checked={notificationsEnabled}
            onChange={setNotificationsEnabled}
            label="Notifications"
          />
        </div>

        <div style={styles.permissionItem}>
          <div style={styles.permissionLeft}>
            <div style={styles.permissionName}>Localisation</div>
            <div style={styles.permissionHint}>Améliorer la découverte autour de toi.</div>
          </div>

          <Toggle
            checked={locationEnabled}
            onChange={setLocationEnabled}
            label="Localisation"
          />
        </div>

        <button
          style={{ ...styles.primaryBtn, opacity: isLoading ? 0.6 : 1 }}
          disabled={isLoading}
          onClick={handleContinue}
        >
          {isLoading ? "Enregistrement…" : "Continuer"}
        </button>

        <button style={styles.skipBtn} onClick={handleContinue} disabled={isLoading}>
          Passer pour l’instant
        </button>
      </div>
    </div>
  );
};

/* ===================== TOGGLE ===================== */

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      style={{
        ...toggleStyles.root,
        ...(checked ? toggleStyles.rootOn : toggleStyles.rootOff),
      }}
    >
      <span
        style={{
          ...toggleStyles.knob,
          transform: checked ? "translateX(22px)" : "translateX(0px)",
        }}
      />
    </button>
  );
}

const toggleStyles: Record<string, React.CSSProperties> = {
  root: {
    width: 52,
    height: 28,
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.08)",
    position: "relative",
    cursor: "pointer",
    padding: 3,
    display: "inline-flex",
    alignItems: "center",
    transition: "all 200ms ease",
  },
  rootOn: {
    background: "rgba(232,162,182,0.22)",
    borderColor: "rgba(232,162,182,0.55)",
    boxShadow: "0 0 16px rgba(232,162,182,0.18)",
  },
  rootOff: {
    background: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.14)",
  },
  knob: {
    width: 22,
    height: 22,
    borderRadius: 999,
    background: "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
    boxShadow: "0 8px 18px rgba(0,0,0,0.35)",
    transition: "transform 200ms ease",
  },
};

/* ===================== STYLES ===================== */

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
    opacity: 0.9,
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
    textAlign: "left",
    color: "#fff",
  },

  header: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },

  badge: {
    width: 44,
    height: 44,
    borderRadius: 16,
    background: "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
    boxShadow: "0 0 0 1px rgba(255,255,255,0.10)",
    flex: "0 0 auto",
    marginTop: 2,
  },

  title: {
    margin: 0,
    fontSize: 24,
    fontWeight: 900,
  },

  subtitle: {
    margin: "6px 0 0 0",
    fontSize: 13,
    opacity: 0.7,
    lineHeight: 1.45,
  },

  error: {
    color: "rgba(232,162,182,0.95)",
    marginBottom: 10,
    fontSize: 13,
  },

  permissionItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    padding: "14px 14px",
    borderRadius: 18,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    marginTop: 12,
  },

  permissionLeft: { display: "flex", flexDirection: "column", gap: 6 },

  permissionName: {
    fontSize: 15,
    fontWeight: 900,
    color: "rgba(255,255,255,0.92)",
  },

  permissionHint: {
    fontSize: 12.5,
    color: "rgba(255,255,255,0.65)",
    lineHeight: 1.35,
  },

  primaryBtn: {
    width: "100%",
    marginTop: 18,
    padding: 14,
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
    color: "#140F16",
    fontSize: 15,
    fontWeight: 900,
    cursor: "pointer",
  },

  skipBtn: {
    width: "100%",
    marginTop: 10,
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.80)",
    fontSize: 13,
    fontWeight: 900,
    cursor: "pointer",
  },
};

export default PermissionsScreen;
