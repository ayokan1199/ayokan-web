// screens/bluezone/feed/CreatePost.tsx
import React, { useState, ChangeEvent } from "react";

type CreatePostProps = {
  onPost: (content: string, image?: string) => void;
};

const CreatePost: React.FC<CreatePostProps> = ({ onPost }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | undefined>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!content.trim() && !image) return; // rien à poster
    onPost(content, image);
    setContent("");
    setImage(undefined);
  };

  return (
    <div className="p-4 border rounded-md space-y-2 bg-white">
      <textarea
        placeholder="Quoi de neuf ?"
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />

      {image && (
        <div className="relative">
          <img src={image} alt="Preview" className="w-full rounded" />
          <button
            onClick={() => setImage(undefined)}
            className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded"
          >
            X
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Publier
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
