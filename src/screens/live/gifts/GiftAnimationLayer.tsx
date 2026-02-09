import React, { useEffect, useState } from "react";

interface Props {
  giftId: string;
}

interface ActiveGift {
  id: number;
  giftId: string;
  x: number;
  y: number;
}

const GiftAnimationLayer: React.FC<Props> = ({ giftId }) => {
  const [activeGifts, setActiveGifts] = useState<ActiveGift[]>([]);

  useEffect(() => {
    const id = Date.now();
    const newGift: ActiveGift = { id, giftId, x: Math.random() * 300, y: 0 };
    setActiveGifts((prev) => [...prev, newGift]);
    const timer = setTimeout(() => {
      setActiveGifts((prev) => prev.filter((g) => g.id !== id));
    }, 2000);
    return () => clearTimeout(timer);
  }, [giftId]);

  return (
    <div className="absolute pointer-events-none w-full h-full">
      {activeGifts.map((g) => (
        <div
          key={g.id}
          className="absolute text-2xl animate-bounce"
          style={{ left: g.x, top: g.y }}
        >
          🎁
        </div>
      ))}
    </div>
  );
};

export default GiftAnimationLayer;
