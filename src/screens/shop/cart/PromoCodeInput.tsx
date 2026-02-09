import React, { useState } from "react";

const PromoCodeInput: React.FC = () => {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);

  const applyCode = () => {
    if (code.trim() !== "") {
      setApplied(true);
      alert(`Code promo "${code}" appliqué !`);
    }
  };

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        placeholder="Code promo"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border rounded p-2 flex-1"
      />
      <button
        onClick={applyCode}
        disabled={applied}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {applied ? "Appliqué" : "Appliquer"}
      </button>
    </div>
  );
};

export default PromoCodeInput;
