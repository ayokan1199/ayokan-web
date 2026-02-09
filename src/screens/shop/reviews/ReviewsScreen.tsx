import React from "react";
import ReviewItem from "./ReviewItem";
import AddReview from "./AddReview";

const reviews = [
  { id: "1", user: "Alice", rating: 5, comment: "Excellent produit !" },
  { id: "2", user: "Bob", rating: 4, comment: "Bon rapport qualité/prix." },
];

const ReviewsScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Avis des utilisateurs</h1>
      <AddReview />
      <div className="space-y-2">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsScreen;
