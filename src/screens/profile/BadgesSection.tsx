import React from "react";
import Badge from "./shared/Badge";

const BadgesSection: React.FC = () => {
  const badges = ["VIP", "Gold", "Mission complétée", "Boost actif"];
  return (
    <div className="p-2 bg-white mt-2">
      <h3 className="font-bold mb-2">Badges / Missions</h3>
      <div className="flex flex-wrap gap-2">
        {badges.map((b, i) => <Badge key={i} label={b} />)}
      </div>
    </div>
  );
};

export default BadgesSection;
