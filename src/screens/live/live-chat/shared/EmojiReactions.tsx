import React from "react";

const emojis = ["🔥", "❤️", "👏", "😂", "😍"];

const EmojiReactions: React.FC = () => {
  return (
    <div className="flex gap-2">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          className="text-xl active:scale-90 transition"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiReactions;
