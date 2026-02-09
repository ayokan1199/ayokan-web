import React from "react";

const collaborations = [
  { id: 1, brand: "Marque A", status: "En cours" },
  { id: 2, brand: "Marque B", status: "Terminé" },
];

const BrandCollabs: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h2 className="font-semibold">Collaborations marques & créateurs</h2>

      {collaborations.map((collab) => (
        <div key={collab.id} className="flex justify-between text-sm border-b py-1">
          <span>{collab.brand}</span>
          <span className="font-medium">{collab.status}</span>
        </div>
      ))}
    </div>
  );
};

export default BrandCollabs;
