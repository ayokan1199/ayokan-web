// src/screens/chat/services/messageLimiter.ts

export type AccountType = "basic" | "premium" | "vip" | "gold";
export type UserPlan = AccountType;

export type LimiterState = {
  userId: string;

  accountType: AccountType;

  // Daily counters
  dayKey: string; // YYYY-MM-DD
  dailyFreeLimit: number; // basic only (ex: 10)
  usedToday: number;

  // Ads reward
  adsWatchedToday: number; // credits 0..adsPerUnlock-1
  adsPerUnlock: number; // ex: 10
  unlockPackSize: number; // ex: 25
  unlockedMessagesToday: number; // granted messages by ads (sum)
  unlockedRemaining: number; // remaining messages from unlocked pack(s)

  // Optional anti-abuse
  maxUnlockBatchesPerDay: number; // ex: 3 => 3*25 messages max/day via ads
  unlockBatchCountToday: number;

  updatedAt: number;
};

export type MessageLimiterStatus = {
  accountType: AccountType;

  canSend: boolean;
  reason?: "LIMIT_REACHED" | "NEEDS_ADS" | "BLOCKED";

  // basic counters UI
  dailyFreeLimit: number;
  sentToday: number;
  freeRemaining: number;

  // unlocked counters UI
  unlockedMessagesAvailable: number; // same as unlockedRemaining (alias for UI)
  unlockedRemaining: number;

  totalRemainingForBasic: number;

  // ads progress UI
  adsWatchedToday: number;
  adsPerUnlock: number;
  progressToUnlock: number; // 0..adsPerUnlock
  adsRequiredToUnlock: number; // remaining ads to complete next pack
  unlockPackSize: number;
  batchesLeftToday: number;

  dayKey: string;
};

const STORAGE_PREFIX = "ayokan.chat.limiter.v1";

function todayKey(d = new Date()): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function storageKey(userId: string) {
  return `${STORAGE_PREFIX}:${userId}`;
}

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function defaultState(userId: string, accountType: AccountType): LimiterState {
  return {
    userId,
    accountType,

    dayKey: todayKey(),
    dailyFreeLimit: 10,
    usedToday: 0,

    adsWatchedToday: 0,
    adsPerUnlock: 10,
    unlockPackSize: 25,
    unlockedMessagesToday: 0,
    unlockedRemaining: 0,

    maxUnlockBatchesPerDay: 3,
    unlockBatchCountToday: 0,

    updatedAt: Date.now(),
  };
}

/**
 * Règles:
 * - premium/vip/gold: illimité
 * - basic: 10 gratuits/jour + packs débloqués (adsPerUnlock pubs => +unlockPackSize messages)
 * - maxUnlockBatchesPerDay packs/jour
 */
export class MessageLimiter {
  private state: LimiterState;

  constructor(userId: string, accountType: AccountType) {
    const loaded = this.load(userId);
    this.state = loaded ?? defaultState(userId, accountType);

    // force plan actuel
    this.state.accountType = accountType;

    this.rollDayIfNeeded();
    this.save();
  }

  getState(): LimiterState {
    this.rollDayIfNeeded();
    return { ...this.state };
  }

  getStatus(): MessageLimiterStatus {
    this.rollDayIfNeeded();

    const s = this.state;

    // plans illimités
    if (s.accountType !== "basic") {
      return {
        accountType: s.accountType,
        canSend: true,

        dailyFreeLimit: s.dailyFreeLimit,
        sentToday: s.usedToday,
        freeRemaining: Number.POSITIVE_INFINITY,

        unlockedMessagesAvailable: Number.POSITIVE_INFINITY,
        unlockedRemaining: Number.POSITIVE_INFINITY,

        totalRemainingForBasic: Number.POSITIVE_INFINITY,

        adsWatchedToday: 0,
        adsPerUnlock: s.adsPerUnlock,
        progressToUnlock: 0,
        adsRequiredToUnlock: 0,
        unlockPackSize: s.unlockPackSize,
        batchesLeftToday: 0,

        dayKey: s.dayKey,
      };
    }

    const freeRemaining = Math.max(0, s.dailyFreeLimit - s.usedToday);
    const unlockedRemaining = Math.max(0, s.unlockedRemaining);
    const totalRemainingForBasic = freeRemaining + unlockedRemaining;

    const batchesLeftToday = Math.max(0, s.maxUnlockBatchesPerDay - s.unlockBatchCountToday);
    const progressToUnlock = clamp(s.adsWatchedToday, 0, s.adsPerUnlock);
    const adsRequiredToUnlock = Math.max(0, s.adsPerUnlock - progressToUnlock);

    const canSend = totalRemainingForBasic > 0;

    return {
      accountType: s.accountType,
      canSend,
      reason: canSend ? undefined : "LIMIT_REACHED",

      dailyFreeLimit: s.dailyFreeLimit,
      sentToday: s.usedToday,
      freeRemaining,

      unlockedMessagesAvailable: unlockedRemaining,
      unlockedRemaining,

      totalRemainingForBasic,

      adsWatchedToday: s.adsWatchedToday,
      adsPerUnlock: s.adsPerUnlock,
      progressToUnlock,
      adsRequiredToUnlock,
      unlockPackSize: s.unlockPackSize,
      batchesLeftToday,

      dayKey: s.dayKey,
    };
  }

