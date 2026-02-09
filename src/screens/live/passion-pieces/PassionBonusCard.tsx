import React from "react";

interface Props {
  bonus: string;
}

const PassionBonusCard: React.FC<Props> = ({ bonus }) => {
  return (
    <div className="p-2 bg-white rounded shadow text-sm font-semibold">
      🎉 {bonus}
    </div>
  );
};

export default PassionBonusCard;
