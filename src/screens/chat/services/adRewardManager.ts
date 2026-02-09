// src/screens/chat/services/adRewardManager.ts

import type { MessageLimiterStatus } from "./messageLimiter";
import { MessageLimiter } from "./messageLimiter";

export type RewardedAdProvider = "mock" | "admob" | "google-ima" | "custom";

export type AdRewardConfig = {
  provider: RewardedAdProvider;

  /** anti spam: 1 seule pub active à la fois */
  cooldownMs: number;

  /** sécurité: timeout si SDK ne répond pas */
  adTimeoutMs: number;
};

export type WatchAdResult =
  | { ok: true; unlockedNow: boolean; status: MessageLimiterStatus }
  | { ok: false; code: "BUSY" | "TIMEOUT" | "FAILED" | "NO_LIMITER"; message: string };

const DEFAULT_CONFIG: AdRewardConfig = {
  provider: "mock",
  cooldownMs: 700,
  adTimeoutMs: 25_000,
};

/**
 * Gestionnaire pub récompensée:
 * - Une seule session pub active (busy lock)
 * - Simule un rewarded ad (provider=mock)
 * - Branche le credit sur MessageLimiter.registerAdWatched()
 *
 * Tu pourras remplacer `runMockRewardedAd()` par ton SDK (Admob/IMA/etc).
 */
export class AdRewardManager {
  getState() {
    throw new Error("Method not implemented.");
  }
  hydrate() {
    throw new Error("Method not implemented.");
  }
  incrementWatched(arg0: number) {
    throw new Error("Method not implemented.");
  }
  canUnlockPack() {
    throw new Error("Method not implemented.");
  }
  unlockPack() {
    throw new Error("Method not implemented.");
  }
  consumeUnlockedIntoLimiter() {
    throw new Error("Method not implemented.");
  }
  private limiter: MessageLimiter | null = null;
  private config: AdRewardConfig;

  private busy = false;
  private lastRunAt = 0;

  constructor(limiter: MessageLimiter | null, config?: Partial<AdRewardConfig>) {
    this.limiter = limiter ?? null;
    this.config = { ...DEFAULT_CONFIG, ...(config ?? {}) };
  }

  setLimiter(limiter: MessageLimiter | null) {
    this.limiter = limiter ?? null;
  }

  setConfig(config: Partial<AdRewardConfig>) {
    this.config = { ...this.config, ...config };
  }

  isBusy() {
    return this.busy;
  }

  /**
   * Lance une pub récompensée:
   * - lock anti double click
   * - timeout sécurité
   * - à la fin: crédite 1 pub dans MessageLimiter
   */
  async watchRewardedAd(): Promise<WatchAdResult> {
    if (!this.limiter) {
      return { ok: false, code: "NO_LIMITER", message: "Limiter manquant" };
    }

    const now = Date.now();
    if (this.busy || now - this.lastRunAt < this.config.cooldownMs) {
      return { ok: false, code: "BUSY", message: "Pub déjà en cours" };
    }

    this.busy = true;
    this.lastRunAt = now;

    try {
      const completed = await this.runWithTimeout<boolean>(
        this.runRewardedAdByProvider(),
        this.config.adTimeoutMs
      );

      if (!completed) {
        return { ok: false, code: "FAILED", message: "Pub non validée" };
      }

      const { status, unlockedNow } = this.limiter.registerAdWatched();
      return { ok: true, unlockedNow, status };
    } catch (e: any) {
      if (e?.code === "TIMEOUT") {
        return { ok: false, code: "TIMEOUT", message: "Timeout pub" };
      }
      return { ok: false, code: "FAILED", message: e?.message || "Erreur pub" };
    } finally {
      this.busy = false;
    }
  }

  /* ===================== internals ===================== */

  private runRewardedAdByProvider(): Promise<boolean> {
    switch (this.config.provider) {
      case "mock":
        return this.runMockRewardedAd();

      // placeholders propres: tu brancheras ton SDK ici
      case "admob":
      case "google-ima":
      case "custom":
      default:
        return this.runMockRewardedAd();
    }
  }

  /**
   * Mock: simule une pub réussie 90% du temps.
   * Remplace par un vrai SDK: resolve(true) uniquement quand reward confirmé.
   */
  private runMockRewardedAd(): Promise<boolean> {
    return new Promise((resolve) => {
      const ms = 1100 + Math.floor(Math.random() * 1200);
      setTimeout(() => {
        const ok = Math.random() < 0.9;
        resolve(ok);
      }, ms);
    });
  }

  private async runWithTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    let t: any;

    const timeoutPromise = new Promise<T>((_resolve, reject) => {
      t = setTimeout(() => {
        const err: any = new Error("Timeout");
        err.code = "TIMEOUT";
        reject(err);
      }, timeoutMs);
    });

    try {
      return await Promise.race([promise, timeoutPromise]);
    } finally {
      clearTimeout(t);
    }
  }
}

/**
 * Helper simple
 */
export function createAdRewardManager(limiter: MessageLimiter | null, config?: Partial<AdRewardConfig>) {
  return new AdRewardManager(limiter, config);
}
