import React from "react";

const images = [
  "/images/product1.jpg",
  "/images/product2.jpg",
  "/images/product3.jpg",
];

const ProductGallery: React.FC = () => {
  return (
    <div className="space-x-2 overflow-x-auto flex">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Produit ${idx + 1}`}
          className="w-64 h-64 object-cover rounded shadow"
        />
      ))}
    </div>
  );
};

export default ProductGallery;
