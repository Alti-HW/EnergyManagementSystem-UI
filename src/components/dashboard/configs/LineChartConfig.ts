import { getFormatter } from "../utils/chartTicksFormatter";

export const getLineChartData = (data: any, xAxisLabel: string) => {
  return {
    labels: data.x,
    datasets: [
      {
        label: xAxisLabel,
        data: data.y,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(19, 114, 46, 0.2)",
        pointBackgroundColor: "rgb(92, 86, 87)",
        pointBorderColor: "rgb(92, 86, 87)",
        pointBorderWidth: 1,
        pointRadius: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };
};

export const getLineChartOptions = (
  xAxisLabel: string,
  yAxisLabel: string,
  fullView: boolean,
  xAxisDataFormatter: string,
  yAxisDataFormatter: string,
  data: any
): any => {
  return {
    responsive: true,
    maintainAspectRatio: !fullView,
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
          display: true,
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
