import React from "react";

interface Message {
  id: string;
  user: string;
  text: string;
  isVIP?: boolean;
}

const messages: Message[] = [
  { id: "1", user: "Luna", text: "Hello everyone!" },
  { id: "2", user: "Max", text: "🔥🔥🔥", isVIP: true },
];

const ChatMessages: React.FC = () => {
  return (
    <div className="space-y-1 text-sm">
      {messages.map((msg) => (
        <div key={msg.id}>
          <span
            className={`font-semibold ${
              msg.isVIP ? "text-yellow-500" : ""
            }`}
          >
            {msg.user}:
          </span>{" "}
          <span>{msg.text}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
