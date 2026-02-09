// screens/bluezone/reels/ReelsScreen.tsx
import React from "react";
import ReelsList from "./ReelsList";

const ReelsScreen: React.FC = () => {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reels BlueZone</h1>
      <ReelsList />
    </div>
  );
};

export default ReelsScreen;
