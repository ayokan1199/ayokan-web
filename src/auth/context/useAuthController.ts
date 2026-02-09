import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase.client";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

/* =======================
   TYPES
======================= */

export type User = {
  id: string;
  email?: string;
  phone?: string;

  avatar?: string;
  username?: string;
  bio?: string;

  firstName?: string;
  lastName?: string;
  gender?: "male" | "female" | "other";
  interestedIn?: "male" | "female" | "all";
  relationship?: "single" | "couple" | "married";

  birthday?: string;
  school?: string;
  job?: string;
  city?: string;

  onboardingStep?: string;

  permissions?: {
    notifications?: boolean;
    location?: boolean;
  };
};

export type UpdateProfileData = {
  avatar?: string;
  username?: string;
  bio?: string;

  firstName?: string;
  lastName?: string;
  gender?: "male" | "female" | "other";
  interestedIn?: "male" | "female" | "all";
  relationship?: "single" | "couple" | "married";

  birthday?: string;
  school?: string;
  job?: string;
  city?: string;

  onboardingStep?: string;

  permissions?: {
    notifications?: boolean;
    location?: boolean;
  };

  interests?: string[];
};

type ProfileRow = {
  id: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  interested_in: string | null;
  relationship: string | null;
  birthday: string | null;
  school: string | null;
  job: string | null;
  city: string | null;
  onboarding_step: string | null;
  notifications_enabled: boolean | null;
  location_enabled: boolean | null;
};

/* =======================
   HELPERS
======================= */

function mapProfileRowToUser(base: User, row: ProfileRow | null): User {
  if (!row) return base;

  return {
    ...base,
    username: row.username ?? base.username,
    avatar: row.avatar_url ?? base.avatar,
    bio: row.bio ?? base.bio,
    firstName: row.first_name ?? base.firstName,
    lastName: row.last_name ?? base.lastName,
    gender: (row.gender as any) ?? base.gender,
    interestedIn: (row.interested_in as any) ?? base.interestedIn,
    relationship: (row.relationship as any) ?? base.relationship,
    birthday: row.birthday ?? base.birthday,
    school: row.school ?? base.school,
    job: row.job ?? base.job,
    city: row.city ?? base.city,
    onboardingStep: row.onboarding_step ?? base.onboardingStep,
    permissions: {
      notifications: row.notifications_enabled ?? base.permissions?.notifications ?? false,
      location: row.location_enabled ?? base.permissions?.location ?? false,
    },
  };
}

/* =======================
   CONTROLLER
======================= */

