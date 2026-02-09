import React from "react";
import LiveCategoryList from "./LiveCategoryList";
import PlannedLiveSection from "./PlanCulLiveSession";
import RecommendedLives from "./RecommendedLives";

const LiveDiscoverScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Discover Live Streams</h1>

      <LiveCategoryList />
      <PlannedLiveSection />
      <RecommendedLives />
    </div>
  );
};

export default LiveDiscoverScreen;
