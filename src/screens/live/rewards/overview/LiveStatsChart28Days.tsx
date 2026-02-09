import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const data = {
  labels: Array.from({ length: 28 }, (_, i) => `J-${27 - i}`),
  datasets: [
    {
      label: "Étincelles gagnées",
      data: Array.from({ length: 28 }, () => Math.floor(Math.random() * 500 + 50)),
      borderColor: "#facc15",
      backgroundColor: "rgba(250, 204, 21, 0.2)",
      tension: 0.3,
    },
  ],
};

const options = {
  responsive: true,
  plugins: { legend: { display: false } },
};

const LiveStatsChart28Days: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold text-lg mb-2">Statistiques 28 jours</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default LiveStatsChart28Days;
