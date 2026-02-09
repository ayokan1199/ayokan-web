import React from "react";

interface Props {
  headline: string;
  description: string;
  onChange: (data: { headline?: string; description?: string }) => void;
}

const AdCopyEditor: React.FC<Props> = ({
  headline,
  description,
  onChange,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <h2 className="font-semibold">Texte publicitaire</h2>

      <input
        type="text"
        placeholder="Titre accrocheur"
        value={headline}
        onChange={(e) => onChange({ headline: e.target.value })}
        className="border rounded p-2 w-full"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => onChange({ description: e.target.value })}
        className="border rounded p-2 w-full"
        rows={3}
      />
    </div>
  );
};

export default AdCopyEditor;
