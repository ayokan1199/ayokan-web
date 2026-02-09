import React, { useEffect, useState } from "react";

interface Props {
  cooldownSeconds: number;
}

const RefreshCooldown: React.FC<Props> = ({ cooldownSeconds }) => {
  const [timeLeft, setTimeLeft] = useState(cooldownSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-gray-600 font-mono text-center">
      {timeLeft > 0 ? `Prochain rafraîchissement disponible dans ${formatTime(timeLeft)}` : "Rafraîchissement disponible !"}
    </div>
  );
};

export default RefreshCooldown;
