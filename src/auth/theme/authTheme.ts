// src/app/theme/authTheme.ts

export const theme = {
  colors: {
    roseGold: "#E8A2B6",
    roseGoldSoft: "#F2A1C6",
    gold: "#D7B27C",
    goldSoft: "#E6B566",

    white: "#FFFFFF",
    black: "#07060A",

    error: "#FF3B3B",
    success: "#1DBF73",

    textPrimary: "rgba(255,255,255,0.92)",
    textSecondary: "rgba(255,255,255,0.72)",
    textMuted: "rgba(255,255,255,0.55)",
  },

  gradients: {
    authBackground:
      "linear-gradient(135deg, #f7c1cc 0%, #f5d36c 50%, #f3b5c7 100%)",

    darkBackdrop:
      "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.88) 60%, rgba(0,0,0,0.96) 100%)",

    primaryButton:
      "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",

    glowRose:
      "radial-gradient(circle, rgba(232,162,182,0.35), transparent 70%)",

    glowGold:
      "radial-gradient(circle, rgba(215,178,124,0.30), transparent 70%)",
  },

  glass: {
    cardBackground: "rgba(255,255,255,0.18)",
    cardBorder: "1px solid rgba(255,255,255,0.12)",
    blur: "blur(22px)",

    premiumCard:
      "radial-gradient(260px 180px at 18% 12%, rgba(232,162,182,0.16), transparent 62%)," +
      "radial-gradient(260px 180px at 82% 10%, rgba(215,178,124,0.12), transparent 62%)," +
      "rgba(255,255,255,0.06)",
  },

  shadows: {
    softPink: "0 0 45px rgba(255,182,193,0.6)",
    goldGlow: "0 0 18px rgba(255,215,0,0.55)",
    deep: "0 18px 60px rgba(0,0,0,0.55)",
  },

  radii: {
    sm: "10px",
    md: "14px",
    lg: "18px",
    xl: "22px",
    pill: "999px",
  },

  buttons: {
    primary: {
      background:
        "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
      color: "#140F16",
      fontWeight: 900,
    },

    secondary: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.14)",
      color: "rgba(255,255,255,0.92)",
    },

    danger: {
      background: "#FF3B3B",
      color: "#FFFFFF",
    },
  },

  inputs: {
    background: "rgba(255,255,255,0.35)",
    color: "#FFFFFF",
    placeholder: "rgba(255,255,255,0.6)",
  },

  animations: {
    authPulse: {
      name: "authPulse",
      keyframes: `
        @keyframes authPulse {
          0% { transform: scale(1); opacity: .6; }
          50% { transform: scale(1.08); opacity: .9; }
          100% { transform: scale(1); opacity: .6; }
        }
      `,
    },

    logoDecompose: {
      name: "logoDecompose",
      keyframes: `
        @keyframes logoDecompose {
          0% { transform: scale(.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `,
    },
  },
};

export type AuthTheme = typeof theme;
