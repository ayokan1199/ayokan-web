import React from "react";
import QuestItem from "./QuestItem";
import QuestRewardSummary from "./QuestRewardSummary";

const weeklyQuests = [
  {
    id: "q1",
    title: "Send 50 hearts",
    progress: 30,
    goal: 50,
    reward: 100,
  },
  {
    id: "q2",
    title: "Watch 3 live streams",
    progress: 2,
    goal: 3,
    reward: 60,
  },
];

const WeeklyQuestsScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Weekly Passion Quests</h1>

      {weeklyQuests.map((quest) => (
        <QuestItem key={quest.id} quest={quest} />
      ))}

      <QuestRewardSummary quests={weeklyQuests} />
    </div>
  );
};

export default WeeklyQuestsScreen;
