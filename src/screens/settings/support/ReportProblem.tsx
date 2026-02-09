import React, { useState } from "react";

const ReportProblem: React.FC = () => {
  const [issue, setIssue] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Problème signalé : ${issue}\nDétails : ${details}`);
    setIssue("");
    setDetails("");
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Signaler un problème</h1>
      <p className="text-gray-700">
        Décrivez le problème rencontré afin que nous puissions le résoudre rapidement.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="Titre du problème"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Détails supplémentaires"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Signaler
        </button>
      </form>
    </div>
  );
};

export default ReportProblem;
