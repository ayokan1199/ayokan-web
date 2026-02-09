import React, { useState } from "react";

const VisibilityControls: React.FC = () => {
  const [visibility, setVisibility] = useState<"public" | "friends" | "private">(
    "public"
  );

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h2 className="font-semibold">Qui peut me voir</h2>

      {[
        { key: "public", label: "Tout le monde" },
        { key: "friends", label: "Amis uniquement" },
        { key: "private", label: "Personne" },
      ].map((option) => (
        <label
          key={option.key}
          className="flex items-center justify-between cursor-pointer"
        >
          <span>{option.label}</span>
          <input
            type="radio"
            checked={visibility === option.key}
            onChange={() =>
              setVisibility(option.key as "public" | "friends" | "private")
            }
          />
        </label>
      ))}
    </div>
  );
};

export default VisibilityControls;
