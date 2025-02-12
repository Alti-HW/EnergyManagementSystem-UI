import { axisClasses, BarChart, LineChart, PieChart } from "@mui/x-charts";

interface ChartProps {
  xAxisLabel: string;
  yAxisLabel: string;
  loading: boolean;
  chartData: any;
  type: string;
  xAxisDataFormatter: string;
  yAxisDataFormatter: string;
}

const getFormatter = (type: string) => {
  switch (type) {
    case "string":
      return (name: string) => {
        return name.split(" ").join("\n ");
      };
    case "number":
      return (num: number) => {
        const formatter = new Intl.NumberFormat("en-US", {
          notation: "compact", // Use compact notation (e.g., 1K, 1M, 1B, 1T)
          compactDisplay: "short", // Use the short version (e.g., 1K instead of 1 thousand)
        });
        return formatter.format(num);
      };
  }
};
const Chart = ({
  xAxisLabel,
  yAxisLabel,
  loading,
  chartData,
  type,
  xAxisDataFormatter,
  yAxisDataFormatter,
}: ChartProps) => {
  const renderChart = (
    xAxisLabel: string,
    yAxisLabel: string,
    type: string
  ) => {
    switch (type) {
      case "bar":
        return (
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                dataKey: "x",
                label: xAxisLabel,
                valueFormatter: getFormatter(xAxisDataFormatter ?? "string"),
              },
            ]}
            series={[{ dataKey: "y" }]}
            yAxis={[
              {
                label: yAxisLabel,
                valueFormatter: getFormatter(yAxisDataFormatter ?? "number"),
              },
            ]}
            height={300}
            dataset={chartData}
            loading={loading}
            sx={{
              [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: "translate(-10px, 0)",
              },
              [`.MuiChartsAxis-label`]: {
                transform: "translateY(5px)",
              },
            }}
          />
        );
      case "pie":
        const data = chartData?.map((obj: any) => ({
          label: obj.x,
          value: obj.y,
        }));
        return (
          <PieChart
            xAxis={[{ scaleType: "band", dataKey: "x", label: xAxisLabel }]}
            series={[{ data, innerRadius: "70%" }]}
            yAxis={[{ label: yAxisLabel }]}
            height={300}
            dataset={chartData}
            loading={loading}
            slotProps={{
              legend: {
                position: {
                  vertical: "top",
                  horizontal: "right",
                },
                itemMarkWidth: 10,
                itemMarkHeight: 10,
                labelStyle: {
                  fontSize: "8px",
                },
              },
            }}
          />
        );
      case "line":
        return (
          <LineChart
            xAxis={[
              {
                scaleType: "band",
                dataKey: "x",
                label: xAxisLabel,
                valueFormatter: getFormatter(xAxisDataFormatter ?? "string"),
              },
            ]}
            series={[{ dataKey: "y" }]}
            yAxis={[
              {
                label: yAxisLabel,
                valueFormatter: getFormatter(yAxisDataFormatter ?? "number"),
              },
            ]}
            height={300}
            dataset={chartData}
            loading={loading}
            sx={{
              [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: "translate(-10px, 0)",
              },
              [`.MuiChartsAxis-label`]: {
                transform: "translateY(5px)",
              },
            }}
          />
        );
    }
  };
  return renderChart(xAxisLabel, yAxisLabel, type);
};

export default Chart;
