import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AgeVerificationScreen: React.FC = () => {
  const navigate = useNavigate();
  const { updateProfile, isLoading } = useAuth();

  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isAdult = useMemo(() => {
    if (!birthDate) return false;
    const birth = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age >= 18;
  }, [birthDate]);

  const handleContinue = async () => {
    setError(null);

    if (!birthDate) return setError("Date de naissance obligatoire.");
    if (!isAdult) return setError("AYOKAN est réservé aux majeurs.");

    try {
      await updateProfile({
        birthday: birthDate,
        onboardingStep: "profile-setup",
      });

      navigate("/onboarding/profile-setup", { replace: true });
    } catch (e: any) {
      setError(e?.message ?? "Impossible de valider l’âge.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.backdrop} />
      <div style={styles.glowLeft} />
      <div style={styles.glowRight} />

      <div style={styles.card}>
        <h1 style={styles.title}>Vérification d’âge</h1>

        <p style={styles.subtitle}>
          AYOKAN est réservé aux personnes majeures.
          <br />
          Confirme ta date de naissance.
        </p>

        {error && <div style={styles.error}>{error}</div>}

        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          style={styles.input}
        />

        <button
          style={{ ...styles.primaryBtn, opacity: birthDate && !isLoading ? 1 : 0.6 }}
          onClick={handleContinue}
          disabled={!birthDate || isLoading}
        >
          {isLoading ? "Validation…" : "Continuer"}
        </button>

        <button
          style={styles.backBtn}
          onClick={() => navigate("/auth")}
        >
          Annuler
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

  card: {
    zIndex: 2,
    width: "360px",
    maxWidth: "100%",
    padding: 26,
    borderRadius: 22,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
    textAlign: "center",
    color: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: 900,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 13,
    opacity: 0.75,
    marginBottom: 16,
    lineHeight: 1.5,
  },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.10)",
    color: "#fff",
    marginBottom: 14,
    fontSize: 14,
    outline: "none",
  },

  primaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    background: "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
    color: "#140F16",
    fontWeight: 900,
    border: "none",
    cursor: "pointer",
    marginBottom: 10,
  },

  backBtn: {
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
    cursor: "pointer",
  },

  error: {
    color: "rgba(232,162,182,0.95)",
    marginBottom: 10,
    fontSize: 13,
  },
};

export default AgeVerificationScreen;
