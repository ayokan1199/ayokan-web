// src/auth/ui/AuthInput.tsx

import React, { useId, useMemo } from "react";
import { theme } from "./../theme/authTheme";

type InputType =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "date"
  | "number";

type Variant = "default" | "textarea" | "select";

type Option = {
  value: string;
  label: string;
};

export interface AuthInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;

  type?: InputType;
  variant?: Variant;

  disabled?: boolean;
  required?: boolean;

  error?: string | null;
  hint?: string;

  autoComplete?: string;
  name?: string;

  maxLength?: number;

  rows?: number;

  options?: Option[];
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  variant = "default",
  disabled = false,
  required = false,
  error = null,
  hint,
  autoComplete,
  name,
  maxLength,
  rows = 4,
  options = [],
}) => {
  const uid = useId();
  const inputId = useMemo(() => `auth-input-${uid}`, [uid]);
  const hasError = !!error;

  return (
    <div style={styles.wrapper}>
      {label ? (
        <label htmlFor={inputId} style={styles.label}>
          {label}
          {required ? <span style={styles.required}> *</span> : null}
        </label>
      ) : null}

      {variant === "textarea" ? (
        <textarea
          id={inputId}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          maxLength={maxLength}
          rows={rows}
          style={{
            ...styles.baseInput,
            ...styles.textarea,
            ...(hasError ? styles.inputError : {}),
            ...(disabled ? styles.disabled : {}),
          }}
        />
      ) : variant === "select" ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          style={{
            ...styles.baseInput,
            ...styles.select,
            ...(hasError ? styles.inputError : {}),
            ...(disabled ? styles.disabled : {}),
          }}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete={autoComplete}
          style={{
            ...styles.baseInput,
            ...(hasError ? styles.inputError : {}),
            ...(disabled ? styles.disabled : {}),
          }}
        />
      )}

      {hasError ? (
        <div style={styles.errorText}>{error}</div>
      ) : hint ? (
        <div style={styles.hintText}>{hint}</div>
      ) : null}
    </div>
  );
};

/* ===================== STYLES ===================== */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: "100%",
    marginBottom: 12,
  },

  label: {
    display: "block",
    marginBottom: 6,
    fontSize: 12.5,
    fontWeight: 900,
    letterSpacing: 0.2,
    color: theme.colors.textSecondary,
  },

  required: {
    color: theme.colors.roseGold,
  },

  baseInput: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: theme.radii.md,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.10)",
    color: theme.colors.textPrimary,
    outline: "none",
    fontSize: 14,
    fontWeight: 700,
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    transition: "all .22s ease",
  },

  textarea: {
    minHeight: 76,
    resize: "none",
  },

  select: {
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    backgroundImage:
      "linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.65) 50%)," +
      "linear-gradient(135deg, rgba(255,255,255,0.65) 50%, transparent 50%)",
    backgroundPosition: "calc(100% - 18px) 18px, calc(100% - 12px) 18px",
    backgroundSize: "6px 6px, 6px 6px",
    backgroundRepeat: "no-repeat",
    paddingRight: 34,
  },

  inputError: {
    border: "1px solid rgba(255,77,79,0.35)",
    background: "rgba(255,77,79,0.08)",
    boxShadow: "0 0 16px rgba(255,77,79,0.10)",
  },

  disabled: {
    opacity: 0.65,
    cursor: "not-allowed",
  },

  errorText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: 800,
    color: "rgba(255,255,255,0.92)",
    background: "rgba(255,77,79,0.10)",
    border: "1px solid rgba(255,77,79,0.25)",
    borderRadius: 12,
    padding: "8px 10px",
  },

  hintText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: 700,
    color: theme.colors.textMuted,
  },
};

export default AuthInput;
