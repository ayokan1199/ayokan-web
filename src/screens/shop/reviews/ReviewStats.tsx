import React from "react";

interface Props {
  totalReviews: number;
  averageRating: number;
}

const ReviewStats: React.FC<Props> = ({ totalReviews, averageRating }) => {
  return (
    <div className="bg-white p-3 rounded shadow flex justify-between items-center">
      <p className="font-semibold">{totalReviews} avis</p>
      <p className="text-yellow-500">{'★'.repeat(Math.round(averageRating))}{'☆'.repeat(5 - Math.round(averageRating))}</p>
      <p>Moyenne : {averageRating.toFixed(1)}</p>
    </div>
  );
};

export default ReviewStats;
