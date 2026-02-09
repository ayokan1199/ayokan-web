import React from "react";

const LiveInvitePanel: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Invite Participants</h3>

      <button className="w-full bg-blue-500 text-white py-2 rounded">
        Invite Friends
      </button>
    </div>
  );
};

export default LiveInvitePanel;
