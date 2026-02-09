import React from "react";
import CreateProductAd from "./CreateProductAd";
import AdPerformance from "./AdPerformance";
import AdHistory from "./AdHistory";

const ShopAdsOverview: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Publicités Produits</h1>

      <CreateProductAd />
      <AdPerformance />
      <AdHistory />
    </div>
  );
};

export default ShopAdsOverview;
