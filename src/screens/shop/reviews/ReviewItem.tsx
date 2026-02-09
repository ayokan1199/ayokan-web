import React from "react";

interface Review {
  id: string;
  user: string;
  rating: number; // 1-5
  comment: string;
}

interface Props {
  review: Review;
}

const ReviewItem: React.FC<Props> = ({ review }) => {
  return (
    <div className="bg-white p-3 rounded shadow">
      <div className="flex justify-between items-center mb-1">
        <p className="font-semibold">{review.user}</p>
        <p className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;
