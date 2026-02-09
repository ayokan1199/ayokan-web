import React, { useState } from "react";

const variants = ["Rouge", "Bleu", "Vert"];

const ProductVariants: React.FC = () => {
  const [selected, setSelected] = useState(variants[0]);

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-semibold mb-2">Variantes disponibles</h3>
      <div className="flex space-x-2">
        {variants.map((v) => (
          <button
            key={v}
            onClick={() => setSelected(v)}
            className={`px-4 py-2 rounded border ${
              selected === v ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <p className="mt-2 text-gray-500">Sélectionné : {selected}</p>
    </div>
  );
};

export default ProductVariants;
