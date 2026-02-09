import React from "react";

interface Props {
  viewers: number;
  likes: number;
  gifts: number;
  comments: number;
}

const LiveStatsOverview: React.FC<Props> = ({ viewers, likes, gifts, comments }) => {
  return (
    <div className="grid grid-cols-2 gap-4 bg-white rounded shadow p-4 text-sm">
      <div className="flex flex-col items-center">
        <span className="font-bold text-lg">{viewers}</span>
        <span>Viewers</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold text-lg">{likes}</span>
        <span>Likes</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold text-lg">{gifts}</span>
        <span>Gifts</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold text-lg">{comments}</span>
        <span>Comments</span>
      </div>
    </div>
  );
};

export default LiveStatsOverview;
