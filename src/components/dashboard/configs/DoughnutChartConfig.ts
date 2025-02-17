export const getDoughnutChartData = (data: any, xAxisLabel: string) => {
  const generateColors = (num: number) => {
    const colors = [];
    const colorPalette = [
      "rgba(255, 99, 132, 0.6)", // Red
      "rgba(54, 162, 235, 0.6)", // Blue
      "rgba(255, 206, 86, 0.6)", // Yellow
      "rgba(75, 192, 192, 0.6)", // Green
      "rgba(153, 102, 255, 0.6)", // Purple
      "rgba(255, 159, 64, 0.6)", // Orange
      "rgba(0, 204, 255, 0.6)", // Light Blue
      "rgba(255, 99, 71, 0.6)", // Tomato Red
      "rgba(255, 165, 0, 0.6)", // Orange
      "rgba(32, 178, 170, 0.6)", // Light Sea Green
    ];

    // Create a color array based on the number of data points
    for (let i = 0; i < num; i++) {
      colors.push(colorPalette[i % colorPalette.length]);
    }

    return colors;
  };
  return {
    labels: data.x,
    datasets: [
      {
        label: xAxisLabel,
        data: data.y,
        backgroundColor: generateColors(data?.x.length), // Dynamically generate colors based on the length of the data array
        borderColor: generateColors(data?.x?.length), // Border color can also be dynamic
        borderWidth: 1,
      },
    ],
  };
};

export const getDoughnutChartOptions = (
  fullView: boolean,
  handleChartClick: (elements: any) => void
): any => ({
  responsive: true,
  maintainAspectRatio: !fullView,
  onClick: (e: any, elements: any) => {
    if (elements.length > 0) {
      handleChartClick(elements);
    }
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "right",
      labels: {
        boxWidth: 10, // Width of the colored box in the legend
        padding: 10, // Space between legend items
      },
    },
    datalabels: {
      color: "#fff", // Text color for the labels
      font: {
        size: 8, // Font size for the labels
      },
      formatter: (value: any, context: any) => {
        return context.chart.data.labels[context.dataIndex]; // Show the label from the dataset
      },
      anchor: "center", // Position of the label inside the doughnut
      align: "center", // Align the label in the center
    },
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
});