export const useAuthController = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        "id, username, avatar_url, bio, first_name, last_name, gender, interested_in, relationship, birthday, school, job, city, onboarding_step, notifications_enabled, location_enabled"
      )
      .eq("id", userId)
      .maybeSingle();

    if (error) throw error;
    return data as ProfileRow | null;
  }, []);

  const fetchSession = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      const sessionUser = data.session?.user;

      if (!sessionUser) {
        setUser(null);
        return;
      }

      const base: User = {
        id: sessionUser.id,
        email: sessionUser.email ?? undefined,
        phone: sessionUser.phone ?? undefined,
        ...(sessionUser.user_metadata || {}),
      };

      const profile = await loadProfile(sessionUser.id);
      const merged = mapProfileRowToUser(base, profile);

      setUser(merged);
    } catch (err: any) {
      setError(err?.message || "Erreur session");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [loadProfile]);

  useEffect(() => {
    void fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        const sessionUser = session?.user;

        if (!sessionUser) {
          setUser(null);
          return;
        }

        try {
          const base: User = {
            id: sessionUser.id,
            email: sessionUser.email ?? undefined,
            phone: sessionUser.phone ?? undefined,
            ...(sessionUser.user_metadata || {}),
          };

          const profile = await loadProfile(sessionUser.id);
          const merged = mapProfileRowToUser(base, profile);

          setUser(merged);
        } catch {
          setUser({
            id: sessionUser.id,
            email: sessionUser.email ?? undefined,
            phone: sessionUser.phone ?? undefined,
            ...(sessionUser.user_metadata || {}),
          });
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [fetchSession, loadProfile]);

  /* =======================
     AUTH
  ======================= */

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { onboardingStep: "landing" } },
      });

      if (error) throw error;

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? undefined,
          onboardingStep: "landing",
        });
      }
    } catch (err: any) {
      setError(err?.message || "Erreur signup");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      if (data.user) {
        await fetchSession();
      }
    } catch (err: any) {
      setError(err?.message || "Erreur login");
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithOAuth = async (provider: "google" | "facebook") => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
    } catch (err: any) {
      setError(err?.message || "Erreur OAuth");
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithPhone = async (phone: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({ phone });
      if (error) throw error;
    } catch (err: any) {
      setError(err?.message || "Erreur OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPhoneOTP = async (phone: string, token: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: "sms" });
      if (error) throw error;

      if (data.user) {
        await fetchSession();
      }
    } catch (err: any) {
      setError(err?.message || "Erreur vérification OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (err: any) {
      setError(err?.message || "Erreur logout");
    } finally {
      setIsLoading(false);
    }
  };

  /* =======================
     UPDATE PROFILE (auth metadata + table profiles)
  ======================= */

  const updateProfile = async (data: UpdateProfileData) => {
    if (!user) throw new Error("Utilisateur non connecté");

    setError(null);

    const nextUser: User = {
      ...user,
      ...data,
      permissions: {
        notifications: data.permissions?.notifications ?? user.permissions?.notifications,
        location: data.permissions?.location ?? user.permissions?.location,
      },
      onboardingStep: data.onboardingStep ?? user.onboardingStep,
    };

    // 1) Update auth metadata (fallback / oauth)
    try {
      await supabase.auth.updateUser({
        data: {
          avatar: data.avatar ?? user.avatar,
          username: data.username ?? user.username,
          bio: data.bio ?? user.bio,
          firstName: data.firstName ?? user.firstName,
          lastName: data.lastName ?? user.lastName,
          gender: data.gender ?? user.gender,
          interestedIn: data.interestedIn ?? user.interestedIn,
          relationship: data.relationship ?? user.relationship,
          birthday: data.birthday ?? user.birthday,
          school: data.school ?? user.school,
          job: data.job ?? user.job,
          city: data.city ?? user.city,
          onboardingStep: data.onboardingStep ?? user.onboardingStep,
          permissions: data.permissions ?? user.permissions,
        },
      });
    } catch {
      // on ne bloque pas si metadata échoue
    }

    // 2) Upsert dans public.profiles
    const payload = {
      id: user.id,
      username: data.username ?? user.username ?? null,
      avatar_url: data.avatar ?? user.avatar ?? null,
      bio: data.bio ?? user.bio ?? null,
      first_name: data.firstName ?? user.firstName ?? null,
      last_name: data.lastName ?? user.lastName ?? null,
      gender: data.gender ?? user.gender ?? null,
      interested_in: data.interestedIn ?? user.interestedIn ?? null,
      relationship: data.relationship ?? user.relationship ?? null,
      birthday: data.birthday ?? user.birthday ?? null,
      school: data.school ?? user.school ?? null,
      job: data.job ?? user.job ?? null,
      city: data.city ?? user.city ?? null,
      onboarding_step: data.onboardingStep ?? user.onboardingStep ?? "landing",
      notifications_enabled: data.permissions?.notifications ?? user.permissions?.notifications ?? false,
      location_enabled: data.permissions?.location ?? user.permissions?.location ?? false,
    };

    const { error: upsertError } = await supabase.from("profiles").upsert(payload, { onConflict: "id" });
    if (upsertError) {
      setError(upsertError.message);
      throw upsertError;
    }

    setUser(nextUser);
  };

  return {
    user,
    error,
    isLoading,
    fetchSession,
    signup,
    login,
    loginWithOAuth,
    loginWithPhone,
    verifyPhoneOTP,
    logout,
    updateProfile,
  };
};
