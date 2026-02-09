import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface Props {
  labels: string[];
  data: number[];
}

const LiveCharts28Days: React.FC<Props> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Vues",
        data,
        borderColor: "#0a84ff",
        backgroundColor: "rgba(10, 132, 255, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <Line data={chartData} />
    </div>
  );
};

export default LiveCharts28Days;
