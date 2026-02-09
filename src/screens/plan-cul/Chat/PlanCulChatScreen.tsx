import React, { useState } from "react";
import ExplicitStickers from "./ExplicitStickers";
import VoiceNotes from "./VoiceNotes";
import ConsentReminder from "./ConsentReminder";
import ChatSafetyMenu from "./ChatSafetyMenu";

const PlanCulChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <ConsentReminder />

      <div className="border rounded h-96 overflow-y-auto p-2 mb-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2 p-2 bg-pink-100 rounded">
            {msg}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tape ton message..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Envoyer
        </button>
      </div>

      <div className="flex gap-2 mb-2">
        <ExplicitStickers />
        <VoiceNotes />
      </div>

      <ChatSafetyMenu />
    </div>
  );
};

export default PlanCulChatScreen;
