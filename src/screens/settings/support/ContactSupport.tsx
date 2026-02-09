import React, { useState } from "react";

const ContactSupport: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message envoyé au support : ${message}`);
    setMessage("");
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Contact support</h1>
      <p className="text-gray-700">
        Si vous rencontrez un problème ou avez une question, envoyez-nous un message.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrivez votre message ici..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default ContactSupport;
