// src/app/providers/ThermeProvider.tsx
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/**
 * ThermeProvider (oui: "Therme" comme dans ton nom de fichier)
 * Objectifs:
 * - Dark premium par défaut (anti écran blanc)
 * - Accent rose doré global via CSS variables (tailwind-friendly)
 * - Persist dans localStorage
 * - Sync multi-onglets
 * - Respect prefers-color-scheme si aucun choix utilisateur
 */

export type ThemeMode = "dark" | "light";
export type ThemeAccent = "rosegold";

export type ThemeState = {
  mode: ThemeMode;
  accent: ThemeAccent;
};

export type ThemeContextValue = ThemeState & {
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  setAccent: (accent: ThemeAccent) => void;
  resetToSystem: () => void;
  isSystem: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "ayokan.theme.v1";

function safeLocalStorage() {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

function getSystemMode(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  try {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  } catch {
    return "dark";
  }
}

function readStoredTheme(): { state: ThemeState | null; isSystem: boolean } {
  const ls = safeLocalStorage();
  if (!ls) return { state: null, isSystem: true };
  const raw = ls.getItem(STORAGE_KEY);
  if (!raw) return { state: null, isSystem: true };

  try {
    const parsed = JSON.parse(raw) as { mode?: ThemeMode; accent?: ThemeAccent; isSystem?: boolean };
    const accent: ThemeAccent = "rosegold";
    const isSystem = typeof parsed.isSystem === "boolean" ? parsed.isSystem : false;

    const mode: ThemeMode =
      parsed.mode === "light" || parsed.mode === "dark" ? parsed.mode : getSystemMode();

    return {
      state: { mode, accent: parsed.accent === "rosegold" ? accent : accent },
      isSystem,
    };
  } catch {
    return { state: null, isSystem: true };
  }
}

function writeStoredTheme(state: ThemeState, isSystem: boolean) {
  const ls = safeLocalStorage();
  if (!ls) return;
  ls.setItem(STORAGE_KEY, JSON.stringify({ ...state, isSystem }));
}

/**
 * Applique les variables CSS globales.
 * Compatible Tailwind: tu peux référencer via style inline ou via arbitraires.
 */
function applyCssVars(state: ThemeState) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  // mode: on pose une classe pour tailwind (dark:)
  root.classList.toggle("dark", state.mode === "dark");

  // Fond: on évite le flash blanc
  const bg = state.mode === "dark" ? "#07060A" : "#FAF7FB";
  const text = state.mode === "dark" ? "rgba(255,255,255,0.92)" : "rgba(15,12,18,0.92)";
  const muted = state.mode === "dark" ? "rgba(255,255,255,0.68)" : "rgba(15,12,18,0.62)";
  const border = state.mode === "dark" ? "rgba(255,255,255,0.14)" : "rgba(15,12,18,0.12)";
  const surface = state.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(15,12,18,0.05)";

  // Accent rose doré (unique)
  const rose = "#E8A2B6";
  const gold = "#D7B27C";
  const accent = "#F1B7C7";

  root.style.setProperty("--app-bg", bg);
  root.style.setProperty("--app-text", text);
  root.style.setProperty("--app-muted", muted);
  root.style.setProperty("--app-border", border);
  root.style.setProperty("--app-surface", surface);

  root.style.setProperty("--accent-rose", rose);
  root.style.setProperty("--accent-gold", gold);
  root.style.setProperty("--accent", accent);

  // Bonus: gradients prêts à l’emploi
  root.style.setProperty("--gradient-rosegold", `linear-gradient(135deg, ${rose}, ${gold})`);
  root.style.setProperty("--glow-rosegold", `0 0 0 1px rgba(232,162,182,0.18), 0 28px 90px rgba(232,162,182,0.12)`);

  // Evite le flash blanc du body
  if (document.body) {
    document.body.style.backgroundColor = bg;
    document.body.style.color = state.mode === "dark" ? "#FFFFFF" : "#0F0C12";
  }
}

type ThermeProviderProps = {
  children: React.ReactNode;
  /**
   * Si tu veux forcer le mode au démarrage (rare).
   */
  initialMode?: ThemeMode;
};

export default function ThermeProvider({ children, initialMode }: ThermeProviderProps) {
  const stored = useMemo(() => readStoredTheme(), []);
  const [isSystem, setIsSystem] = useState<boolean>(stored.isSystem);
  const [state, setState] = useState<ThemeState>(() => {
    const base = stored.state ?? { mode: getSystemMode(), accent: "rosegold" as const };
    if (initialMode) return { ...base, mode: initialMode };
    return base;
  });

  // Applique immédiatement pour éviter flash blanc
  useEffect(() => {
    const effective: ThemeState = isSystem ? { ...state, mode: getSystemMode() } : state;
    applyCssVars(effective);
  }, [state, isSystem]);

  // Écoute le système si on est en mode system
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isSystem) return;

    const mq = window.matchMedia?.("(prefers-color-scheme: light)");
    if (!mq) return;

    const handler = () => {
      applyCssVars({ ...state, mode: getSystemMode() });
    };

    // compat old safari
    if (typeof mq.addEventListener === "function") mq.addEventListener("change", handler);
    else (mq as any).addListener?.(handler);

    return () => {
      if (typeof mq.removeEventListener === "function") mq.removeEventListener("change", handler);
      else (mq as any).removeListener?.(handler);
    };
  }, [isSystem, state]);

  // Sync multi-onglets
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onStorage = (ev: StorageEvent) => {
      if (ev.key !== STORAGE_KEY) return;
      const next = readStoredTheme();
      setIsSystem(next.isSystem);
      if (next.state) setState(next.state);
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setMode = useCallback((mode: ThemeMode) => {
    setIsSystem(false);
    setState((prev) => {
      const next = { ...prev, mode };
      writeStoredTheme(next, false);
      applyCssVars(next);
      return next;
    });
  }, []);

  const toggleMode = useCallback(() => {
    setMode(state.mode === "dark" ? "light" : "dark");
  }, [setMode, state.mode]);

  const setAccent = useCallback((accent: ThemeAccent) => {
    setState((prev) => {
      const next = { ...prev, accent };
      writeStoredTheme(next, isSystem);
      applyCssVars(isSystem ? { ...next, mode: getSystemMode() } : next);
      return next;
    });
  }, [isSystem]);

  const resetToSystem = useCallback(() => {
    setIsSystem(true);
    const next: ThemeState = { ...state, mode: getSystemMode() };
    writeStoredTheme(next, true);
    applyCssVars(next);
  }, [state]);

  const value = useMemo<ThemeContextValue>(() => {
    const effectiveMode = isSystem ? getSystemMode() : state.mode;
    return {
      mode: effectiveMode,
      accent: state.accent,
      setMode,
      toggleMode,
      setAccent,
      resetToSystem,
      isSystem,
    };
  }, [isSystem, state.accent, state.mode, resetToSystem, setAccent, setMode, toggleMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTherme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTherme doit être utilisé à l’intérieur de <ThermeProvider />");
  return ctx;
}
