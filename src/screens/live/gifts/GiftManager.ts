export interface Gift {
  id: string;
  name: string;
  cost: number;
  icon: string;
}

export class GiftManager {
  balance: number;

  constructor(initialBalance: number = 0) {
    this.balance = initialBalance;
  }

  sendGift(gift: Gift): boolean {
    if (this.balance >= gift.cost) {
      this.balance -= gift.cost;
      return true;
    }
    return false;
  }

  recharge(amount: number) {
    this.balance += amount;
  }
}
