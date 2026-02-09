import React from "react";
import TipCard from "./TipCard";

interface Tip {
  id: string;
  title: string;
  description: string;
}

interface Props {
  tips: Tip[];
}

const TipsSection: React.FC<Props> = ({ tips }) => {
  return (
    <div className="bg-white rounded shadow p-4 space-y-4">
      <h3 className="text-xl font-bold">Conseils pour booster vos gains</h3>
      <div className="space-y-3">
        {tips.map((tip) => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </div>
    </div>
  );
};

export default TipsSection;
