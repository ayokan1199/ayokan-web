import React from "react";

const privateLives = [
  {
    id: "l1",
    title: "Private Q&A Live",
    date: "Friday 21:00",
  },
  {
    id: "l2",
    title: "Behind the Scenes",
    date: "Sunday 19:00",
  },
];

const PrivateLiveList: React.FC = () => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-semibold mb-2">Private Lives</h3>

      {privateLives.length === 0 ? (
        <p className="text-sm text-gray-500">
          No private lives scheduled
        </p>
      ) : (
        <div className="space-y-2">
          {privateLives.map((live) => (
            <div
              key={live.id}
              className="flex justify-between text-sm"
            >
              <span>{live.title}</span>
              <span className="text-gray-500">{live.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrivateLiveList;
