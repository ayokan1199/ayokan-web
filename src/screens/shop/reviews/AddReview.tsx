import React, { useState } from "react";

const AddReview: React.FC = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment) {
      alert("Veuillez écrire un commentaire.");
      return;
    }
    alert(`Avis ajouté ! Note: ${rating}, Commentaire: ${comment}`);
    setComment("");
    setRating(5);
  };

  return (
    <div className="bg-white p-3 rounded shadow space-y-2">
      <h3 className="font-semibold">Ajouter un avis</h3>
      <div className="flex items-center space-x-2">
        <label>Note :</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="border rounded p-1">
          {[5,4,3,2,1].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Écrire un commentaire..."
        className="w-full border rounded p-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Publier
      </button>
    </div>
  );
};

export default AddReview;
