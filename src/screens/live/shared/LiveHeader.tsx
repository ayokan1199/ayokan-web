import React from "react";
import LiveAvatar from "./LiveAvatar";

interface Props {
  title: string;
  hostName: string;
  hostAvatarUrl?: string;
  rightElement?: React.ReactNode;
}

const LiveHeader: React.FC<Props> = ({ title, hostName, hostAvatarUrl, rightElement }) => {
  return (
    <div className="flex justify-between items-center p-3 bg-white shadow rounded">
      <div className="flex items-center space-x-3">
        {hostAvatarUrl && <LiveAvatar src={hostAvatarUrl} />}
        <div>
          <h2 className="font-bold">{title}</h2>
          <p className="text-sm text-gray-500">{hostName}</p>
        </div>
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
};

export default LiveHeader;
