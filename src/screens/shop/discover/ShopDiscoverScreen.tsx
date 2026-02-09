import React from "react";
import ShopSearchBar from "./ShopSearchBar";
import CategoryTabs from "./CategoryTabs";
import FeaturedProducts from "./FeaturedProducts";
import ProductFeed from "./ProductFeed";

const ShopDiscoverScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <ShopSearchBar />
      <CategoryTabs />
      <FeaturedProducts />
      <ProductFeed />
    </div>
  );
};

export default ShopDiscoverScreen;
