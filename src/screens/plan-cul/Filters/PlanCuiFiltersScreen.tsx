import React, { useState } from "react";
import DistanceFilter from "./DistanceFilter";
import IntentFilter from "./IntentFilter";
import AvailabilityFilter from "./AvailabilityFilter";
import ExplicitLevelFilter from "./ExplicitLevelFilter";

const PlanCulFiltersScreen: React.FC = () => {
  const [filters, setFilters] = useState({
    distance: 50,
    intent: "Fun",
    availability: true,
    explicitLevel: "Medium",
  });

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-bold mb-2">Filtres avancés</h2>

      <DistanceFilter
        value={filters.distance}
        onChange={(value) => setFilters({ ...filters, distance: value })}
      />
      <IntentFilter
        value={filters.intent}
        onChange={(value) => setFilters({ ...filters, intent: value })}
      />
      <AvailabilityFilter
        value={filters.availability}
        onChange={(value) => setFilters({ ...filters, availability: value })}
      />
      <ExplicitLevelFilter
        value={filters.explicitLevel}
        onChange={(value) => setFilters({ ...filters, explicitLevel: value })}
      />

      <button className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
        Appliquer les filtres
      </button>
    </div>
  );
};

export default PlanCulFiltersScreen;
