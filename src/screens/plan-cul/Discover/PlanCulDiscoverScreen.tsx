import React from "react";
import UserCardExplicit from "./UserCardExplicit";
import NearbyUsers from "./NearByUsers";
import PlanCulHighlights from "./PlanCulHighLights";
import SwipeActions from "./SwipeActions";

const PlanCulDiscoverScreen: React.FC = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Découverte Plan Cul</h1>
      
      <PlanCulHighlights />

      <div className="my-6">
        <NearbyUsers />
      </div>

      <div className="space-y-4">
        <UserCardExplicit />
        <UserCardExplicit />
        <UserCardExplicit />
      </div>

      <SwipeActions />
    </div>
  );
};

export default PlanCulDiscoverScreen;
