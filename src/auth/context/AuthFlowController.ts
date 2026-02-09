// src/auth/context/AuthFlowController.ts
export type OnboardingStep =
  | "landing"
  | "age-verification"
  | "profile-setup"
  | "interests"
  | "permissions"
  | "completed";

export function normalizeOnboardingStep(step?: string | null): OnboardingStep {
  const s = (step || "landing").trim();

  if (
    s === "landing" ||
    s === "age-verification" ||
    s === "profile-setup" ||
    s === "interests" ||
    s === "permissions" ||
    s === "completed"
  ) {
    return s;
  }

  // fallback safe
  return "landing";
}

export function stepToPath(step: OnboardingStep): string {
  switch (step) {
    case "landing":
      return "/auth";
    case "age-verification":
      return "/onboarding/age-verification";
    case "profile-setup":
      return "/onboarding/profile-setup";
    case "interests":
      return "/onboarding/interests";
    case "permissions":
      return "/onboarding/permissions";
    case "completed":
      return "/";
    default:
      return "/auth";
  }
}

/**
 * Utilisé pour forcer l'utilisateur à compléter l'onboarding.
 * - Si "completed" -> app "/"
 * - Sinon -> route onboarding correspondante
 */
export function getOnboardingRedirect(step?: string | null): string {
  return stepToPath(normalizeOnboardingStep(step));
}
