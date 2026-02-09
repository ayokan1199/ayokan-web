import React, { useState } from "react";

const friends = [
  { id: "f1", name: "Alice" },
  { id: "f2", name: "Bob" },
  { id: "f3", name: "Charlie" },
];

const InviteFriendsList: React.FC = () => {
  const [invited, setInvited] = useState<string[]>([]);

  const handleInvite = (id: string) => {
    if (!invited.includes(id)) setInvited([...invited, id]);
    alert(`Invitation envoyée à ${friends.find(f => f.id === id)?.name}`);
  };

  return (
    <div className="bg-white p-3 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">Amis</h3>
      <div className="space-y-2">
        {friends.map(f => (
          <div key={f.id} className="flex justify-between items-center">
            <span>{f.name}</span>
            <button
              onClick={() => handleInvite(f.id)}
              disabled={invited.includes(f.id)}
              className={`px-3 py-1 rounded ${
                invited.includes(f.id)
                  ? "bg-gray-400 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {invited.includes(f.id) ? "Invité" : "Inviter"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InviteFriendsList;
