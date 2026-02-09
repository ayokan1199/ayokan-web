import React from "react";

const reviews = [
  { id: "1", user: "Alice", rating: 5, comment: "Excellent produit !" },
  { id: "2", user: "Bob", rating: 4, comment: "Très satisfait" },
  { id: "3", user: "Charlie", rating: 3, comment: "Correct" },
];

const StoreReviews: React.FC = () => {
  return (
    <div className="space-y-2">
      <h2 className="font-semibold text-lg">Avis des clients</h2>
      {reviews.map((rev) => (
        <div key={rev.id} className="border rounded p-2 bg-white">
          <div className="flex justify-between items-center">
            <span className="font-semibold">{rev.user}</span>
            <span className="text-yellow-500">{'★'.repeat(rev.rating)}</span>
          </div>
          <p className="text-gray-700 mt-1">{rev.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default StoreReviews;
