import React from "react";

const plans = [
  {
    name: "Premium",
    description: "Accès avancé, badges exclusifs",
    price: "9,99€ / mois",
  },
  {
    name: "VIP",
    description: "Visibilité boostée, gains augmentés",
    price: "19,99€ / mois",
  },
  {
    name: "Gold",
    description: "Top créateurs, priorités absolues",
    price: "39,99€ / mois",
  },
];

const Subscriptions: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h2 className="font-semibold">Abonnements</h2>

      {plans.map((plan) => (
        <div
          key={plan.name}
          className="flex justify-between items-center border rounded-md p-3"
        >
          <div>
            <p className="font-medium">{plan.name}</p>
            <p className="text-sm text-gray-500">{plan.description}</p>
          </div>

          <button className="text-blue-600 text-sm">
            {plan.price}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Subscriptions;
