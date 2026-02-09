import React from "react";

interface Props {
  value: "boost" | "discount" | "traffic";
  onChange: (val: "boost" | "discount" | "traffic") => void;
}

const CampaignTypeSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold mb-1">Type de campagne</label>
      <div className="flex space-x-2">
        {["boost", "discount", "traffic"].map((type) => (
          <button
            key={type}
            onClick={() => onChange(type as "boost" | "discount" | "traffic")}
            className={`px-3 py-1 rounded border ${
              value === type ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CampaignTypeSelector;
