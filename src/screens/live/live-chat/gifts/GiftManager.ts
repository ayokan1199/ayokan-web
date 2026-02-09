export interface Gift {
  id: string;
  name: string;
  price: number; // coût en sparks
  sender: string;
  receiver: string;
  timestamp: number;
}

export interface GiftState {
  sentGifts: Gift[];
  receivedGifts: Gift[];
}

class GiftManager {
  private state: GiftState = {
    sentGifts: [],
    receivedGifts: [],
  };

  // Envoyer un cadeau
  sendGift(gift: Omit<Gift, "timestamp">) {
    const giftWithTimestamp: Gift = {
      ...gift,
      timestamp: Date.now(),
    };

    this.state.sentGifts.push(giftWithTimestamp);
    this.state.receivedGifts.push(giftWithTimestamp); // simule réception immédiate
    console.log("Gift sent:", giftWithTimestamp);
  }

  // Récupérer les cadeaux envoyés
  getSentGifts() {
    return this.state.sentGifts;
  }

  // Récupérer les cadeaux reçus
  getReceivedGifts() {
    return this.state.receivedGifts;
  }

  // Réinitialiser l'état (nouvelle session)
  reset() {
    this.state = { sentGifts: [], receivedGifts: [] };
  }
}

// Singleton pour toute l’app
export const giftManager = new GiftManager();
