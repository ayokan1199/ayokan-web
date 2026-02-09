import React from "react";

// Imports corrigés selon ton dossier shared/
import ChatMessages from "./shared/ChatMessages";
import EmojiReactions from "./shared/EmojiReactions";
import LiveStats from "./LiveStats";

// Gifts
import GiftPanel from "./gifts/GiftPanel";
import { giftManager } from "./gifts/GiftManager";

const MultiLiveScreen: React.FC = () => {
  // Simuler l'envoi d'un cadeau
  React.useEffect(() => {
    giftManager.sendGift({
      id: "g1",
      name: "Rose",
      price: 10,
      sender: "Luna",
      receiver: "Alex",
    });
  }, []);

  return (
    <div className="relative h-screen bg-black text-white">
      {/* Video grid simulée */}
      <div className="h-3/4 grid grid-cols-2 gap-1 bg-gray-900 p-1">
        <div className="bg-gray-800 flex items-center justify-center">Host</div>
        <div className="bg-gray-700 flex items-center justify-center">Guest 1</div>
        <div className="bg-gray-700 flex items-center justify-center">Guest 2</div>
        <div className="bg-gray-700 flex items-center justify-center">Guest 3</div>
      </div>

      {/* LIVE stats overlay */}
      <LiveStats />

      {/* Chat messages */}
      <div className="absolute bottom-24 left-4 right-4 max-h-52 overflow-y-auto">
        <ChatMessages />
      </div>

      {/* Emoji reactions */}
      <div className="absolute bottom-16 left-4 right-4 flex justify-start">
        <EmojiReactions />
      </div>

      {/* Gift panel */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-70">
        <GiftPanel />
      </div>
    </div>
  );
};

export default MultiLiveScreen;
