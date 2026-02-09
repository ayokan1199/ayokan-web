// src/auth/context/AuthContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useAuthController, User, UpdateProfileData } from "./useAuthController";

// Enum pour les étapes d'onboarding
export enum OnboardingStep {
  Welcome = "welcome",
  AgeVerification = "age-verification",
  ProfileSetup = "profile-setup",
  Completed = "completed",
}

// Type du contexte Auth
export type AuthContextType = {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithOAuth: (provider: "google" | "facebook") => Promise<void>;
  loginWithPhone: (phone: string) => Promise<void>;
  verifyPhoneOTP: (phone: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchSession: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>; // ✅ Ajouté ici
};

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Auth
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const controller = useAuthController();

  // On s'assure que updateProfile est exposé
  const contextValue: AuthContextType = {
    ...controller,
    updateProfile: controller.updateProfile,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Hook pour utiliser le contexte
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l’intérieur d’un AuthProvider");
  }
  return context;
};
