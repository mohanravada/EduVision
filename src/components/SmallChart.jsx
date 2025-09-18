// src/components/SmallChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export default function SmallChart(){
  const data = {
    labels: ["Week1","Week2","Week3","Week4"],
    datasets: [{
      label: "Quiz Attempts",
      data: [0, 1, 2, 3],
      fill: true,
      backgroundColor: "rgba(6,182,212,0.12)",
      borderColor: "rgba(6,182,212,0.9)",
      tension: 0.3
    }]
  };
  const options = { plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { display: false } } };
  return <div style={{height:120}}><Line data={data} options={options} /></div>;
}
