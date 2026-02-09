// src/auth/ui/AuthButton.tsx

import React from "react";
import { theme } from "./../theme/authTheme";

type Variant = "primary" | "secondary" | "danger";

interface AuthButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  fullWidth?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  fullWidth = true,
}) => {
  const variantStyle = getVariantStyle(variant);

  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      style={{
        ...styles.base,
        ...(fullWidth ? styles.fullWidth : {}),
        ...variantStyle,
        opacity: disabled || loading ? 0.6 : 1,
        cursor: disabled || loading ? "not-allowed" : "pointer",
      }}
    >
      {loading ? "..." : children}
    </button>
  );
};

/* ===================== STYLES ===================== */

const styles: Record<string, React.CSSProperties> = {
  base: {
    padding: "14px",
    borderRadius: theme.radii.lg,
    fontWeight: 900,
    fontSize: 15,
    border: "none",
    outline: "none",
    transition: "all .25s ease",
    boxShadow: theme.shadows.goldGlow,
    letterSpacing: 0.2,
  },

  fullWidth: {
    width: "100%",
  },
};

function getVariantStyle(variant: Variant): React.CSSProperties {
  switch (variant) {
    case "secondary":
      return {
        background: theme.buttons.secondary.background,
        border: theme.buttons.secondary.border,
        color: theme.buttons.secondary.color,
        boxShadow: "none",
      };

    case "danger":
      return {
        background: theme.buttons.danger.background,
        color: theme.buttons.danger.color,
        boxShadow: "0 0 18px rgba(255,59,59,0.55)",
      };

    case "primary":
    default:
      return {
        background: theme.buttons.primary.background,
        color: theme.buttons.primary.color,
      };
  }
}

export default AuthButton;
