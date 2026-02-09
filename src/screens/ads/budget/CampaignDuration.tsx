import React from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const CampaignDuration: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-semibold">Durée de la campagne (jours)</h2>

      <input
        type="number"
        min={1}
        max={365}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border rounded p-2 w-32"
      />
    </div>
  );
};

export default CampaignDuration;
