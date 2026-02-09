import React, { useState } from "react";
import MatchAnimation from "./MatchAnimation";
import MatchIntentSelector from "./MatchIntentSelector";
import MatchRulesModal from "./MatchRulesModal";
import MatchHistory from "./MatchHistory";

const PlanCulMatchScreen: React.FC = () => {
  const [showRules, setShowRules] = useState(false);
  const [matchedUser, setMatchedUser] = useState<string | null>(null);

  const handleMatch = (intent: string) => {
    // Simulation d’un match
    const userNames = ["Alice", "Bob", "Clara", "David"];
    const randomUser = userNames[Math.floor(Math.random() * userNames.length)];
    setMatchedUser(randomUser);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Match Express Plan Cul</h1>

      <button
        className="mb-4 text-sm text-blue-600 underline"
        onClick={() => setShowRules(true)}
      >
        Voir les règles
      </button>

      <MatchIntentSelector onSelect={handleMatch} />

      {matchedUser && <MatchAnimation userName={matchedUser} />}

      <MatchHistory />

      {showRules && <MatchRulesModal onClose={() => setShowRules(false)} />}
    </div>
  );
};

export default PlanCulMatchScreen;
