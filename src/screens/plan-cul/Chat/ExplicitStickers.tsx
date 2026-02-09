import React from "react";

const stickers = ["🍑", "💦", "🔥", "💋"];

const ExplicitStickers: React.FC = () => {
  const sendSticker = (sticker: string) => {
    alert(`Sticker envoyé : ${sticker}`);
  };

  return (
    <div className="flex gap-2">
      {stickers.map((sticker, idx) => (
        <button
          key={idx}
          onClick={() => sendSticker(sticker)}
          className="text-2xl"
        >
          {sticker}
        </button>
      ))}
    </div>
  );
};

export default ExplicitStickers;
