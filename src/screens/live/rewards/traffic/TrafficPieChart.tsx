import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TrafficSource {
  id: string;
  name: string;
  percentage: number; // 0-100
}

interface Props {
  sources: TrafficSource[];
}

const TrafficPieChart: React.FC<Props> = ({ sources }) => {
  const data = {
    labels: sources.map((s) => s.name),
    datasets: [
      {
        data: sources.map((s) => s.percentage),
        backgroundColor: [
          "#F472B6",
          "#FB7185",
          "#FCD34D",
          "#60A5FA",
          "#34D399",
          "#A78BFA",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <Pie data={data} />
    </div>
  );
};

export default TrafficPieChart;
