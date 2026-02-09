import React, { useState } from "react";

const ShippingOptions: React.FC = () => {
  const [selected, setSelected] = useState("standard");

  return (
    <div className="bg-white rounded shadow p-4 space-y-2">
      <h2 className="font-semibold text-lg">Options de livraison</h2>
      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="shipping"
            value="standard"
            checked={selected === "standard"}
            onChange={() => setSelected("standard")}
          />
          Livraison standard (3-5 jours)
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="shipping"
            value="express"
            checked={selected === "express"}
            onChange={() => setSelected("express")}
          />
          Livraison express (1-2 jours)
        </label>
      </div>
    </div>
  );
};

export default ShippingOptions;
