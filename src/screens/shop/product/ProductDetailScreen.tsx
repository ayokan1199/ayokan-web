import React from "react";
import ProductGallery from "./ProductGallery";
import ProductDescription from "./ProductDescription";
import ProductVariants from "./ProductVariants";
import ProductSellerInfo from "./ProductSellerInfo";
import ProductActions from "./ProductActions";

const ProductDetailScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <ProductGallery />
      <ProductDescription />
      <ProductVariants />
      <ProductSellerInfo />
      <ProductActions />
    </div>
  );
};

export default ProductDetailScreen;
