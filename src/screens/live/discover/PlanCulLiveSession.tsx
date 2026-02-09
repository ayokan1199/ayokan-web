import React from "react";

const plannedLives = [
  {
    id: "pc1",
    title: "Private Night Live 🔥",
    date: "Tonight 23:00",
  },
  {
    id: "pc2",
    title: "VIP After Dark",
    date: "Tomorrow 21:30",
  },
];

const PlanCulLiveSection: React.FC = () => {
  return (
    <div>
      <h2 className="font-semibold mb-2">Planned Private Lives</h2>

      <div className="space-y-2">
        {plannedLives.map((live) => (
          <div
            key={live.id}
            className="flex justify-between bg-white p-3 rounded shadow"
          >
            <span>{live.title}</span>
            <span className="text-sm text-gray-500">{live.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanCulLiveSection;
