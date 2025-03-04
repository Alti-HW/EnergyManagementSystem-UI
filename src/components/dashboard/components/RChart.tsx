import React, { useEffect, useRef } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2"; // Import the Doughnut chart type from react-chartjs-2
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  TimeScale,
} from "chart.js";
import { Box } from "@mui/material";
import { getBarChartData, getBarChartOptions } from "../configs/BarChartConfig";
import {
  getLineChartData,
  getLineChartOptions,
} from "../configs/LineChartConfig";
import {
  getDoughnutChartData,
  getDoughnutChartOptions,
} from "../configs/DoughnutChartConfig";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "chartjs-adapter-date-fns";
// Register required chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels,
  TimeScale
);

const RChart = ({
  data,
  xAxisLabel,
  yAxisLabel,
  loading,
  type,
  xAxisDataFormatter,
  yAxisDataFormatter,
  fullView,
  closeChartFullView,
  color,
  handleChartClick = () => {},
  handleOnScroll = () => {},
  scrollContainerRef,
  enableScrollInFullview,
}: any) => {
  const chartRef = useRef<any | null>(null);
  const onScroll = () => {
    if (enableScrollInFullview) {
      handleOnScroll();
    }
  };

  useEffect(() => {
    const chartInstance = chartRef?.current;
    console.log("chartInstance", chartInstance);
    return () => {
      console.log(
        "chartInstance from unmount",
        chartInstance,
        chartInstance.destroy
      );
      if (chartInstance) {
        chartInstance.destroy(); // Clean up chart instance when component unmounts
      }
    };
  }, []);

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <Bar
            ref={chartRef}
            data={getBarChartData(data, xAxisLabel, color)}
            options={getBarChartOptions(
              xAxisLabel,
              yAxisLabel,
              fullView && enableScrollInFullview,
              handleChartClick,
              yAxisDataFormatter,
              xAxisDataFormatter,
              data
            )}
          />
        );
      case "line":
        return (
          <Line
            ref={chartRef}
            data={getLineChartData(data, xAxisLabel, color)}
            options={getLineChartOptions(
              xAxisLabel,
              yAxisLabel,
              fullView && enableScrollInFullview,
              xAxisDataFormatter,
              yAxisDataFormatter,
              data,
              handleChartClick
            )}
          />
        );
      case "doughnut":
        return (
          <Doughnut
            ref={chartRef}
            data={getDoughnutChartData(data, xAxisLabel)}
            options={getDoughnutChartOptions(
              fullView && enableScrollInFullview,
              handleChartClick
            )}
          />
        );
    }
  };
  return !fullView ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: type === "doughnut" ? 300 : "300px",
        width: "100%",
      }}
    >
      {renderChart()}
    </div>
  ) : enableScrollInFullview ? (
    <Box
      sx={{
        // maxWidth: 1200,
        mx: "auto",
        mt: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          width: enableScrollInFullview ? "90%" : "100%",
          height: "400px",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
        onScroll={onScroll}
        ref={scrollContainerRef}
      >
        <Box
          sx={{
            minWidth:
              (data.x.length - 2) * 40 > 1200
                ? `${(data.x.length - 2) * 40}px`
                : `${(data.x.length - 2) * 40 + 1200}px`,
            height: "350px",
          }}
        >
          {renderChart()}
        </Box>
      </Box>
    </Box>
  ) : (
    <div
      style={{
        height: "450px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100vw",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...(type === "doughnut" ? { height: "100%" } : {}),
        }}
      >
        {renderChart()}
      </div>
    </div>
  );
};

export default RChart;
