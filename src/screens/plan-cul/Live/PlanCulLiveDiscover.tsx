import React from "react";

const liveShows = [
  { id: "1", title: "Soirée chaude", viewers: 120 },
  { id: "2", title: "Live coquin", viewers: 85 },
  { id: "3", title: "Folie nocturne", viewers: 45 },
];

const PlanCulLiveDiscover: React.FC = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Découverte Live Plan Cul</h2>
      <div className="grid grid-cols-1 gap-4">
        {liveShows.map((live) => (
          <div
            key={live.id}
            className="p-3 bg-pink-50 rounded shadow flex justify-between items-center"
          >
            <span className="font-semibold">{live.title}</span>
            <span className="text-gray-500">{live.viewers} viewers</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanCulLiveDiscover;
