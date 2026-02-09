import React from "react";
import { CreativeData } from "./CreativeScreen";

interface Props {
  creative: CreativeData;
}

const CreativePreview: React.FC<Props> = ({ creative }) => {
  return (
    <div className="border rounded p-4 bg-gray-50 space-y-2">
      <h2 className="font-semibold">Aperçu</h2>

      {creative.mediaUrl && (
        <img
          src={creative.mediaUrl}
          alt="Creative preview"
          className="rounded max-h-48"
        />
      )}

      <h3 className="font-bold">{creative.headline || "Titre"}</h3>
      <p className="text-sm text-gray-700">
        {creative.description || "Description de la publicité"}
      </p>

      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
        {creative.cta}
      </button>
    </div>
  );
};

export default CreativePreview;
