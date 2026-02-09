import React from "react";

interface PostsGridProps {
  posts?: string[]; // URLs des images
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts }) => {
  // Exemple par défaut si pas de posts fournis
  const defaultPosts = Array.from({ length: 12 }, (_, i) => `/images/post${i + 1}.jpg`);
  const gridPosts = posts || defaultPosts;

  return (
    <div className="grid grid-cols-3 gap-1 p-2">
      {gridPosts.map((src, index) => (
        <div key={index} className="w-full aspect-square">
          <img
            src={src}
            alt={`Post ${index + 1}`}
            className="w-full h-full object-cover rounded"
          />
        </div>
      ))}
    </div>
  );
};

export default PostsGrid;
