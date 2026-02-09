import React, { useState } from "react";
import GiftPanel from "./GiftPanel";
import GiftBalanceBar from "./GiftBalanceBar";
import { Gift } from "./GiftManager";

interface Props {
  gifts: Gift[];
  balance: number;
  onSendGift: (id: string) => void;
  onClose: () => void;
  onRecharge?: () => void;
}

const GiftsModal: React.FC<Props> = ({ gifts, balance, onSendGift, onClose, onRecharge }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 p-4 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-2">Envoyer un cadeau</h2>

        {/* Solde */}
        <GiftBalanceBar balance={balance} />

        {/* Panel cadeaux */}
        <GiftPanel gifts={gifts} onSendGift={onSendGift} />

        {/* Recharge */}
        {onRecharge && (
          <button
            onClick={onRecharge}
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded font-semibold"
          >
            Recharger
          </button>
        )}
      </div>
    </div>
  );
};

export default GiftsModal;
