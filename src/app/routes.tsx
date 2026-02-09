// src/app/routes.tsx

import React, { useEffect, useRef } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";

import AppShell from "./layouts/AppShell";
import AuthShell from "./layouts/AuthShell";
import LegalShell from "./layouts/LegalShell";

import { useAuth } from "../auth/context/AuthContext";

/* ================= AUTH SCREENS ================= */

import LandingAuthScreen from "../auth/screens/LandingAuthScreen";
import LoginScreen from "../auth/screens/LoginScreen";
import SignupScreen from "../auth/screens/SignupScreen";
import SplashScreen from "../auth/screens/SplashScreen";
import AuthCallbackScreen from "../auth/screens/AuthCallbackScreen";

/* ================= ONBOARDING ================= */

import AgeVerificationScreen from "../auth/screens/AgeVerificationScreen";
import ProfileSetupScreen from "../auth/screens/ProfileSetupScreen";
import InterestsScreen from "../auth/screens/InterestsScreen";
import PermissionsScreen from "../auth/screens/PermissionsScreen";
import OnboardingCompleteScreen from "../auth/screens/OnboardingCompleteScreen";

/* ================= HOME ================= */

import HomeScreen from "../screens/home/HomeScreen";

/* ================= PLACEHOLDERS APP ================= */

const Profile = () => <div className="min-h-screen bg-[#07060A] text-white p-6">Profile</div>;
const Settings = () => <div className="min-h-screen bg-[#07060A] text-white p-6">Settings</div>;

/* =========================================================
   BOOTSTRAP AUTH (évite double fetchSession)
========================================================= */

function AuthBootstrapper({ children }: { children: React.ReactNode }) {
  const { fetchSession } = useAuth();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    void fetchSession();
  }, [fetchSession]);

  return <>{children}</>;
}

/* =========================================================
   GUARDS
========================================================= */

function AuthGuardLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <SplashScreen />;
  if (!user) return <Navigate to="/auth" replace />;

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

function GuestGuardLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <SplashScreen />;
  if (user) return <Navigate to="/" replace />;

  return (
    <AuthShell hideHeader>
      <Outlet />
    </AuthShell>
  );
}

function OnboardingGuardLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <SplashScreen />;
  if (!user) return <Navigate to="/auth" replace />;

  return (
    <AuthShell hideHeader>
      <Outlet />
    </AuthShell>
  );
}

function LegalLayout() {
  return (
    <LegalShell>
      <Outlet />
    </LegalShell>
  );
}

/* =========================================================
   ROUTER
========================================================= */

export const router = createBrowserRouter([
  /* ================= APP (connecté) ================= */

  {
    path: "/",
    element: (
      <AuthBootstrapper>
        <AuthGuardLayout />
      </AuthBootstrapper>
    ),
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
    ],
  },

  /* ================= AUTH (invité) ================= */

  {
    path: "/auth",
    element: (
      <AuthBootstrapper>
        <GuestGuardLayout />
      </AuthBootstrapper>
    ),
    children: [
      { index: true, element: <LandingAuthScreen /> },
      { path: "login", element: <LoginScreen /> },
      { path: "signup", element: <SignupScreen /> },
      { path: "callback", element: <AuthCallbackScreen /> },
    ],
  },

  /* ================= ONBOARDING (connecté) ================= */

  {
    path: "/onboarding",
    element: (
      <AuthBootstrapper>
        <OnboardingGuardLayout />
      </AuthBootstrapper>
    ),
    children: [
      { index: true, element: <Navigate to="/onboarding/age-verification" replace /> },
      { path: "age-verification", element: <AgeVerificationScreen /> },
      { path: "profile-setup", element: <ProfileSetupScreen /> },
      { path: "interests", element: <InterestsScreen /> },
      { path: "permissions", element: <PermissionsScreen /> },
      { path: "complete", element: <OnboardingCompleteScreen /> },
    ],
  },

  /* ================= LEGAL ================= */

  {
    path: "/legal",
    element: <LegalLayout />,
    children: [
      { index: true, element: <div className="p-6 text-white">Mentions légales</div> },
      { path: "privacy", element: <div className="p-6 text-white">Politique de confidentialité</div> },
      { path: "terms", element: <div className="p-6 text-white">Conditions d’utilisation</div> },
    ],
  },

  /* ================= FALLBACK ================= */

  { path: "*", element: <Navigate to="/" replace /> },
]);
