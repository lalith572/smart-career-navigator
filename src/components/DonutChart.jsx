import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data }) => {
  const options = {
    cutout: "70%",
    plugins: { legend: { position: "bottom" } },
  };
  return <Doughnut data={data} options={options} />;
};

export default DonutChart;
