"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler
);

export default function PriceChart({ predictions }) {
  if (!predictions || predictions.length === 0) {
    return (
      <div className="text-textSecondary text-center py-10">
        Waiting for predictions…
      </div>
    );
  }

  const chartData = {
    labels: predictions.map((p) =>
      new Date(p.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    ),
    datasets: [
      {
        label: "Predicted Price ($)",
        data: predictions.map((p) => Number(p.price)),
        fill: true,
        borderColor: "#ffb347",
        backgroundColor: "rgba(255, 179, 71, 0.15)",
        pointRadius: 2,
        tension: 0.25,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: "#b0b3b8" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#b0b3b8" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
}
