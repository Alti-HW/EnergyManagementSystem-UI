import React, { useState, useEffect, useRef } from "react";
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

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const chartRef = useRef(null); // Ref to access the chart container
  const [data, setData] = useState<any>({
    labels: [], // X-axis labels
    datasets: [
      {
        label: "Data Set",
        data: [], // Y-axis data
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    // Initial data load
    loadData("right");
  }, []);

  // Function to simulate loading more data (either right or left)
  const loadData = (direction: string) => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const newData = {
        labels: Array.from(
          { length: 10 },
          (_, index) =>
            `${
              direction === "right"
                ? data.labels.length + index + 1
                : data.labels.length - index - 1
            }`
        ),
        data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
      };

      setData((prevData: any) => {
        const updatedLabels =
          direction === "right"
            ? [...prevData.labels, ...newData.labels]
            : [...newData.labels, ...prevData.labels];

        const updatedData =
          direction === "right"
            ? [...prevData.datasets[0].data, ...newData.data]
            : [...newData.data, ...prevData.datasets[0].data];

        return {
          labels: updatedLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: updatedData,
            },
          ],
        };
      });

      setLoading(false);
    }, 1000); // Simulate async data fetch
  };

  const handleScroll = () => {
    if (!chartRef.current) return;

    const chartContainer: any = chartRef.current;
    if (chartContainer) {
      const scrollPosition = chartContainer.scrollLeft;
      const scrollWidth = chartContainer.scrollWidth;
      const clientWidth = chartContainer.clientWidth;

      // Check if we've reached the right end
      if (scrollPosition + clientWidth >= scrollWidth - 10 && !scrolling) {
        setScrolling(true);
        loadData("right"); // Load data to the right
        setScrolling(false);
      }

      // Check if we've reached the left end (scrollPosition is 0)
      if (scrollPosition === 0 && !scrolling) {
        setScrolling(true);
        loadData("left"); // Load data to the left
        setScrolling(false);
      }
    }
  };

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "400px",
        overflowX: "auto",
        position: "relative",
        whiteSpace: "nowrap",
      }}
      onScroll={handleScroll}
    >
      <Line
        data={data}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default App;
