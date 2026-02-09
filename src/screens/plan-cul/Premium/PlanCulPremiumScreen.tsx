import React from "react";
import { PREMIUM_PLANS } from "./premium.config";
import { PROFILE_BOOSTS, VISIBILITY_BOOSTS } from "./boost.config";

const PlanCulPremiumScreen: React.FC = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Options Premium & Boosts</h2>

      {/* 🔹 Abonnements Premium */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Abonnements Premium</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PREMIUM_PLANS.map((plan) => (
            <div
              key={plan.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold text-lg">{plan.title}</h4>
                <p className="text-gray-700 font-semibold text-xl mt-1">${plan.price}</p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  {plan.benefits.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
              <button className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
                Souscrire
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Boost Profil */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Boost Profil</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PROFILE_BOOSTS.map((boost) => (
            <div
              key={boost.id}
              className="bg-white p-3 rounded shadow text-center hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold">{boost.title}</h4>
                <p className="text-gray-700">{boost.duration}</p>
                <p className="text-pink-500 font-semibold">${boost.price}</p>
              </div>
              <button className="mt-3 px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600">
                Acheter
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Boost Visibilité */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Boost Visibilité</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {VISIBILITY_BOOSTS.map((boost) => (
            <div
              key={boost.id}
              className="bg-white p-3 rounded shadow text-center hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold">{boost.title}</h4>
                <p className="text-gray-700">{boost.duration}</p>
                <p className="text-blue-500 font-semibold">${boost.price}</p>
              </div>
              <button className="mt-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                Acheter
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PlanCulPremiumScreen;
