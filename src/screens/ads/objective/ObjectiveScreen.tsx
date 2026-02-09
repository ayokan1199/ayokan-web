import React, { useState } from "react";
import ObjectiveCard from "./ObjectiveCard";
import ObjectiveDetails from "./ObjectiveDetails";
import ObjectiveExamples from "./ObjectiveExamples";

export type CampaignObjective =
  | "traffic"
  | "engagement"
  | "conversions"
  | "followers"
  | "sales";

const ObjectiveScreen: React.FC = () => {
  const [selected, setSelected] = useState<CampaignObjective | null>(null);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Choisir l’objectif</h1>

      <div className="grid md:grid-cols-2 gap-4">
        <ObjectiveCard
          title="Trafic"
          description="Augmenter les visites"
          value="traffic"
          selected={selected}
          onSelect={setSelected}
        />
        <ObjectiveCard
          title="Engagement"
          description="Likes, commentaires, partages"
          value="engagement"
          selected={selected}
          onSelect={setSelected}
        />
        <ObjectiveCard
          title="Conversions"
          description="Actions spécifiques"
          value="conversions"
          selected={selected}
          onSelect={setSelected}
        />
        <ObjectiveCard
          title="Followers"
          description="Gagner des abonnés"
          value="followers"
          selected={selected}
          onSelect={setSelected}
        />
        <ObjectiveCard
          title="Ventes"
          description="Vendre des produits"
          value="sales"
          selected={selected}
          onSelect={setSelected}
        />
      </div>

      {selected && (
        <>
          <ObjectiveDetails objective={selected} />
          <ObjectiveExamples objective={selected} />
        </>
      )}
    </div>
  );
};

export default ObjectiveScreen;