  canSendMessage(): boolean {
    return this.getStatus().canSend;
  }

  consumeOneMessage(): MessageLimiterStatus {
    this.rollDayIfNeeded();

    if (this.state.accountType !== "basic") return this.getStatus();

    const freeRemaining = this.state.dailyFreeLimit - this.state.usedToday;

    if (freeRemaining > 0) {
      this.state.usedToday += 1;
      this.touch();
      this.save();
      return this.getStatus();
    }

    if (this.state.unlockedRemaining > 0) {
      this.state.unlockedRemaining -= 1;
      this.touch();
      this.save();
      return this.getStatus();
    }

    return this.getStatus();
  }

  registerAdWatched(): { status: MessageLimiterStatus; unlockedNow: boolean } {
    this.rollDayIfNeeded();

    if (this.state.accountType !== "basic") {
      return { status: this.getStatus(), unlockedNow: false };
    }

    const batchesLeftToday = this.state.maxUnlockBatchesPerDay - this.state.unlockBatchCountToday;

    // plus de packs possibles aujourd'hui => on avance pas (ou tu peux plafonner à adsPerUnlock-1)
    if (batchesLeftToday <= 0) {
      // on garde la progression max affichable, sans débloquer
      this.state.adsWatchedToday = clamp(this.state.adsWatchedToday + 1, 0, this.state.adsPerUnlock);
      this.touch();
      this.save();
      return { status: this.getStatus(), unlockedNow: false };
    }

    this.state.adsWatchedToday += 1;

    let unlockedNow = false;

    if (this.state.adsWatchedToday >= this.state.adsPerUnlock) {
      this.state.adsWatchedToday = 0;
      this.state.unlockBatchCountToday += 1;

      const grant = this.state.unlockPackSize;
      this.state.unlockedMessagesToday += grant;
      this.state.unlockedRemaining += grant;

      unlockedNow = true;
    }

    this.touch();
    this.save();

    return { status: this.getStatus(), unlockedNow };
  }

  setAccountType(next: AccountType) {
    this.state.accountType = next;
    this.touch();
    this.save();
  }

  resetToday() {
    const dk = todayKey();
    this.state.dayKey = dk;
    this.state.usedToday = 0;
    this.state.adsWatchedToday = 0;
    this.state.unlockedMessagesToday = 0;
    this.state.unlockedRemaining = 0;
    this.state.unlockBatchCountToday = 0;
    this.touch();
    this.save();
  }

  private touch() {
    this.state.updatedAt = Date.now();
  }

  private rollDayIfNeeded() {
    const nowKey = todayKey();
    if (this.state.dayKey === nowKey) return;

    this.state.dayKey = nowKey;
    this.state.usedToday = 0;
    this.state.adsWatchedToday = 0;
    this.state.unlockedMessagesToday = 0;
    this.state.unlockedRemaining = 0;
    this.state.unlockBatchCountToday = 0;
    this.touch();
  }

  private load(userId: string): LimiterState | null {
    if (typeof window === "undefined") return null;

    const raw = localStorage.getItem(storageKey(userId));
    const parsed = safeParse<LimiterState>(raw);

    if (!parsed || !parsed.userId) return null;

    // garde-fous
    parsed.dailyFreeLimit = Number(parsed.dailyFreeLimit ?? 10);
    parsed.usedToday = Number(parsed.usedToday ?? 0);

    parsed.adsWatchedToday = Number(parsed.adsWatchedToday ?? 0);
    parsed.adsPerUnlock = Number(parsed.adsPerUnlock ?? 10);
    parsed.unlockPackSize = Number(parsed.unlockPackSize ?? 25);

    parsed.unlockedMessagesToday = Number(parsed.unlockedMessagesToday ?? 0);
    parsed.unlockedRemaining = Number(parsed.unlockedRemaining ?? 0);

    parsed.maxUnlockBatchesPerDay = Number(parsed.maxUnlockBatchesPerDay ?? 3);
    parsed.unlockBatchCountToday = Number(parsed.unlockBatchCountToday ?? 0);

    parsed.updatedAt = Number(parsed.updatedAt ?? Date.now());

    return parsed;
  }

  private save() {
    if (typeof window === "undefined") return;
    localStorage.setItem(storageKey(this.state.userId), JSON.stringify(this.state));
  }
}

/**
 * Export attendu par ChatScreen.tsx
 */
export function createLimiter(userId: string, accountType: AccountType) {
  return new MessageLimiter(userId, accountType);
}
