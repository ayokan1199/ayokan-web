import { supabase } from "../lib/supabase.client";
import type { Provider } from "@supabase/supabase-js";

/**
 * Fournisseurs OAuth autorisés dans l'app
 * (tu peux en enlever/ajouter ici sans toucher l'UI)
 */
export type OAuthProvider = Provider;

/* ======================
   INTERNAL
====================== */

function normalizeError(err: unknown): Error {
  if (err instanceof Error) return err;
  if (typeof err === "string") return new Error(err);
  if ((err as any)?.message) return new Error((err as any).message);
  return new Error("Erreur inconnue");
}

function getRedirectUrl() {
  if (typeof window === "undefined") return undefined;
  return `${window.location.origin}/auth/callback`;
}

/* ======================
   EMAIL
====================== */

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { onboardingStep: "landing" },
      },
    });

    if (error) throw error;
    return data;
  } catch (e) {
    throw normalizeError(e);
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  } catch (e) {
    throw normalizeError(e);
  }
};

/* ======================
   OAUTH
====================== */

export const signInWithProvider = async (provider: OAuthProvider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getRedirectUrl(),
      },
    });

    if (error) throw error;

    // data.url est utilisé par Supabase pour redirect
    return data;
  } catch (e) {
    throw normalizeError(e);
  }
};

/* ======================
   LOGOUT
====================== */

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (e) {
    throw normalizeError(e);
  }
};
