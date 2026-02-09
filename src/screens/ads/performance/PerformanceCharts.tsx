import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  period: "7d" | "28d" | "90d";
}

const PerformanceCharts: React.FC<Props> = ({ period }) => {
  const labels = period === "7d"
    ? ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
    : Array.from({ length: period === "28d" ? 28 : 90 }, (_, i) => `Jour ${i + 1}`);

  const data = {
    labels,
    datasets: [
      {
        label: "Impressions",
        data: labels.map(() => Math.floor(Math.random() * 200) + 50),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
      },
      {
        label: "Clics",
        data: labels.map(() => Math.floor(Math.random() * 50) + 10),
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-2">Graphiques</h2>
      <Line data={data} />
    </div>
  );
};

export default PerformanceCharts;
