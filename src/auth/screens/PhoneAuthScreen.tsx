import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

import { useAuth } from "../context/AuthContext";

import particlesAnimation from "../../assets/lottie/golden-particles.json";
import heartAnimation from "../../assets/lottie/heart-pulse.json";

function normalizePhone(v: string) {
  // On garde simple: supprime espaces
  return v.replace(/\s+/g, "").trim();
}

function isLikelyPhone(v: string) {
  // accepte +229xxxxxxxx, +33..., etc.
  const p = normalizePhone(v);
  return /^\+\d{6,16}$/.test(p);
}

function isLikelyOtp(v: string) {
  const x = v.trim();
  return /^\d{4,8}$/.test(x);
}

const PhoneAuthScreen: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithPhone, verifyPhoneOTP, updateProfile, isLoading, error } = useAuth();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const phoneOk = useMemo(() => isLikelyPhone(phone), [phone]);
  const otpOk = useMemo(() => isLikelyOtp(otp), [otp]);

  const canSubmit = useMemo(() => {
    if (isLoading) return false;
    if (!isOtpSent) return phoneOk;
    return phoneOk && otpOk;
  }, [isLoading, isOtpSent, phoneOk, otpOk]);

  const handleSubmit = async () => {
    setLocalError(null);

    const p = normalizePhone(phone);

    try {
      if (!isOtpSent) {
        if (!phoneOk) return setLocalError("Numéro invalide. Exemple: +22912345678");
        await loginWithPhone(p);
        setIsOtpSent(true);
        return;
      }

      if (!otpOk) return setLocalError("Code OTP invalide.");
      await verifyPhoneOTP(p, otp.trim());

      // Marque un onboardingStep cohérent au premier login
      // (si déjà présent, updateProfile le préservera via ton controller)
      await updateProfile({ onboardingStep: "age-verification" });

      navigate("/onboarding/age-verification", { replace: true });
    } catch (e: any) {
      setLocalError(e?.message ?? "Erreur lors de l’authentification.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.backdrop} />
      <div style={styles.glowLeft} />
      <div style={styles.glowRight} />

      <Lottie animationData={particlesAnimation} loop autoplay style={styles.particles} />

      <div style={styles.card}>
        <Lottie animationData={heartAnimation} loop autoplay style={styles.logo} />

        <h1 style={styles.title}>Connexion par téléphone</h1>

        {(localError || error) && <div style={styles.errorText}>{localError || error}</div>}

        <input
          type="tel"
          placeholder="Téléphone (ex: +33 612345678)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
          inputMode="tel"
          autoComplete="tel"
        />

        {isOtpSent && (
          <input
            type="text"
            placeholder="Code OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={styles.input}
            inputMode="numeric"
            autoComplete="one-time-code"
          />
        )}

        <button
          style={{ ...styles.primaryBtn, opacity: canSubmit ? 1 : 0.55 }}
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          {isLoading ? "Chargement…" : isOtpSent ? "Vérifier OTP" : "Envoyer OTP"}
        </button>

        <button style={styles.linkBtn} onClick={() => navigate("/auth")}>
          Retour
        </button>

        {isOtpSent && (
          <button
            style={styles.secondaryBtn}
            onClick={() => {
              setIsOtpSent(false);
              setOtp("");
              setLocalError(null);
            }}
            disabled={isLoading}
          >
            Modifier le numéro
          </button>
        )}
      </div>
    </div>
  );
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
    pointerEvents: "none",
  },

  glowRight: {
    position: "absolute",
    width: 760,
    height: 540,
    right: -260,
    top: -220,
    background: "radial-gradient(closest-side, rgba(215,178,124,0.14), transparent 70%)",
    filter: "blur(26px)",
    pointerEvents: "none",
  },

  particles: {
    position: "absolute",
    inset: 0,
    opacity: 0.28,
    pointerEvents: "none",
  },

  card: {
    zIndex: 2,
    width: "min(420px, 100%)",
    maxWidth: "95%",
    padding: 22,
    borderRadius: 22,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
    textAlign: "center",
    color: "#fff",
  },

  logo: {
    width: 108,
    height: 108,
    margin: "0 auto 6px",
  },

  title: {
    fontSize: 22,
    fontWeight: 900,
    marginBottom: 10,
  },

  input: {
    width: "100%",
    padding: 12,
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
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
    color: "#140F16",
    fontSize: 15,
    fontWeight: 900,
    cursor: "pointer",
    marginTop: 4,
  },

  linkBtn: {
    marginTop: 10,
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    cursor: "pointer",
  },

  secondaryBtn: {
    marginTop: 8,
    background: "none",
    border: "none",
    color: "rgba(215,178,124,0.90)",
    fontSize: 13,
    fontWeight: 900,
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: 3,
  },

  errorText: {
    color: "rgba(232,162,182,0.95)",
    marginBottom: 10,
    fontSize: 13,
  },
};

export default PhoneAuthScreen;
