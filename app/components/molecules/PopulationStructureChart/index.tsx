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

  const data =
    chartData.length > 0
      ? {
          labels: chartData[0].data.map((detum) => detum.year.toString()),
          datasets: chartData.map((detum) => ({
            label: detum.label,
            data: detum.data.map((detum) => detum.value),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            borderWidth: 2,
          })),
        }
      : { labels: [], datasets: [] };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default PopulationStructureChart;
