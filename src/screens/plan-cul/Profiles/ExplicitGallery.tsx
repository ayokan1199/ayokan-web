import React from "react";

const photos = [
  "https://via.placeholder.com/300x200",
  "https://via.placeholder.com/300x200",
  "https://via.placeholder.com/300x200",
];

const ExplicitGallery: React.FC = () => {
  return (
    <div className="my-4">
      <h3 className="font-semibold mb-2">Galerie +18</h3>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Photo ${index + 1}`}
            className="w-full h-24 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default ExplicitGallery;
