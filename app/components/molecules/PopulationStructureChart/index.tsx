import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useChartData from "./useChartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "県別総人口",
    },
  },
};

const PopulationStructureChart = () => {
  const chartData = useChartData();

  return (
    <div>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default PopulationStructureChart;
