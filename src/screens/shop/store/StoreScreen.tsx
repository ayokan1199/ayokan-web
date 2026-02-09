import React from "react";
import StoreHeader from "./StoreHeader";
import StoreProductGrid from "./StoreProductGrid";
import StoreReviews from "./StoreReviews";

const StoreScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <StoreHeader />
      <StoreProductGrid />
      <StoreReviews />
    </div>
  );
};

export default StoreScreen;
