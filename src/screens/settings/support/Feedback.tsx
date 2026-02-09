import React, { useState } from "react";

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Feedback reçu : ${feedback}\nNote : ${rating || "Non renseignée"}`);
    setFeedback("");
    setRating(null);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Donner un feedback</h1>
      <p className="text-gray-700">
        Votre avis nous aide à améliorer Ayokan. Merci de partager vos impressions.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Écrivez votre feedback ici..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          required
        />
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className={`px-3 py-1 rounded-md border ${
                rating === n ? "bg-yellow-400" : "bg-gray-200"
              }`}
            >
              {n} ⭐
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Feedback;
