import React from "react";

interface Props {
  onSelect: (intent: string) => void;
}

const MatchIntentSelector: React.FC<Props> = ({ onSelect }) => {
  const intents = ["Rencontre rapide", "Chat coquin", "LIVE Plan Cul"];

  return (
    <div className="flex gap-4 mb-4">
      {intents.map((intent) => (
        <button
          key={intent}
          onClick={() => onSelect(intent)}
          className="px-4 py-2 bg-purple-500 text-white rounded shadow hover:bg-purple-600"
        >
          {intent}
        </button>
      ))}
    </div>
  );
};

export default MatchIntentSelector;
