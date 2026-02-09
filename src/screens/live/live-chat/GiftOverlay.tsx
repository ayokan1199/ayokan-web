import React from "react";

interface Props {
  sender: string;
  giftName: string;
}

const GiftOverlay: React.FC<Props> = ({ sender, giftName }) => {
  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-4 py-2 rounded shadow">
      🎁 {sender} sent {giftName}
    </div>
  );
};

export default GiftOverlay;
