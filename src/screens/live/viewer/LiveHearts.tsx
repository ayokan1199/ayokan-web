import React, { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  color: string;
}

const colors = ["#ff3b30", "#ff9500", "#ffcc00", "#34c759", "#0a84ff"];

const LiveHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const newHeart: Heart = {
        id,
        x: Math.random() * window.innerWidth * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setHearts((prev) => [...prev, newHeart]);
      // Supprimer après 2 secondes
      setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== id)), 2000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-16 left-0 w-full pointer-events-none">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{ left: heart.x }}
          className="absolute text-2xl animate-bounce"
        >
          <span style={{ color: heart.color }}>❤️</span>
        </div>
      ))}
    </div>
  );
};

export default LiveHearts;
