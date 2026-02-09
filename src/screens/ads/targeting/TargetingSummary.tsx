import React from "react";
import { TargetingData } from "./TargetingScreen";

interface Props {
  data: TargetingData;
}

const TargetingSummary: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-gray-50 p-4 rounded border">
      <h2 className="font-semibold mb-2">Résumé du ciblage</h2>

      <ul className="text-sm space-y-1 text-gray-700">
        <li>📍 Lieux : {data.locations.join(", ") || "Tous"}</li>
        <li>
          🎂 Âge : {data.ageRange[0]} – {data.ageRange[1]}
        </li>
        <li>🚻 Genres : {data.genders.join(", ") || "Tous"}</li>
        <li>⭐ Intérêts : {data.interests.join(", ") || "Aucun"}</li>
        <li>⚡ Comportements : {data.behaviors.join(", ") || "Aucun"}</li>
      </ul>
    </div>
  );
};

export default TargetingSummary;
