import React, { useEffect, useState } from "react";

interface Props {
  targetTime: Date;
}

const CoolerCountdown: React.FC<Props> = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetTime.getTime() - now;
      setTimeLeft(distance > 0 ? distance : 0);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="text-center bg-blue-50 p-2 rounded text-blue-700 font-semibold">
      Prochain rafraîchissement : {formatTime(timeLeft)}
    </div>
  );
};

export default CoolerCountdown;
