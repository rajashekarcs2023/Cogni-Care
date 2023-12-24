"use client";

import React from "react";
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
import { Line } from "react-chartjs-2";

const labels = ["Nov 14", "Nov 15", "Nov 16", "Nov 17", "Nov 18", "Nov 19"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: ["82", "94", "72", "60", "83", "75"],
      borderColor: "rgb(37, 99, 235)",
      backgroundColor: "rgba(37, 99, 235, 0.5)",
    },
  ],
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

export default function Graph() {
  return (
    <Line
      className="w-full pb-6 pt-4"
      options={{
        plugins: {
          tooltip: {
            enabled: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.3,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
            min: 0,
            max: 100,
          },
        },
      }}
      data={data}
    />
  );
}
