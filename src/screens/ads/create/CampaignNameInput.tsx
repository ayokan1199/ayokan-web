import React from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const CampaignNameInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold mb-1">Nom de la campagne</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Entrez un nom de campagne"
        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default CampaignNameInput;
