import { getFormatter } from "../utils/chartTicksFormatter";

export const getBarChartData = (
  data: any,
  xAxisLabel: string,
  color: string
) => ({
  labels: data.x,
  datasets: [
    {
      label: xAxisLabel,
      data: data.y,
      fill: false,
      borderColor: color ?? "rgba(75, 192, 192, 1)",
      backgroundColor: color ?? "rgba(75, 192, 192, 0.6)",
      tension: 0.1,
    },
  ],
});

export const getBarChartOptions = (
  xAxisLabel: string,
  yAxisLabel: string,
  fullView: boolean,
  handleChartClick: (elements: any) => void,
  yAxisDataFormatter: string,
  xAxisDataFormatter: string,
  data: any
): any => {
  console.log("fullView", fullView);
  return {
    responsive: true,
    maintainAspectRatio: !fullView,
    onClick: (e: any, elements: any) => {
      if (elements.length > 0) {
        handleChartClick(elements);
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
          color: "#333",
          padding: 10,
          maxRotation: 0,
          minRotation: 0,
          callback: function (value: any, index: any, context: any) {
            return xAxisDataFormatter
              ? getFormatter(xAxisDataFormatter, data.x[index])
              : `${data.x[index].toLocaleString()}`;
          },
        },
        title: {
          display: true,
          text: xAxisLabel,
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#333",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
          },
          color: "#333",

          callback: function (value: any) {
            return yAxisDataFormatter
              ? getFormatter(yAxisDataFormatter, value)
              : `${value.toLocaleString()}`;
          },
        },
        title: {
          display: true,
          text: yAxisLabel,
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#000",
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: { display: false },
      tooltip: {
        backgroundColor: "#000",
        titleFont: {
          size: 12,
          weight: "bold",
        },
        bodyFont: {
          size: 10,
          weight: "normal",
        },
        borderWidth: 1,
        padding: 10,
        cornerRadius: 5,
        displayColors: false,
        callbacks: {
          label: (tooltipItem: any) =>
            `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()}`,
        },
      },
    },
  };
};
