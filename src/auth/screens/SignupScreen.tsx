import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

import { useAuth } from "../context/AuthContext";

import particlesAnimation from "../../assets/lottie/golden-particles.json";
import heartPulseAnimation from "../../assets/lottie/heart-pulse.json";
import confettiAnimation from "../../assets/lottie/confetti.json";

const interestsList = [
  "Musique",
  "Voyage",
  "Sport",
  "Cinéma",
  "Cuisine",
  "Technologie",
  "Art",
  "Entrepreneuriat",
];

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function clampInterests(arr: string[]) {
  // limite douce: évite de stocker 300 tags
  return Array.from(new Set(arr)).slice(0, 10);
}

const SignupScreen: React.FC = () => {
  const navigate = useNavigate();
  const { signup, updateProfile, isLoading, error } = useAuth();

  const confettiRef = useRef<LottieRefCurrentProps>(null);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const [interests, setInterests] = useState<string[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [localError, setLocalError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      isEmail(email) &&
      username.trim().length >= 3 &&
      password.length >= 8 &&
      confirmPassword.length >= 8 &&
      birthDate.length > 0 &&
      country.trim().length > 1 &&
      city.trim().length > 1 &&
      termsAccepted &&
      !isLoading
    );
  }, [email, username, password, confirmPassword, birthDate, country, city, termsAccepted, isLoading]);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : clampInterests([...prev, interest])
    );
  };

  const handleSignup = async () => {
    setLocalError(null);

    if (!isEmail(email)) return setLocalError("Email invalide.");
    if (username.trim().length < 3) return setLocalError("Nom d’utilisateur trop court (min 3).");
    if (password.length < 8) return setLocalError("Mot de passe trop court (min 8).");
    if (password !== confirmPassword) return setLocalError("Les mots de passe ne correspondent pas.");
    if (!birthDate) return setLocalError("Date de naissance obligatoire.");
    if (!country.trim()) return setLocalError("Pays obligatoire.");
    if (!city.trim()) return setLocalError("Ville obligatoire.");
    if (!termsAccepted) return setLocalError("Tu dois accepter les conditions.");

    try {
      // 1) Crée le compte (Supabase)
      await signup(email.trim(), password);

      // 2) Enrichit le metadata du user (profil de base) + avance le flow
      await updateProfile({
        username: username.trim(),
        city: city.trim(),
        // Tu peux aussi stocker country si tu veux, mais ton type User actuel n’a pas country.
        // Si tu veux l’ajouter, on l’ajoute proprement dans User + UpdateProfileData.
        birthday: birthDate,
        onboardingStep: "age-verification",
        // Stockage d’intérêts (si tu veux garder)
        // (Ton type User n'a pas "interests", donc si tu veux, on l’ajoute après.)
      } as any);

      confettiRef.current?.play();

      // 3) Laisse le flow router
      // Ici on peut pousser direct vers l’étape suivante, mais sans "guess" on suit onboardingStep
      setTimeout(() => navigate("/auth/age-verification", { replace: true }), 700);
    } catch (e: any) {
      setLocalError(e?.message ?? "Impossible de créer le compte.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.backdrop} />
      <div style={styles.glowLeft} />
      <div style={styles.glowRight} />

      <Lottie animationData={particlesAnimation} loop autoplay style={styles.particlesBg} />
      <Lottie animationData={confettiAnimation} loop={false} autoplay={false} lottieRef={confettiRef} style={styles.confetti} />

      <div style={styles.card}>
        <Lottie animationData={heartPulseAnimation} loop autoplay style={styles.logoAnimation} />

        <h1 style={styles.title}>Créer un compte</h1>
        {(localError || error) && <p style={styles.errorText}>{localError || error}</p>}

        <div style={styles.grid}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Mot de passe (min 8)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
          />

          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Pays"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.sectionTitle}>Centres d’intérêt</div>
        <div style={styles.interestsContainer}>
          {interestsList.map((interest) => {
            const selected = interests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                style={{
                  ...styles.interestChip,
                  background: selected ? "rgba(232,162,182,0.22)" : "rgba(255,255,255,0.08)",
                  borderColor: selected ? "rgba(232,162,182,0.40)" : "rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.90)",
                }}
              >
                {interest}
              </button>
            );
          })}
        </div>

        <div style={styles.legalRow}>
          <label style={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <span>
              J’accepte les{" "}
              <a style={styles.link} href="/legal/terms">
                conditions
              </a>{" "}
              et la{" "}
              <a style={styles.link} href="/legal/privacy">
                politique de confidentialité
              </a>
              .
            </span>
          </label>
        </div>

        <button
          style={{ ...styles.primaryBtn, opacity: canSubmit ? 1 : 0.55 }}
          onClick={handleSignup}
          disabled={!canSubmit}
        >
          {isLoading ? "Création…" : "S’inscrire"}
        </button>

        <button style={styles.loginLink} onClick={() => navigate("/auth/login")}>
          Déjà un compte ? Se connecter
        </button>

        <button style={styles.idLink} onClick={() => navigate("/auth/onfido")}>
          Vérifier mon identité
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
    width: 780,
    height: 560,
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

  particlesBg: { position: "absolute", inset: 0, opacity: 0.28, pointerEvents: "none" },
  confetti: { position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5 },

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
  },

  logoAnimation: { width: 110, height: 110, margin: "0 auto" },

  title: {
    fontSize: 26,
    fontWeight: 900,
    color: "rgba(255,255,255,0.92)",
    marginBottom: 10,
  },

  errorText: {
    color: "rgba(232,162,182,0.95)",
    marginBottom: 10,
    fontSize: 13,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 10,
    marginTop: 6,
  },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.14)",
    outline: "none",
    background: "rgba(255,255,255,0.10)",
    color: "#fff",
    fontSize: 14,
  },

  sectionTitle: {
    marginTop: 14,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.62)",
  },

  interestsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
    justifyContent: "center",
  },

  interestChip: {
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.12)",
    fontSize: 13,
    cursor: "pointer",
  },

  legalRow: { marginTop: 6, marginBottom: 12 },

  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 12.5,
    color: "rgba(255,255,255,0.75)",
    textAlign: "left",
    lineHeight: 1.45,
  },

  link: {
    color: "rgba(232,162,182,0.95)",
    textDecoration: "underline",
    textUnderlineOffset: 3,
  },

  primaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    background: "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
    color: "#140F16",
    fontWeight: 900,
    fontSize: 15,
    border: "none",
    cursor: "pointer",
    marginTop: 6,
  },

  loginLink: {
    marginTop: 12,
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.70)",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: 13,
  },

  idLink: {
    marginTop: 8,
    background: "none",
    border: "none",
    color: "rgba(215,178,124,0.90)",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: 13,
    textDecoration: "underline",
    textUnderlineOffset: 3,
  },
};

export default SignupScreen;
