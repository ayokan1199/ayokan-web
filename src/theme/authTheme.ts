// src/auth/theme/authTheme.ts

export const AuthTheme = {
  colors: {
    primary: "#FF69B4",       // Rose principal
    secondary: "#FFD700",     // Doré accent
    background: "#FFB6C1",    // Rose doux fond
    textPrimary: "#FFFFFF",    // Texte blanc
    textSecondary: "#F0EAD6",  // Gris clair / doré clair
    inputBackground: "rgba(255,255,255,0.2)", // Glassmorphism inputs
    shadowGlow: "#FF69B4",     // Glow rose
    overlay: "rgba(255,255,255,0.1)" // Cartes overlay
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },

  radius: {
    small: 8,
    medium: 14,
    large: 20,
    xlarge: 30
  },

  shadows: {
    lightGlow: {
      shadowColor: "#FF69B4",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 5
    },
    heavyGlow: {
      shadowColor: "#FFD700",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 25,
      elevation: 10
    }
  },

  gradients: {
    backgroundGradient: ["#FFB6C1", "#FFD700"], // Rose → Doré
    buttonGradient: ["#FF69B4", "#FFD700"],     // Boutons principaux
    overlayGradient: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.2)"]
  },

  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32
  },

  animations: {
    bounce: {
      type: "spring",
      stiffness: 120,
      damping: 12
    },
    fade: {
      duration: 300
    },
    ripple: {
      duration: 500,
      color: "#FFD700"
    },
    confetti: {
      particleCount: 50,
      colors: ["#FF69B4", "#FFD700", "#FFB6C1"]
    }
  },

  zIndex: {
    overlay: 10,
    modal: 20,
    toast: 30
  }
};
export const theme = {
  colors: {
    background: "#050505",
    roseGold: "#f6b7c1",
    roseGoldSoft: "rgba(246, 183, 193, 0.25)",
    gold: "#f5d6a1",
    white: "#ffffff",
  },
  gradients: {
    authBackground: `
      radial-gradient(circle at 30% 30%, rgba(246,183,193,0.18), transparent 40%),
      radial-gradient(circle at 70% 70%, rgba(245,214,161,0.14), transparent 45%),
      #050505
    `,
  },
};
