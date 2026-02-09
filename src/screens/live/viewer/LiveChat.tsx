import React, { useState } from "react";

interface Message {
  id: string;
  user: string;
  text: string;
}

const mockMessages: Message[] = [
  { id: "m1", user: "Bob", text: "Salut tout le monde !" },
  { id: "m2", user: "Claire", text: "Super live 😍" },
];

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: `${Date.now()}`, user: "Moi", text: input }]);
    setInput("");
  };

  return (
    <div className="absolute bottom-20 right-4 w-64 bg-black bg-opacity-50 rounded p-2 flex flex-col space-y-1 text-white text-sm">
      <div className="flex-1 overflow-y-auto max-h-48">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-1">
            <span className="font-semibold">{msg.user}: </span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Envoyer un message..."
          className="flex-1 px-2 py-1 rounded-l text-black"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-3 rounded-r font-semibold"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default LiveChat;
