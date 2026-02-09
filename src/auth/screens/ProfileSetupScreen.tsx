import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

import { uploadAvatar } from "../../lib/supabase.client";
import { useAuthController } from "../context/useAuthController";

import particlesAnimation from "../../assets/lottie/golden-particles.json";
import confettiAnimation from "../../assets/lottie/confetti.json";
import heartPulseAnimation from "../../assets/lottie/heart-pulse.json";

const ProfileSetupScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuthController();

  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [gender, setGender] = useState<"" | "male" | "female" | "other">("");
  const [interestedIn, setInterestedIn] = useState<"" | "male" | "female" | "all">("");
  const [relationship, setRelationship] = useState<"" | "single" | "couple" | "married">("");

  const [birthday, setBirthday] = useState("");
  const [school, setSchool] = useState("");
  const [job, setJob] = useState("");
  const [city, setCity] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confettiRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const canContinue = useMemo(() => {
    return !!photo && !!username && !!firstName && !!lastName && !!gender && !!birthday && !!interestedIn;
  }, [photo, username, firstName, lastName, gender, birthday, interestedIn]);

  const handlePhotoChange = (file: File) => {
    if (!file) return;

    if (preview) URL.revokeObjectURL(preview);

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleContinue = async () => {
    setError(null);

    if (!user) {
      setError("Session introuvable. Reconnecte-toi.");
      return;
    }
    if (!canContinue) {
      setError("Merci de compléter tous les champs obligatoires (*)");
      return;
    }

    setLoading(true);
    try {
      // 1) upload avatar dans Storage
      const { publicUrl } = await uploadAvatar(user.id, photo!);

      // 2) upsert dans table profiles + metadata
      await updateProfile({
        avatar: publicUrl,
        username,
        bio,
        firstName,
        lastName,
        gender: gender as any,
        interestedIn: interestedIn as any,
        relationship: relationship ? (relationship as any) : undefined,
        birthday,
        school,
        job,
        city,
        onboardingStep: "completed",
      });

      confettiRef.current?.play();
      setTimeout(() => navigate("/", { replace: true }), 900);
    } catch (e: any) {
      setError(e?.message || "Erreur lors de l’enregistrement du profil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.backdrop} />
      <div style={styles.glowLeft} />
      <div style={styles.glowRight} />

      <Lottie animationData={particlesAnimation} loop autoplay style={styles.particlesBg} />

      <Lottie
        animationData={confettiAnimation}
        loop={false}
        autoplay={false}
        lottieRef={confettiRef}
        style={styles.confetti}
      />

      <div style={styles.card}>
        <Lottie animationData={heartPulseAnimation} loop autoplay style={styles.logo} />

        <h1 style={styles.title}>Complète ton profil</h1>
        <p style={styles.subtitle}>Une dernière touche premium pour que ton profil soit irrésistible.</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <label style={styles.photoUpload}>
          {preview ? (
            <img src={preview} alt="avatar preview" style={styles.photoPreview} />
          ) : (
            <span style={styles.photoHint}>Ajouter une photo *</span>
          )}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => e.target.files && e.target.files[0] && handlePhotoChange(e.target.files[0])}
          />
        </label>

        <div style={styles.grid2}>
          <input placeholder="Prénom *" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={styles.input} />
          <input placeholder="Nom *" value={lastName} onChange={(e) => setLastName(e.target.value)} style={styles.input} />
        </div>

        <input placeholder="Pseudo *" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />

        <textarea placeholder="Bio (optionnel)" value={bio} onChange={(e) => setBio(e.target.value)} style={styles.textarea} />

        <div style={styles.grid2}>
          <select value={gender} onChange={(e) => setGender(e.target.value as any)} style={styles.select}>
            <option value="">Genre *</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
            <option value="other">Autre / Non binaire</option>
          </select>

          <select value={interestedIn} onChange={(e) => setInterestedIn(e.target.value as any)} style={styles.select}>
            <option value="">Intéressé par *</option>
            <option value="male">Hommes</option>
            <option value="female">Femmes</option>
            <option value="all">Tout le monde</option>
          </select>
        </div>

        <select value={relationship} onChange={(e) => setRelationship(e.target.value as any)} style={styles.select}>
          <option value="">Situation amoureuse (optionnel)</option>
          <option value="single">Célibataire</option>
          <option value="couple">En couple</option>
          <option value="married">Marié(e)</option>
        </select>

        <div style={styles.grid2}>
          <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} style={styles.input} />
          <input placeholder="Ville / Localité (optionnel)" value={city} onChange={(e) => setCity(e.target.value)} style={styles.input} />
        </div>

        <div style={styles.grid2}>
          <input placeholder="École (optionnel)" value={school} onChange={(e) => setSchool(e.target.value)} style={styles.input} />
          <input placeholder="Travail (optionnel)" value={job} onChange={(e) => setJob(e.target.value)} style={styles.input} />
        </div>

        <button
          type="button"
          style={{
            ...styles.primaryBtn,
            opacity: loading || !canContinue ? 0.65 : 1,
            cursor: loading || !canContinue ? "not-allowed" : "pointer",
          }}
          disabled={loading || !canContinue}
          onClick={handleContinue}
        >
          {loading ? "Enregistrement..." : "Continuer"}
        </button>

        <div style={styles.footNote}>
          <span style={styles.footNoteText}>
            Tes données restent sous ton contrôle. Tu peux modifier ton profil à tout moment.
          </span>
        </div>
      </div>
    </div>
  );
};

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
    padding: 24,
  },

  backdrop: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.90) 60%, rgba(0,0,0,0.98) 100%)",
    zIndex: 0,
  },

  glowLeft: {
    position: "absolute",
    width: 820,
    height: 620,
    left: -260,
    top: -220,
    background: "radial-gradient(closest-side, rgba(232,162,182,0.22), transparent 70%)",
    filter: "blur(22px)",
    zIndex: 0,
    pointerEvents: "none",
  },

  glowRight: {
    position: "absolute",
    width: 780,
    height: 600,
    right: -260,
    top: -260,
    background: "radial-gradient(closest-side, rgba(215,178,124,0.20), transparent 72%)",
    filter: "blur(22px)",
    zIndex: 0,
    pointerEvents: "none",
  },

  particlesBg: {
    position: "absolute",
    inset: 0,
    opacity: 0.28,
    pointerEvents: "none",
    zIndex: 1,
  },

  confetti: {
    position: "absolute",
    inset: 0,
    opacity: 0.65,
    pointerEvents: "none",
    zIndex: 3,
  },

  card: {
    zIndex: 2,
    width: "min(520px, 100%)",
    padding: 26,
    borderRadius: 22,
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

  logo: { width: 96, height: 96 },

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
    color: "rgba(255,255,255,0.70)",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 1.5,
  },

  errorBox: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 14,
    background: "rgba(255,77,79,0.10)",
    border: "1px solid rgba(255,77,79,0.25)",
    color: "rgba(255,255,255,0.92)",
    fontWeight: 800,
    marginBottom: 12,
    textAlign: "center",
  },

  photoUpload: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(232,162,182,0.25)",
    boxShadow: "0 18px 44px rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255,255,255,0.85)",
    margin: "4px auto 14px",
    cursor: "pointer",
    overflow: "hidden",
  },

  photoPreview: { width: "100%", height: "100%", objectFit: "cover" },

  photoHint: { fontWeight: 900, fontSize: 12, letterSpacing: 0.3 },

  grid2: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },

  input: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.10)",
    color: "rgba(255,255,255,0.92)",
    outline: "none",
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 700,
  },

  textarea: {
    width: "100%",
    minHeight: 72,
    padding: "12px 12px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.10)",
    color: "rgba(255,255,255,0.92)",
    outline: "none",
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 700,
    resize: "none",
  },

  select: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.10)",
    color: "rgba(255,255,255,0.92)",
    outline: "none",
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 800,
  },

  primaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    background: "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
    color: "#140F16",
    fontWeight: 900,
    border: "none",
    marginTop: 6,
  },

  footNote: { marginTop: 12, width: "100%", textAlign: "center" },

  footNoteText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
    lineHeight: 1.45,
  },
};

export default ProfileSetupScreen;
