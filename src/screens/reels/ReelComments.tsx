import React from "react";

interface Comment {
  username: string;
  text: string;
  badge?: string;
}

interface ReelCommentsProps {
  comments: Comment[];
}

const ReelComments: React.FC<ReelCommentsProps> = ({ comments }) => {
  return (
    <div className="max-h-32 overflow-y-auto mt-2">
      {comments.map((c, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="font-bold">{c.username}</span>
          {c.badge && <span className="px-1 text-xs bg-yellow-500 rounded">{c.badge}</span>}
          <span>{c.text}</span>
        </div>
      ))}
      <input
        type="text"
        placeholder="Ajouter un commentaire..."
        className="w-full mt-2 p-1 rounded border text-black"
      />
    </div>
  );
};

export default ReelComments;
