import React from "react";

interface Props {
  status: string;
}

const OrderTracking: React.FC<Props> = ({ status }) => {
  const steps = ["En préparation", "Expédié", "Livré"];

  return (
    <div className="bg-white rounded shadow p-4 space-y-2">
      <h3 className="font-semibold">Suivi de la commande</h3>
      <div className="flex space-x-4">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full border-2 ${
                steps.indexOf(status) >= idx ? "border-green-600 bg-green-600" : "border-gray-300"
              }`}
            />
            <p className="text-sm mt-1">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;
